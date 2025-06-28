import { create } from 'zustand';
import { ArbitrageOpportunity, Portfolio, AIModel, NetworkNode } from '../types';

interface ArbitronState {
  // UI State
  activeTab: string;
  isLoading: boolean;
  
  // Trading Data
  opportunities: ArbitrageOpportunity[];
  portfolio: Portfolio;
  aiModels: AIModel[];
  networkNodes: NetworkNode[];
  
  // Settings
  autoTradingEnabled: boolean;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  maxPositionSize: number;
  
  // Market Data
  marketStatus: Record<string, string>;
  tradingMetrics: Record<string, number>;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setLoading: (loading: boolean) => void;
  updateOpportunities: (opportunities: ArbitrageOpportunity[]) => void;
  updatePortfolio: (portfolio: Portfolio) => void;
  updateAIModels: (models: AIModel[]) => void;
  updateNetworkNodes: (nodes: NetworkNode[]) => void;
  toggleAutoTrading: () => void;
  setRiskTolerance: (risk: 'Conservative' | 'Moderate' | 'Aggressive') => void;
  setMaxPositionSize: (size: number) => void;
  updateMarketStatus: (status: Record<string, string>) => void;
  updateTradingMetrics: (metrics: Record<string, number>) => void;
  
  // Utility Actions
  executeArbitrage: (opportunityId: string) => void;
  closePosition: (positionId: string) => void;
  rebalancePortfolio: () => void;
}

export const useArbitronStore = create<ArbitronState>((set, get) => ({
  // Initial state
  activeTab: 'dashboard',
  isLoading: false,
  opportunities: [],
  portfolio: {
    totalValue: 0,
    totalPnL: 0,
    totalPnLPercentage: 0,
    dailyPnL: 0,
    positions: [],
    performance: {
      winRate: 0,
      profitFactor: 0,
      sharpeRatio: 0,
      maxDrawdown: 0,
      totalTrades: 0,
      avgHoldTime: 0,
    },
  },
  aiModels: [],
  networkNodes: [],
  autoTradingEnabled: false,
  riskTolerance: 'Moderate',
  maxPositionSize: 1000,
  marketStatus: {},
  tradingMetrics: {},
  
  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLoading: (loading) => set({ isLoading: loading }),
  updateOpportunities: (opportunities) => set({ opportunities }),
  updatePortfolio: (portfolio) => set({ portfolio }),
  updateAIModels: (aiModels) => set({ aiModels }),
  updateNetworkNodes: (networkNodes) => set({ networkNodes }),
  toggleAutoTrading: () => set((state) => ({ autoTradingEnabled: !state.autoTradingEnabled })),
  setRiskTolerance: (risk) => set({ riskTolerance: risk }),
  setMaxPositionSize: (size) => set({ maxPositionSize: size }),
  updateMarketStatus: (status) => set({ marketStatus: status }),
  updateTradingMetrics: (metrics) => set({ tradingMetrics: metrics }),
  
  // Utility Actions
  executeArbitrage: (opportunityId) => {
    const { opportunities, autoTradingEnabled } = get();
    if (!autoTradingEnabled) return;
    
    const opportunity = opportunities.find(o => o.id === opportunityId);
    if (opportunity) {
      // Simulate trade execution
      console.log(`Executing arbitrage for ${opportunity.tokenPair}`);
      // In a real app, this would trigger the actual trade
    }
  },
  
  closePosition: (positionId) => {
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        positions: state.portfolio.positions.filter(p => p.id !== positionId)
      }
    }));
  },
  
  rebalancePortfolio: () => {
    console.log('Rebalancing portfolio...');
    // In a real app, this would trigger portfolio rebalancing logic
  },
}));