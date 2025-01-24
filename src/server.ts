import express from 'express';
import connectDB from './db';
import runScheduledJobs from './scheduler';

const app = express();
const port = 3000;

// Connect to database
connectDB();

// Run the scheduler
runScheduledJobs();

app.listen(port, () => {
  console.log(`Scheduler is up and running on port ${port}`);
});
