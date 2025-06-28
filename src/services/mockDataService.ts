import { ArbitrageOpportunity, Portfolio, AIModel, NetworkNode } from '../types';

class MockDataService {
  private intervals: NodeJS.Timeout[] = [];
  private isRunning = false;

  generateMockOpportunities(): ArbitrageOpportunity[] {
    const tokens = ['ETH/USDC', 'BTC/USDT', 'MATIC/USDC', 'AVAX/USDT', 'BNB/BUSD', 'SOL/USDC', 'ADA/USDT', 'DOT/USDC'];
    const chains = [
      { name: 'Ethereum', logo: '🔷' },
      { name: 'BSC', logo: '🟡' },
      { name: 'Polygon', logo: '🟣' },
      { name: 'Arbitrum', logo: '🔵' },
      { name: 'Optimism', logo: '🔴' },
      { name: 'Avalanche', logo: '⚪' },
    ];
    const dexes = ['Uniswap', 'PancakeSwap', 'QuickSwap', 'SushiSwap', 'Curve', 'Balancer'];

    return Array.from({ length: 12 }, (_, i) => {
      const tokenPair = tokens[Math.floor(Math.random() * tokens.length)];
      const chainA = chains[Math.floor(Math.random() * chains.length)];
      const chainB = chains.filter(c => c.name !== chainA.name)[Math.floor(Math.random() * (chains.length - 1))];
      const basePrice = 1000 + Math.random() * 3000;
      const priceDiff = 0.3 + Math.random() * 2.5;
      
      return {
        id: `opp-${i}-${Date.now()}`,
        tokenPair,
        chainA: {
          name: chainA.name,
          price: basePrice,
          dex: dexes[Math.floor(Math.random() * dexes.length)],
          logo: chainA.logo,
        },
        chainB: {
          name: chainB.name,
          price: basePrice + priceDiff,
          dex: dexes[Math.floor(Math.random() * dexes.length)],
          logo: chainB.logo,
        },
        profitPotential: Number((priceDiff / basePrice * 100).toFixed(3)),
        riskScore: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as any,
        arbitronConfidence: 65 + Math.random() * 30,
        estimatedGas: 3 + Math.random() * 25,
        timeWindow: 20 + Math.random() * 150,
        primeRating: this.getPrimeRating(priceDiff / basePrice * 100),
        volume24h: 50000 + Math.random() * 800000,
        liquidity: 25000 + Math.random() * 300000,
      };
    });
  }

  private getPrimeRating(profit: number): ArbitrageOpportunity['primeRating'] {
    if (profit > 1.8) return 'PRIME OPPORTUNITY';
    if (profit > 1.2) return 'GOOD TRADE';
    if (profit > 0.6) return 'MODERATE';
    return 'LOW PRIORITY';
  }

  generateMockPortfolio(): Portfolio {
    const baseValue = 100000;
    const variation = Math.random() * 100000;
    const totalValue = baseValue + variation;
    const pnl = -10000 + Math.random() * 30000;
    
    return {
      totalValue,
      totalPnL: pnl,
      totalPnLPercentage: (pnl / (totalValue - pnl)) * 100,
      dailyPnL: -1000 + Math.random() * 3000,
      positions: [
        {
          id: 'pos-1',
          symbol: 'ETH',
          amount: 15.5 + Math.random() * 20,
          value: 45000 + Math.random() * 30000,
          pnl: -2000 + Math.random() * 8000,
          pnlPercentage: -5 + Math.random() * 15,
          chain: 'Ethereum',
          entryPrice: 2200 + Math.random() * 400,
          currentPrice: 2300 + Math.random() * 500,
        },
        {
          id: 'pos-2',
          symbol: 'BTC',
          amount: 0.8 + Math.random() * 1.5,
          value: 35000 + Math.random() * 25000,
          pnl: -1500 + Math.random() * 6000,
          pnlPercentage: -4 + Math.random() * 12,
          chain: 'Bitcoin',
          entryPrice: 38000 + Math.random() * 8000,
          currentPrice: 40000 + Math.random() * 10000,
        },
        {
          id: 'pos-3',
          symbol: 'MATIC',
          amount: 5000 + Math.random() * 10000,
          value: 8000 + Math.random() * 5000,
          pnl: -500 + Math.random() * 2000,
          pnlPercentage: -3 + Math.random() * 10,
          chain: 'Polygon',
          entryPrice: 0.8 + Math.random() * 0.4,
          currentPrice: 0.9 + Math.random() * 0.5,
        },
      ],
      performance: {
        winRate: 65 + Math.random() * 25,
        profitFactor: 1.2 + Math.random() * 1.5,
        sharpeRatio: 1.5 + Math.random() * 1.0,
        maxDrawdown: -15 + Math.random() * 10,
        totalTrades: 120 + Math.floor(Math.random() * 100),
        avgHoldTime: 30 + Math.floor(Math.random() * 60),
      },
    };
  }

