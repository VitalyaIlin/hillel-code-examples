import mongoose from 'mongoose';
import 'dotenv/config'

// Optional: Mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Call the connectDB function to establish the connection
connectDB();
