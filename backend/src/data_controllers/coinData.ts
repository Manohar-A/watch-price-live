import {CoinData, ICoinData} from '../models/coinData';

const addCoinData = async (coinData: ICoinData): Promise<ICoinData> => {
    try {
      const newCoinData = new CoinData(coinData);
      const savedCoinData = await newCoinData.save();
      return savedCoinData;
    } catch (error) {
      throw new Error(`Failed to add coin data: ${error}`);
    }
  };

export default addCoinData;