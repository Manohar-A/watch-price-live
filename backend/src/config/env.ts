import dotenv from 'dotenv';

dotenv.config();

export const MONGO_DB_NAME: string = process.env.MONGO_DB_NAME || 'fomofactory';
export const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/';
export const PORT: number = parseInt(process.env.PORT || '5001', 10);
