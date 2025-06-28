import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Brain, Target, Activity, Cpu, Database } from 'lucide-react';
import { useArbitronStore } from '../../store/useArbitronStore';
import { OpportunityCard } from './OpportunityCard';

export const DashboardView: React.FC = () => {
  const { opportunities, portfolio } = useArbitronStore();

  const stats = [
    {
      label: 'Quantum Opportunities',
      value: opportunities.filter(o => o.primeRating === 'PRIME OPPORTUNITY').length,
      icon: Target,
      color: 'from-cyan-400 to-blue-500',
      change: '+12%',
      glow: 'cyan',
    },
    {
      label: 'Neural Confidence',
      value: `${(opportunities.reduce((acc, o) => acc + o.arbitronConfidence, 0) / opportunities.length || 0).toFixed(1)}%`,
      icon: Brain,
      color: 'from-purple-400 to-magenta-500',
      change: '+8.2%',
      glow: 'purple',
    },
    {
      label: 'Profit Matrix',
      value: `${opportunities.reduce((acc, o) => acc + o.profitPotential, 0).toFixed(2)}%`,
      icon: TrendingUp,
      color: 'from-emerald-400 to-green-500',
      change: '+15.3%',
      glow: 'emerald',
    },
    {
      label: 'Active Nodes',
      value: portfolio.positions.length,
      icon: Database,
      color: 'from-amber-400 to-orange-500',
      change: '+3',
      glow: 'amber',
    },
  ];

  return (
    <div className="space-y-8 lg:space-y-12 px-2 sm:px-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-magenta-500/10 blur-3xl"></div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-magenta-400 bg-clip-text text-transparent mb-4 relative z-10">
          NEURAL COMMAND CENTER
        </h2>
        <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed relative z-10">
          Quantum-powered cross-chain arbitrage with advanced AI intelligence
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}></div>
              <div className="relative bg-black/40 backdrop-blur-2xl rounded-2xl p-4 lg:p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20 relative`}>
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-30 blur-md rounded-xl`}></div>
                  </div>
                  <div className="text-emerald-400 text-sm font-bold">{stat.change}</div>
                </div>
                <h3 className="text-xl lg:text-3xl font-black text-white mb-2 leading-tight">
                  {stat.value}
                </h3>
                <p className="text-slate-400 text-sm lg:text-base font-medium">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Opportunities */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-2xl lg:text-3xl font-black text-white flex items-center space-x-3"
          >
            <div className="relative">
              <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50"></div>
            </div>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              QUANTUM OPPORTUNITIES
            </span>
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center space-x-3 text-cyan-400"
          >
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">REAL-TIME NEURAL SCAN</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {opportunities.slice(0, 6).map((opportunity, index) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              index={index}
            />
          ))}
        </div>

        {opportunities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 blur-3xl"></div>
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <Cpu className="w-10 h-10 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Neural Network Scanning
            </h3>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              Quantum algorithms analyzing cross-chain data streams...
            </p>
          </motion.div>
        )}
      </div>

      {/* Market Status */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-magenta-500/10 blur-2xl"></div>
        <div className="relative bg-black/40 backdrop-blur-2xl rounded-2xl p-6 lg:p-8 border border-slate-700/50">
          <h3 className="text-xl lg:text-2xl font-black text-white mb-6 flex items-center space-x-3">
            <Activity className="w-6 h-6 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NETWORK STATUS
            </span>
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: 'Ethereum', status: 'OPTIMAL', color: 'emerald' },
              { name: 'BSC', status: 'OPTIMAL', color: 'emerald' },
              { name: 'Polygon', status: 'OPTIMAL', color: 'emerald' },
              { name: 'Arbitrum', status: 'DEGRADED', color: 'amber' },
            ].map((network, index) => (
              <motion.div 
                key={network.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className={`text-${network.color}-400 font-black text-lg lg:text-xl mb-1`}>
                  {network.status}
                </div>
                <div className="text-slate-400 text-sm font-medium">{network.name}</div>
                <div className={`w-full h-1 bg-${network.color}-400/20 rounded-full mt-2`}>
                  <div className={`h-full bg-${network.color}-400 rounded-full animate-pulse`} style={{ width: network.status === 'OPTIMAL' ? '100%' : '60%' }}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};