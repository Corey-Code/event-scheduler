import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  eventName: String,
  startDate: Date,
  endDate: Date,
  recurrence: {
    interval: Number,
    frequency: String,
  },
  status: { type: String, default: 'pending' }, // job status: pending, completed, failed
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
