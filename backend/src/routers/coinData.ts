import express, { query, Request, Response } from 'express';
import CoinDataController from '../data_controllers/coinData';
import { CoinDataSearchParams } from '../models/coinData';

const router = express.Router();

// Define your API routes here
router.get('/coin-data', async (req: Request, res: Response) => {
    const data = await CoinDataController.searchCoinData(new CoinDataSearchParams(req.query))
    res.json(data);
});


export default router;