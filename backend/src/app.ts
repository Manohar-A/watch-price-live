import express, { Application } from 'express';
import router from './routers/coinData';

const app: Application = express();


// Adding middleware

// Adding routes
app.use('/api', router);

export default app;
