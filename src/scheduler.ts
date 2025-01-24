import cron from 'node-cron';
import Job from './models/job';
import { DateTime } from 'luxon';

// FIXME: Redis could handle the horz. scaling...

const scheduleJob = (job: any) => {
  // Run the job if the start date is less than or equal to current time
  if (DateTime.fromISO(job.startDate).toMillis() <= DateTime.now().toMillis()) {
    // Example Event Structure –
    // {
    //     “eventName”: ”Morning Scene”,
    //     “startDate”: ”2024-01-01”,
    //     “endDate”: ”2024-01-31”,
    //     “recurrence”: {
    //         “interval”:”1”
    //         “frequency”: ”day”
    //     }
    // }

    // DEBUG job's parameters to console structure later
    console.log(`Running Job: ${job.eventName}`);
    console.log(`Start Date: ${job.startDate}`);
    console.log(`End Date: ${job.endDate}`);
    console.log(
      `Recurrence Interval: ${job.recurrence.interval} ${job.recurrence.frequency}`
    );

    // Update job status in DB
    Job.findByIdAndUpdate(job._id, { status: 'completed' }).exec();
  } else {
    // If the job hasn't reached the start date, skip scheduling it now
    console.log(`Skipping Job: ${job.eventName} (not yet started)`);
  }
};

const runScheduledJobs = async () => {
  try {
    // Fetch all jobs from the database that are 'pending'
    const jobs = await Job.find({ status: 'pending' });

    jobs.forEach((job) => {
      // Schedule the job with a cron expression
      cron.schedule('*/1 * * * *', () => {
        // console.log('[DEBUG] (scheduler.ts) runScheduledJobs -job', job);
        scheduleJob(job);
      });
    });
  } catch (error) {
    console.error('Error in scheduling jobs:', error);
  }
};

export default runScheduledJobs;