  generateMockAIModels(): AIModel[] {
    return [
      {
        name: 'ARBITRON LSTM Prime',
        type: 'LSTM',
        accuracy: 85 + Math.random() * 10,
        lastTrained: '2 hours ago',
        status: 'ACTIVE',
        confidence: 88 + Math.random() * 10,
      },
      {
        name: 'Cross-Chain GNN',
        type: 'GNN',
        accuracy: 80 + Math.random() * 12,
        lastTrained: '4 hours ago',
        status: 'ACTIVE',
        confidence: 85 + Math.random() * 12,
      },
      {
        name: 'Sentiment Analyzer',
        type: 'SENTIMENT',
        accuracy: 75 + Math.random() * 15,
        lastTrained: '1 hour ago',
        status: Math.random() > 0.7 ? 'TRAINING' : 'ACTIVE',
        confidence: 80 + Math.random() * 15,
      },
      {
        name: 'Volume Pattern AI',
        type: 'GRU',
        accuracy: 82 + Math.random() * 13,
        lastTrained: '3 hours ago',
        status: 'ACTIVE',
        confidence: 86 + Math.random() * 12,
      },
    ];
  }

  generateNetworkNodes(): NetworkNode[] {
    const chains = ['Ethereum', 'BSC', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche', 'Fantom', 'Solana'];
    return chains.map((chain, i) => ({
      id: chain.toLowerCase(),
      name: chain,
      position: [
        Math.cos(i * Math.PI * 2 / chains.length) * 4,
        Math.sin(i * Math.PI * 2 / chains.length) * 4,
        (Math.random() - 0.5) * 2
      ] as [number, number, number],
      connections: chains.filter(c => c !== chain).slice(0, 2 + Math.floor(Math.random() * 2)).map(c => c.toLowerCase()),
      activity: 0.2 + Math.random() * 0.8,
      color: ['#8B5FBF', '#5F8BBF', '#BF8B5F', '#5FBF8B', '#BF5F8B'][i % 5],
    }));
  }

  startRealTimeUpdates(
    onOpportunitiesUpdate: (opportunities: ArbitrageOpportunity[]) => void,
    onPortfolioUpdate: (portfolio: Portfolio) => void
  ) {
    if (this.isRunning) {
      this.stopRealTimeUpdates();
    }

    this.isRunning = true;

    // Update opportunities every 3 seconds
    const opportunitiesInterval = setInterval(() => {
      if (this.isRunning) {
        onOpportunitiesUpdate(this.generateMockOpportunities());
      }
    }, 3000);

    // Update portfolio every 8 seconds
    const portfolioInterval = setInterval(() => {
      if (this.isRunning) {
        onPortfolioUpdate(this.generateMockPortfolio());
      }
    }, 8000);

    this.intervals.push(opportunitiesInterval, portfolioInterval);
  }

  stopRealTimeUpdates() {
    this.isRunning = false;
    this.intervals.forEach(clearInterval);
    this.intervals = [];
  }

  // Utility methods for enhanced functionality
  getMarketStatus() {
    return {
      ethereum: Math.random() > 0.1 ? 'Active' : 'Slow',
      bsc: Math.random() > 0.05 ? 'Active' : 'Slow',
      polygon: Math.random() > 0.08 ? 'Active' : 'Slow',
      arbitrum: Math.random() > 0.15 ? 'Active' : 'Slow',
      optimism: Math.random() > 0.12 ? 'Active' : 'Slow',
    };
  }

  getTradingMetrics() {
    return {
      tradesExecuted: 15 + Math.floor(Math.random() * 20),
      successRate: 75 + Math.random() * 20,
      totalProfit: 800 + Math.random() * 1000,
      gasFees: 50 + Math.random() * 150,
    };
  }

  getAIMetrics() {
    return {
      neuralNetworkStatus: 'PRIME ACTIVE',
      predictionAccuracy: 90 + Math.random() * 8,
      processingSpeed: 8 + Math.random() * 8,
      modelConfidence: 85 + Math.random() * 12,
    };
  }
}

export const mockDataService = new MockDataService();