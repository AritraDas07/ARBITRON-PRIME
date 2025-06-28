import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Settings, BarChart3, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { useArbitronStore } from '../../store/useArbitronStore';

export const TradingView: React.FC = () => {
  const { autoTradingEnabled, toggleAutoTrading, riskTolerance, setRiskTolerance } = useArbitronStore();
  const [maxPositionSize, setMaxPositionSize] = useState(1000);
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);

  const strategies = [
    {
      name: 'ARBITRON Classic',
      description: 'Conservative cross-chain arbitrage with high success rate',
      performance: '+12.5%',
      risk: 'Low',
      active: true,
    },
    {
      name: 'PRIME Aggressive',
      description: 'High-frequency trading with flash loan integration',
      performance: '+28.3%',
      risk: 'High',
      active: false,
    },
    {
      name: 'Neural Network Alpha',
      description: 'AI-powered prediction model for optimal entry/exit',
      performance: '+19.7%',
      risk: 'Medium',
      active: false,
    },
  ];

  const todayStats = [
    { label: 'Trades Executed', value: '23', color: 'text-blue-400' },
    { label: 'Success Rate', value: '87.5%', color: 'text-emerald-400' },
    { label: 'Total Profit', value: '+$1,245.67', color: 'text-emerald-400' },
    { label: 'Gas Fees', value: '$127.83', color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-2 sm:px-4"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 leading-tight">
          ARBITRON Trading Hub
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
          Automated trading controls and strategy management
        </p>
      </motion.div>

      {/* Main Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Trading Control Panel */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Auto Trading Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                <span className="leading-tight">Automated Trading</span>
              </h3>
              <motion.button
                onClick={toggleAutoTrading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all w-full sm:w-auto justify-center text-sm sm:text-base ${
                  autoTradingEnabled
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white'
                }`}
              >
                {autoTradingEnabled ? <Pause size={16} /> : <Play size={16} />}
                <span>{autoTradingEnabled ? 'Stop Trading' : 'Start Trading'}</span>
              </motion.button>
            </div>
            
            <div className={`p-3 sm:p-4 rounded-lg border ${
              autoTradingEnabled 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-700/30 border-slate-600/30 text-slate-400'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {autoTradingEnabled ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                <span className="font-medium text-sm sm:text-base leading-tight">
                  {autoTradingEnabled ? 'ARBITRON PRIME Active' : 'Trading Paused'}
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                {autoTradingEnabled 
                  ? 'AI is actively monitoring and executing profitable arbitrage opportunities'
                  : 'Manual mode - opportunities will be detected but not executed automatically'
                }
              </p>
            </div>
          </motion.div>

          {/* Risk Management */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
              <span className="leading-tight">Risk Management</span>
            </h3>
            
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 sm:mb-3 leading-tight">
                  Risk Tolerance
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Conservative', 'Moderate', 'Aggressive'].map((risk) => (
                    <motion.button
                      key={risk}
                      onClick={() => setRiskTolerance(risk as any)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-2 sm:p-3 rounded-lg border transition-all text-xs sm:text-sm lg:text-base leading-tight ${
                        riskTolerance === risk
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                          : 'bg-slate-700/30 border-slate-600/30 text-slate-400 hover:border-purple-500/30'
                      }`}
                    >
                      {risk}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 leading-tight">
                    Max Position Size
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                    <input
                      type="number"
                      value={maxPositionSize}
                      onChange={(e) => setMaxPositionSize(Number(e.target.value))}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-8 sm:pl-10 pr-3 py-2 text-white focus:border-purple-500/50 focus:outline-none text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 leading-tight">
                    Slippage Tolerance (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={slippageTolerance}
                    onChange={(e) => setSlippageTolerance(Number(e.target.value))}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:border-purple-500/50 focus:outline-none text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strategy Selector and Stats */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Strategy Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 leading-tight">Trading Strategies</h3>
            
            <div className="space-y-2 sm:space-y-3">
              {strategies.map((strategy, index) => (
                <motion.div
                  key={strategy.name}
                  whileHover={{ scale: 1.02 }}
                  className={`p-2 sm:p-3 lg:p-4 rounded-lg border cursor-pointer transition-all ${
                    strategy.active
                      ? 'bg-purple-500/10 border-purple-500/30'
                      : 'bg-slate-700/30 border-slate-600/30 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-xs sm:text-sm lg:text-base leading-tight truncate pr-2">
                      {strategy.name}
                    </h4>
                    <div className={`px-2 py-1 rounded text-xs flex-shrink-0 ${
                      strategy.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600/20 text-slate-400'
                    }`}>
                      {strategy.active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3 leading-relaxed">
                    {strategy.description}
                  </p>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-emerald-400">{strategy.performance}</span>
                    <span className={`${
                      strategy.risk === 'Low' ? 'text-emerald-400' :
                      strategy.risk === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {strategy.risk} Risk
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Today's Performance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 leading-tight">Today's Performance</h3>
            
            <div className="space-y-2 sm:space-y-3">
              {todayStats.map((stat, index) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs sm:text-sm leading-tight truncate pr-2">{stat.label}</span>
                  <span className={`font-medium text-xs sm:text-sm ${stat.color} flex-shrink-0`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};