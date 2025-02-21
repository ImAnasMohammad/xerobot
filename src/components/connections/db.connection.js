import mongoose from 'mongoose';

<<<<<<< HEAD
// const MONGO_URI = 'mongodb+srv://xerobot:Xerobot786@cluster0.pozxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // MongoDB URI
// const MONGO_URI = 'mongodb://localhost:27017/chat-sync'; // MongoDB URI
=======
>>>>>>> 86068ddb48c5a8ca71fb0f356939dd192900a408
const MONGO_URI = process.env.NEXT_MONGO_URL; // MongoDB URI

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
    console.log(err.errorResponse)
    console.error('MongoDB connection error:', err);
  }
};
export default connectDB
