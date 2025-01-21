import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/chat-sync'; // MongoDB URI

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
export default connectDB