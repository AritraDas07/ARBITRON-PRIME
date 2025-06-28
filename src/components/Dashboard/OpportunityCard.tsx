import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { ArbitrageOpportunity } from '../../types';

interface OpportunityCardProps {
  opportunity: ArbitrageOpportunity;
  index: number;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, index }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'High': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'PRIME OPPORTUNITY': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/40';
      case 'GOOD TRADE': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40';
      case 'MODERATE': return 'text-amber-400 bg-amber-500/10 border-amber-500/40';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/40';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-magenta-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Card */}
      <div className="relative bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-magenta-500"></div>
        </div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-black text-white">{opportunity.tokenPair}</h3>
            <div className={`px-3 py-1 rounded-lg border text-xs font-bold ${getRatingColor(opportunity.primeRating)}`}>
              {opportunity.primeRating}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-black text-sm">{opportunity.arbitronConfidence.toFixed(1)}%</span>
          </div>
        </div>

        {/* Chain Comparison */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">{opportunity.chainA.logo}</span>
              <span className="text-white font-bold text-sm">{opportunity.chainA.name}</span>
            </div>
            <div className="text-cyan-400 font-black text-xl mb-1">
              ${opportunity.chainA.price.toFixed(2)}
            </div>
            <div className="text-slate-400 text-xs font-medium">{opportunity.chainA.dex}</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">{opportunity.chainB.logo}</span>
              <span className="text-white font-bold text-sm">{opportunity.chainB.name}</span>
            </div>
            <div className="text-magenta-400 font-black text-xl mb-1">
              ${opportunity.chainB.price.toFixed(2)}
            </div>
            <div className="text-slate-400 text-xs font-medium">{opportunity.chainB.dex}</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-emerald-400 font-black text-lg">
              +{opportunity.profitPotential.toFixed(3)}%
            </div>
            <div className="text-slate-400 text-xs font-medium">PROFIT</div>
          </div>
          <div className="text-center">
            <div className="text-amber-400 font-black text-lg">
              ${opportunity.estimatedGas.toFixed(2)}
            </div>
            <div className="text-slate-400 text-xs font-medium">GAS</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-black text-lg">
              {opportunity.timeWindow}s
            </div>
            <div className="text-slate-400 text-xs font-medium">WINDOW</div>
          </div>
        </div>

        {/* Risk and Action */}
        <div className="relative z-10 flex items-center justify-between">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border font-medium text-sm ${getRiskColor(opportunity.riskScore)}`}>
            {opportunity.riskScore === 'Low' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
            <span>{opportunity.riskScore} Risk</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 group"
          >
            <span>EXECUTE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Volume and Liquidity */}
        <div className="relative z-10 mt-6 pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-4 text-xs text-slate-400">
          <div>
            <span>24h Volume: </span>
            <span className="text-white font-bold">${(opportunity.volume24h / 1000).toFixed(1)}K</span>
          </div>
          <div>
            <span>Liquidity: </span>
            <span className="text-white font-bold">${(opportunity.liquidity / 1000).toFixed(1)}K</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};