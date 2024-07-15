import {CoinData, ICoinData, CoinDataSearchParams, CoinDataSearchResponse} from '../models/coinData';


class CoinDataController {
  static async addCoinData(coinData: ICoinData): Promise<ICoinData> {
    try {
      const newCoinData = new CoinData(coinData);
      const savedCoinData = await newCoinData.save();
      return savedCoinData;
    } catch (error) {
      throw new Error(`Failed to add coin data: ${error}`);
    }
  }

  static async searchCoinData(queryParams: CoinDataSearchParams): Promise<CoinDataSearchResponse> {
    const filter = queryParams.getFilter();
    const sortPrefix = queryParams.order === 'desc' ? '-' : '';

    try {
      const coinData = await CoinData.find(filter)
        .sort(`${sortPrefix}${queryParams.sort_by}`)
        .skip(queryParams.offset)
        .limit(queryParams.limit);
      const total = await CoinData.countDocuments(filter);
      return { data: coinData, total: total };
    } catch (error) {
      console.error(`Error searching coin data: ${error}`, error);
      throw new Error(`Failed to search coin data: ${error}`);
    }
  }
}

export default CoinDataController;
