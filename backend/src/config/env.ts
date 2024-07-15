import dotenv from 'dotenv';

dotenv.config();

export const MONGO_DB_NAME: string = process.env.MONGO_DB_NAME || 'fomofactory';
export const MONGO_URI: string = process.env.MONGO_URI || `mongodb://localhost:27017/${MONGO_DB_NAME}`;
export const PORT: number = parseInt(process.env.PORT || '5001', 10);
export const LIVE_COIN_WATCH_API_KEY: string = process.env.LIVE_COIN_WATCH_API_KEY || "28f2814a-9f4a-4e33-bae3-e1c763e0d569"
export const LIVE_COIN_WATCH_API_URL: string = process.env.LIVE_COIN_WATCH_API_URL || "https://api.livecoinwatch.com/coins/single"
