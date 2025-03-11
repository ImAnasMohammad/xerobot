import mongoose from 'mongoose';

const MONGO_URI = process.env.NEXT_MONGO_URL; // MongoDB URI

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return {success:true};
  }

  try {
    const res = await mongoose.connect(MONGO_URI);
    isConnected = true;
    return {success:true};
  } catch (err) {
    console.log(err.errorResponse);
    console.error('MongoDB connection error:', err);return { success: false,status:500 ,message: "Unable to connect to the database." };
  }
};
export default connectDB
