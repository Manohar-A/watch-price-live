import express, { Application } from 'express';
import router from './routers/coinData';
import cors from 'cors';

const app: Application = express();


// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST', 
    allowedHeaders: 'Content-Type,Authorization'
  }));

  // Adding routes
app.use('/api', router);

export default app;
