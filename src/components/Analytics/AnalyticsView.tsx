import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Zap, Target, Activity, Clock, BarChart3 } from 'lucide-react';
import { useArbitronStore } from '../../store/useArbitronStore';

export const AnalyticsView: React.FC = () => {
  const { aiModels } = useArbitronStore();

  const aiMetrics = [
    {
      name: 'Neural Network Status',
      value: 'PRIME ACTIVE',
      status: 'optimal',
      description: 'All AI models running at peak performance',
      icon: Brain,
    },
    {
      name: 'Prediction Accuracy',
      value: '94.2%',
      status: 'excellent',
      description: 'Average accuracy across all prediction models',
      icon: Target,
    },
    {
      name: 'Processing Speed',
      value: '12ms',
      status: 'optimal',
      description: 'Average time to analyze cross-chain opportunities',
      icon: Clock,
    },
    {
      name: 'Model Confidence',
      value: '89.1%',
      status: 'high',
      description: 'AI confidence in current market predictions',
      icon: TrendingUp,
    },
  ];

  const modelPerformance = [
    { model: 'LSTM Price Predictor', accuracy: 92.5, status: 'ACTIVE', confidence: 95.2 },
    { model: 'GNN Cross-Chain Analyzer', accuracy: 88.3, status: 'ACTIVE', confidence: 91.7 },
    { model: 'Sentiment Analysis Engine', accuracy: 85.1, status: 'TRAINING', confidence: 87.3 },
    { model: 'Volume Pattern Recognition', accuracy: 90.7, status: 'ACTIVE', confidence: 93.8 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'excellent': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'high': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-2 sm:px-4"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 leading-tight">
          ARBITRON AI Analytics Hub
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
          Advanced neural network analysis and predictive intelligence
        </p>
      </motion.div>

      {/* AI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {aiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
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
                <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status.toUpperCase()}
                </div>
              </div>
              <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 leading-tight break-words">
                {metric.value}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2 leading-tight break-words">{metric.name}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{metric.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Model Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
        >
          <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 flex items-center space-x-2">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400 flex-shrink-0" />
            <span className="leading-tight">Neural Network Performance</span>
          </h3>

          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {modelPerformance.map((model, index) => (
              <motion.div
                key={model.model}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-slate-700/30 rounded-lg p-2 sm:p-3 lg:p-4 border border-slate-600/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 space-y-1 sm:space-y-0">
                  <h4 className="font-medium text-white text-xs sm:text-sm lg:text-base leading-tight truncate pr-2">
                    {model.model}
                  </h4>
                  <div className={`px-2 py-1 rounded text-xs font-medium self-start sm:self-auto flex-shrink-0 ${
                    model.status === 'ACTIVE' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {model.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 mb-1 leading-tight">Accuracy</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-600/50 rounded-full h-1.5 sm:h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-blue-400 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${model.accuracy}%` }}
                        />
                      </div>
                      <span className="text-purple-400 font-medium text-xs sm:text-sm flex-shrink-0">
                        {model.accuracy}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 mb-1 leading-tight">Confidence</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-600/50 rounded-full h-1.5 sm:h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-blue-400 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${model.confidence}%` }}
                        />
                      </div>
                      <span className="text-emerald-400 font-medium text-xs sm:text-sm flex-shrink-0">
                        {model.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-500/20"
        >
          <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 flex items-center space-x-2">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400 flex-shrink-0" />
            <span className="leading-tight">Real-time Analysis</span>
          </h3>

          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Neural Network Visualization */}
            <div className="bg-slate-700/30 rounded-lg p-2 sm:p-3 lg:p-4">
              <h4 className="font-medium text-white mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base leading-tight">
                Network Activity
              </h4>
              <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
                {Array.from({ length: 9 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square bg-purple-500/20 rounded border border-purple-500/30 flex items-center justify-center"
                    animate={{
                      backgroundColor: [
                        'rgba(139, 95, 191, 0.1)',
                        'rgba(139, 95, 191, 0.3)',
                        'rgba(139, 95, 191, 0.1)',
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-purple-400 rounded-full" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Market Sentiment */}
            <div className="bg-slate-700/30 rounded-lg p-2 sm:p-3 lg:p-4">
              <h4 className="font-medium text-white mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base leading-tight">
                Market Sentiment Analysis
              </h4>
              <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs sm:text-sm leading-tight">Social Media</span>
                  <span className="text-emerald-400 font-medium text-xs sm:text-sm">Bullish 72%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs sm:text-sm leading-tight">News Sentiment</span>
                  <span className="text-blue-400 font-medium text-xs sm:text-sm">Neutral 58%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs sm:text-sm leading-tight">On-chain Activity</span>
                  <span className="text-emerald-400 font-medium text-xs sm:text-sm">High 84%</span>
                </div>
              </div>
            </div>

            {/* Prediction Confidence */}
            <div className="bg-slate-700/30 rounded-lg p-2 sm:p-3 lg:p-4">
              <h4 className="font-medium text-white mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base leading-tight">
                Prediction Confidence
              </h4>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-slate-400">Next Hour</span>
                    <span className="text-emerald-400">94.2%</span>
                  </div>
                  <div className="bg-slate-600/50 rounded-full h-1.5 sm:h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-emerald-400 to-purple-400 h-1.5 sm:h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '94.2%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-slate-400">Next 4 Hours</span>
                    <span className="text-blue-400">87.5%</span>
                  </div>
                  <div className="bg-slate-600/50 rounded-full h-1.5 sm:h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-1.5 sm:h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '87.5%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};