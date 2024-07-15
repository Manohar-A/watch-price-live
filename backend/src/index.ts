import app from './app';
import { PORT } from './config/env';
import getCoinsDataConcurrently from './routers/dataPolling';

// connect to Db

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// polling the external API every 10 seconds
setInterval(getCoinsDataConcurrently, 10000);