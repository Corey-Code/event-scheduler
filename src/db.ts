import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/event_scheduler', {});
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error', err);

    // TODO: TIME-> Don't panic just report
    process.exit(1);
  }
};

export default connectDB;
