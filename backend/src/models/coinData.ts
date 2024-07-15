import * as mongoose from 'mongoose';

class CoinDataSearchParams {
  code?: string;
  offset: number = 0;
  limit: number = 20;
  sort_by: string = 'created_at';
  order: string = 'desc';

  constructor(params: Partial<CoinDataSearchParams>) {
    Object.assign(this, params);
    this.validate();
  }

  private validate() {
    if (this.offset < 0) {
      throw new Error('Offset must be a non-negative number');
    }
    if (this.limit <= 0) {
      throw new Error('Limit must be a positive number');
    }
    if (!['asc', 'desc'].includes(this.order)) {
      throw new Error('Order must be either "asc" or "desc"');
    }
  }

  getFilter(): any {
    let filter: any = {};
    if (this.code) {
      filter.code = this.code;
    }
    return filter;
  }
}

type CoinDataSearchResponse = {
  data: ICoinData[];
  total: number;
};

const COIN_TO_CODE_MAP: Record<string, string> = {
    "bitcoin": "BTC",
    "ethereum": "ETH",
    "tether": "USDT",
    "solana": "SOL",
    "usd_coin": "USDC",
}

interface ICoinData  {
  code: string;
  currency: string;
  rate: number;
  volume: number;
  cap: number;
  liquidity: number;
  delta: Map<string, number>;
  created_at: Date;
}

const CoinDataSchema: mongoose.Schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    description: "The code of the coin"
  },
  currency: {
    type: String,
    required: true,
    description: "The currency of the coin"
  },
  rate: {
    type: Number,
    required: true,
    description: "The price of the coin in given currency"
  },
  volume: {
    type: Number,
    required: true,
    description: "Reported trading volume of the coin in last 24 hours in given currency"
  },
  cap: {
    type: Number,
    required: true,
    description: "The market cap of the coin in given currency"
  },
  liquidity: {
    type: Number,
    required: true,
    description: "The liquidity of the coin in given currency"
  },
  delta: {
    type: Map,
    of: Number,
    required: true,
    description: "The delta of the coin"
  },
  created_at: {
    type: Date,
    required: true,
    description: "The time at which the data is collected",
  }
});

// Creating indexes
CoinDataSchema.index({ code: 1 }, { name: 'code_index' });
CoinDataSchema.index({ created_at: -1 }, { name: 'created_at_index' });

const CoinData = mongoose.model<ICoinData>('CoinData', CoinDataSchema);

export { CoinData, ICoinData, COIN_TO_CODE_MAP, CoinDataSearchParams, CoinDataSearchResponse };



