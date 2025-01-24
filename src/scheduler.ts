import cron from 'node-cron';
import Job from './models/job';

const scheduleJob = (job: any) => {
  // TODO:
};

const runScheduledJobs = async () => {
  try {
    // Fetch all jobs from the database that are 'pending'
    const jobs = await Job.find({ status: 'pending' });

    jobs.forEach((job) => {
      // Schedule the job with a cron expression
      cron.schedule('*/1 * * * *', () => {
        console.log('[DEBUG] (scheduler.ts) runScheduledJobs -job', job);
        // scheduleJob(job);
      });
    });
  } catch (error) {
    console.error('Error in scheduling jobs:', error);
  }
};

export default runScheduledJobs;
