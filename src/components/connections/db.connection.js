import mongoose from 'mongoose';

const MONGO_URI = process.env.NEXT_MONGO_URL; // MongoDB URI

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const res = await mongoose.connect(MONGO_URI);
    isConnected = true;

    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.errorResponse);
    console.error('MongoDB connection error:', err);
  }
};
export default connectDB
