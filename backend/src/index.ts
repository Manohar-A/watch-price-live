import app from './app';
import { PORT } from './config/env';
import getCoinsDataConcurrently from './routers/dataPolling';
import mongoose from 'mongoose';
import { MONGO_URI, DATA_POLLING_INTERVAL } from './config/env';

// connect to Db
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// polling the external API every 10 seconds
setInterval(getCoinsDataConcurrently, DATA_POLLING_INTERVAL);