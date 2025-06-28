export interface ArbitrageOpportunity {
  id: string;
  tokenPair: string;
  chainA: {
    name: string;
    price: number;
    dex: string;
    logo: string;
  };
  chainB: {
    name: string;
    price: number;
    dex: string;
    logo: string;
  };
  profitPotential: number;
  riskScore: 'Low' | 'Medium' | 'High';
  arbitronConfidence: number;
  estimatedGas: number;
  timeWindow: number;
  primeRating: 'PRIME OPPORTUNITY' | 'GOOD TRADE' | 'MODERATE' | 'LOW PRIORITY';
  volume24h: number;
  liquidity: number;
}

export interface Portfolio {
  totalValue: number;
  totalPnL: number;
  totalPnLPercentage: number;
  dailyPnL: number;
  positions: Position[];
  performance: PerformanceMetrics;
}

export interface Position {
  id: string;
  symbol: string;
  amount: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
  chain: string;
  entryPrice: number;
  currentPrice: number;
}

export interface PerformanceMetrics {
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  totalTrades: number;
  avgHoldTime: number;
}

export interface AIModel {
  name: string;
  type: 'LSTM' | 'GRU' | 'GNN' | 'SENTIMENT';
  accuracy: number;
  lastTrained: string;
  status: 'ACTIVE' | 'TRAINING' | 'INACTIVE';
  confidence: number;
}

export interface NetworkNode {
  id: string;
  name: string;
  position: [number, number, number];
  connections: string[];
  activity: number;
  color: string;
}