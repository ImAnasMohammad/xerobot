import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://<db_username>:<db_password>@cluster0.pozxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // MongoDB URI

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
