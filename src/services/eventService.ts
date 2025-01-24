import { Event } from '../models/event';
import { v4 as uuidv4 } from 'uuid';
import { Queue, Worker, Job } from 'bullmq';
import { RedisOptions } from 'ioredis';

// Redis connection options
const redisOptions: RedisOptions = {
  host: 'localhost',
  port: 6379,
};

// Create a job queue
const jobQueue = new Queue('jobQueue', { connection: redisOptions });

// Job execution function (this is the job handler)
const jobExecutor = async (job: Job) => {
  const event = job.data as Event;
  await executeJob(event);
};

// Create a worker that processes the jobs
const worker = new Worker('jobQueue', jobExecutor, {
  connection: redisOptions,
});

// Start worker (listens to job queue and executes them)
worker.on('completed', (job: Job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed with error: ${err.message}`);
});

export const createEvent = async (event: Event): Promise<Event> => {
  event.id = generateEventId();
  const newEvent = await scheduleEventJob(event);
  return newEvent;
};

export const updateEvent = async (
  id: string,
  updatedEvent: Partial<Event>
): Promise<Event | null> => {
  const currentJob = await jobQueue.getJob(id);
  if (!currentJob) return null;

  await currentJob.remove();

  const newEvent: Event = { ...(currentJob.data as Event), ...updatedEvent };
  console.log(newEvent);
  await scheduleEventJob(newEvent);
  return newEvent;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  try {
    if (typeof id !== 'string') throw new Error('Invalid ID format');
    const job = await jobQueue.getJob(id);
    if (!job) throw new Error(`Job with ID ${id} not found`);
    await job.remove();
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
};

export const getEventById = async (id: string): Promise<Event | null> => {
  if (typeof id !== 'string') throw new Error('Invalid ID format');
  console.log('id', id);
  const job = await jobQueue.getJob(id);
  console.log('job', job);
  if (!job) return null;
  return job.data ? (job.data as Event) : null;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const foo = await jobQueue.getJobs();
  // console.log('foo', foo);
  return foo;
};

const scheduleEventJob = async (event: Event): Promise<any> => {
  const { startDate, endDate, recurrence } = event;

  // Calculate the recurrence interval in milliseconds
  const intervalInMillis = getRecurrenceIntervalInMillis(recurrence);

  // Define repeat options for BullMQ
  const repeatOptions = {
    every: intervalInMillis, // recurrence interval in milliseconds
    startDate: new Date(startDate).getTime(),
    endDate: new Date(endDate).getTime(),
  };
  const job = await jobQueue.add(event.id, event, {
    repeat: repeatOptions,
  });
  // console.log(job.id);
  return job;
};

// Get recurrence interval in milliseconds
const getRecurrenceIntervalInMillis = (recurrence: {
  frequency: string;
  interval: number;
}): number => {
  switch (recurrence.frequency) {
    case 'day':
      return recurrence.interval * 24 * 60 * 60 * 1000; // days to milliseconds
    case 'hour':
      return recurrence.interval * 60 * 60 * 1000; // hours to milliseconds
    case 'minute':
      return recurrence.interval * 60 * 1000; // minutes to milliseconds
    default:
      throw new Error('Unsupported frequency');
  }
};

const executeJob = async (event: Event): Promise<void> => {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  if (now >= start && now <= end) {
    console.log(`Executing job for event: ${event.eventName}`);
    console.log(`Start Date: ${event.startDate}, End Date: ${event.endDate}`);
    console.log(
      `Recurrence: ${event.recurrence.interval} ${event.recurrence.frequency}`
    );
  }
};

const generateEventId = (): string => {
  return uuidv4();
};
