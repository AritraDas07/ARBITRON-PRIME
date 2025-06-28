import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, CheckCircle, AlertCircle, Zap, Brain } from 'lucide-react';
import { web3Service } from '../../services/web3Service';

interface SmartContractInterfaceProps {
  isConnected: boolean;
  userAddress?: string;
}

export const SmartContractInterface: React.FC<SmartContractInterfaceProps> = ({ 
  isConnected, 
  userAddress 
}) => {
  const [userStats, setUserStats] = useState<any>(null);
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [aiModelStats, setAiModelStats] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'user' | 'platform' | 'ai'>('user');

  useEffect(() => {
    if (isConnected && userAddress) {
      loadContractData();
    }
  }, [isConnected, userAddress]);

  const loadContractData = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Load user stats
      if (userAddress) {
        const stats = await web3Service.getUserStats(userAddress);
        setUserStats(stats);
      }

      // Load platform stats
      const platform = await web3Service.getPlatformStats();
      setPlatformStats(platform);

      // Load AI model stats
      const models = ['ARBITRON_LSTM', 'CROSS_CHAIN_GNN', 'SENTIMENT_ANALYZER'];
      const aiStats: any = {};
      
      for (const model of models) {
        const modelData = await web3Service.getAIModelStats(model);
        if (modelData) {
          aiStats[model] = modelData;
        }
      }
      setAiModelStats(aiStats);

    } catch (error: any) {
      setError(error.message || 'Failed to load contract data');
    } finally {
      setIsLoading(false);
    }
  };

  const executeTestArbitrage = async () => {
    if (!isConnected) return;

    setIsLoading(true);
    try {
      // Create a test opportunity
      const opportunityId = await web3Service.createArbitrageOpportunity({
        tokenA: '0xA0b86a33E6441c8C06DD2b7c94b7E0e8b8b8b8b8', // Mock token A
        tokenB: '0xB0b86a33E6441c8C06DD2b7c94b7E0e8b8b8b8b8', // Mock token B
        dexA: '0xC0b86a33E6441c8C06DD2b7c94b7E0e8b8b8b8b8', // Mock DEX A
        dexB: '0xD0b86a33E6441c8C06DD2b7c94b7E0e8b8b8b8b8', // Mock DEX B
        amountIn: '1.0',
        expectedProfit: '0.05',
        confidenceScore: 85,
        deadline: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      });

      if (opportunityId) {
        // Execute the arbitrage
        const success = await web3Service.executeArbitrage(opportunityId, 50); // 0.5% max slippage
        if (success) {
          await loadContractData(); // Refresh data
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to execute test arbitrage');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async () => {
    if (!isConnected) return;

    setIsLoading(true);
    try {
      const success = await web3Service.updateUserProfile({
        riskTolerance: 2, // Moderate
        autoTradingEnabled: true,
        maxPositionSize: '10.0'
      });

      if (success) {
        await loadContractData(); // Refresh data
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update user profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20 text-center"
      >
        <Code className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Smart Contract Interface</h3>
        <p className="text-slate-400">Connect your wallet to interact with ARBITRON PRIME smart contracts</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          ARBITRON PRIME Smart Contracts
        </h3>
        <p className="text-slate-400">Real-time blockchain interaction and on-chain analytics</p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1">
        {[
          { id: 'user', label: 'User Stats', icon: CheckCircle },
          { id: 'platform', label: 'Platform', icon: Zap },
          { id: 'ai', label: 'AI Models', icon: Brain }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={16} />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
        {isLoading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading contract data...</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 mb-6"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* User Stats Tab */}
        {activeTab === 'user' && userStats && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white mb-4">Your Trading Statistics</h4>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{userStats.totalTrades}</div>
                <div className="text-slate-400 text-sm">Total Trades</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">{userStats.winRate.toFixed(1)}%</div>
                <div className="text-slate-400 text-sm">Win Rate</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{parseFloat(userStats.totalProfit).toFixed(4)} ETH</div>
                <div className="text-slate-400 text-sm">Total Profit</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={executeTestArbitrage}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Test Arbitrage</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={updateUserProfile}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-lg font-medium border border-slate-600/30 hover:border-purple-500/30 transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Update Profile</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Platform Stats Tab */}
        {activeTab === 'platform' && platformStats && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white mb-4">Platform Statistics</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">
                  {parseFloat(platformStats.totalVolume).toFixed(2)} ETH
                </div>
                <div className="text-slate-400 text-sm">Total Volume</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">
                  {parseFloat(platformStats.totalProfit).toFixed(4)} ETH
                </div>
                <div className="text-slate-400 text-sm">Total Profit</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{platformStats.platformFee}%</div>
                <div className="text-slate-400 text-sm">Platform Fee</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Models Tab */}
        {activeTab === 'ai' && Object.keys(aiModelStats).length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white mb-4">AI Model Performance</h4>
            
            <div className="space-y-4">
              {Object.entries(aiModelStats).map(([modelName, stats]: [string, any]) => (
                <div key={modelName} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-white">{modelName.replace('_', ' ')}</h5>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      stats.isActive 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {stats.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-purple-400 font-bold">{stats.accuracy.toFixed(1)}%</div>
                      <div className="text-slate-400">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-blue-400 font-bold">{stats.totalPredictions}</div>
                      <div className="text-slate-400">Predictions</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold">{stats.successfulPredictions}</div>
                      <div className="text-slate-400">Successful</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};