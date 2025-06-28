import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Award, BarChart3 } from 'lucide-react';
import { useArbitronStore } from '../../store/useArbitronStore';

export const PortfolioView: React.FC = () => {
  const { portfolio } = useArbitronStore();

  const performanceCards = [
    {
      title: 'Total Portfolio Value',
      value: `$${portfolio.totalValue.toLocaleString()}`,
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
    },
    {
      title: 'Total P&L',
      value: `$${portfolio.totalPnL.toLocaleString()}`,
      change: `${portfolio.totalPnLPercentage > 0 ? '+' : ''}${portfolio.totalPnLPercentage.toFixed(2)}%`,
      positive: portfolio.totalPnL > 0,
      icon: TrendingUp,
    },
    {
      title: 'Daily P&L',
      value: `$${portfolio.dailyPnL.toLocaleString()}`,
      change: '+8.3%',
      positive: portfolio.dailyPnL > 0,
      icon: Activity,
    },
    {
      title: 'Win Rate',
      value: `${portfolio.performance.winRate}%`,
      change: '+2.1%',
      positive: true,
      icon: Award,
    },
  ];

  const riskMetrics = [
    { label: 'Portfolio Risk', value: 25, status: 'Low', color: 'emerald' },
    { label: 'Diversification', value: 75, status: 'Good', color: 'blue' },
    { label: 'Volatility', value: 50, status: 'Medium', color: 'amber' },
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
          ARBITRON Portfolio Management
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
          Advanced portfolio analytics and performance tracking
        </p>
      </motion.div>

      {/* Performance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {performanceCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="p-1.5 sm:p-2 lg:p-3 rounded-md sm:rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex-shrink-0">
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-purple-400" />
                </div>
                <div className={`text-xs sm:text-sm font-medium ${
                  card.positive ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {card.change}
                </div>
              </div>
              <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 leading-tight break-words">
                {card.value}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-tight break-words">{card.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Current Positions */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 flex items-center space-x-2">
              <PieChart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400 flex-shrink-0" />
              <span className="leading-tight">Active Positions</span>
            </h3>

            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {portfolio.positions.length > 0 ? (
                portfolio.positions.map((position, index) => (
                  <motion.div
                    key={position.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-slate-700/30 rounded-lg p-2 sm:p-3 lg:p-4 border border-slate-600/30 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs sm:text-sm">
                            {position.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-white text-xs sm:text-sm lg:text-base leading-tight truncate">
                            {position.symbol}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-400 leading-tight truncate">{position.chain}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`font-bold text-xs sm:text-sm lg:text-base leading-tight ${
                          position.pnl > 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {position.pnl > 0 ? '+' : ''}${position.pnl.toLocaleString()}
                        </div>
                        <div className={`text-xs sm:text-sm leading-tight ${
                          position.pnlPercentage > 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {position.pnlPercentage > 0 ? '+' : ''}{position.pnlPercentage.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                      <div className="truncate">
                        <span className="text-slate-400">Amount: </span>
                        <span className="text-white">{position.amount}</span>
                      </div>
                      <div className="truncate">
                        <span className="text-slate-400">Entry: </span>
                        <span className="text-white">${position.entryPrice.toLocaleString()}</span>
                      </div>
                      <div className="truncate">
                        <span className="text-slate-400">Current: </span>
                        <span className="text-white">${position.currentPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-4 sm:py-6 lg:py-8">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <PieChart className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-slate-400" />
                  </div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-medium text-slate-300 mb-2 leading-tight">
                    No Active Positions
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Start trading to see your positions here
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Performance Metrics and Risk Analysis */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Performance Metrics
            </h3>
            
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs sm:text-sm leading-tight">Sharpe Ratio</span>
                <span className="text-purple-400 font-bold text-xs sm:text-sm">
                  {portfolio.performance.sharpeRatio}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs sm:text-sm leading-tight">Profit Factor</span>
                <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                  {portfolio.performance.profitFactor}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs sm:text-sm leading-tight">Max Drawdown</span>
                <span className="text-rose-400 font-bold text-xs sm:text-sm">
                  {portfolio.performance.maxDrawdown}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs sm:text-sm leading-tight">Total Trades</span>
                <span className="text-white font-bold text-xs sm:text-sm">
                  {portfolio.performance.totalTrades}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs sm:text-sm leading-tight">Avg Hold Time</span>
                <span className="text-white font-bold text-xs sm:text-sm">
                  {portfolio.performance.avgHoldTime}m
                </span>
              </div>
            </div>
          </motion.div>

          {/* Risk Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Risk Analysis
            </h3>
            
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {riskMetrics.map((metric, index) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-slate-400 leading-tight">{metric.label}</span>
                    <span className={`text-${metric.color}-400`}>{metric.status}</span>
                  </div>
                  <div className="bg-slate-600/50 rounded-full h-1.5 sm:h-2">
                    <motion.div 
                      className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-500 h-1.5 sm:h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Quick Actions
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white py-2 px-3 sm:px-4 rounded-lg font-medium transition-all text-xs sm:text-sm"
              >
                Rebalance Portfolio
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white py-2 px-3 sm:px-4 rounded-lg font-medium border border-slate-600/30 hover:border-purple-500/30 transition-all text-xs sm:text-sm"
              >
                Export Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white py-2 px-3 sm:px-4 rounded-lg font-medium border border-slate-600/30 hover:border-purple-500/30 transition-all text-xs sm:text-sm"
              >
                Risk Assessment
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};