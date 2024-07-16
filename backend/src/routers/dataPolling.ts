import axios, { AxiosResponse } from 'axios';
import { LIVE_COIN_WATCH_API_KEY, LIVE_COIN_WATCH_API_URL } from '../config/env';
import { COIN_TO_CODE_MAP, CoinData } from '../models/coinData';
import { ICoinData } from '../models/coinData';
import CoinDataController from '../data_controllers/coinData';

interface RequestPayload {
    currency: string;
    code: string;
}

const getAndStoreCoinData = async (currency: string, coin_code: string): Promise<void> => {
    try {
        const payload: RequestPayload = {
            currency: currency,
            code: coin_code
        };
        const response: AxiosResponse = await axios.post(LIVE_COIN_WATCH_API_URL, payload, {
            headers: {
                'x-api-key': LIVE_COIN_WATCH_API_KEY
            }
        });

        if (response.status === 200) {
            const currentTime = new Date();
            const coinData: ICoinData = {
                code: coin_code,
                currency: currency,
                rate: response.data.rate,
                volume: response.data.volume,
                cap: response.data.cap,
                liquidity: response.data.liquidity,
                delta: response.data.delta,
                created_at: currentTime
            };

            await CoinDataController.addCoinData(coinData);
        }
        else {
            console.log('API call failed. Might be due to overhead on the API server');
        }
    } catch (error) {
        console.error('Error calling external API');
    }
};

const CURRENCY: string = "USD";

const getCoinsDataConcurrently = async (): Promise<void> => {
    const promises = Object.keys(COIN_TO_CODE_MAP).map(async (coin: string) => {
            await getAndStoreCoinData(CURRENCY, COIN_TO_CODE_MAP[coin]);        
    });

    await Promise.all(promises);
};

export default getCoinsDataConcurrently;