import app from './app';
import { PORT } from './config/env';

// connect to Db

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
