import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, TrendingUp, Menu, X, Cpu } from 'lucide-react';
import { useArbitronStore } from '../../store/useArbitronStore';
import { WalletConnection } from '../Web3/WalletConnection';
import { useState } from 'react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, autoTradingEnabled, toggleAutoTrading } = useArbitronStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const tabs = [
    { id: 'dashboard', label: 'Neural Core', icon: Cpu },
    { id: 'trading', label: 'Quantum Trade', icon: TrendingUp },
    { id: 'analytics', label: 'AI Matrix', icon: Zap },
    { id: 'portfolio', label: 'Asset Vault', icon: Shield },
  ];

  const handleWalletConnection = (connected: boolean, address?: string) => {
    setIsWalletConnected(connected);
    if (address) {
      setWalletAddress(address);
    }
  };

  return (
    <motion.header 
      className="relative z-50 bg-black/20 backdrop-blur-2xl border-b border-cyan-500/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-magenta-500/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-cyan-400 via-purple-500 to-magenta-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-magenta-500/20 animate-pulse"></div>
                <span className="text-white font-black text-xl lg:text-2xl relative z-10">Λ</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-xl blur-lg opacity-40 animate-pulse"></div>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-magenta-400 bg-clip-text text-transparent">
                ARBITRON
              </h1>
              <p className="text-cyan-300/80 text-xs lg:text-sm font-medium tracking-wider">
                QUANTUM INTELLIGENCE
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2 bg-black/30 backdrop-blur-xl rounded-2xl p-2 border border-cyan-500/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl flex items-center space-x-3 transition-all font-medium ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-magenta-500/20 rounded-xl border border-cyan-400/30"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Status and Controls */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Wallet Connection */}
            <div className="hidden sm:block">
              <WalletConnection onConnectionChange={handleWalletConnection} />
            </div>

            {/* Auto Trading Toggle */}
            <motion.button
              onClick={toggleAutoTrading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all font-medium ${
                autoTradingEnabled
                  ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-400/40 text-emerald-300'
                  : 'bg-black/30 border-slate-600/30 text-slate-400 hover:border-cyan-400/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-2 h-2 rounded-full ${autoTradingEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="hidden sm:inline text-sm">
                {autoTradingEnabled ? 'QUANTUM ACTIVE' : 'STANDBY'}
              </span>
            </motion.button>
            
            {/* Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {isWalletConnected ? 'NEURAL LINK' : 'PRIME ONLINE'}
              </span>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-cyan-300 bg-black/30 rounded-xl border border-slate-600/30"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
          initial={false}
          animate={{ 
            maxHeight: isMobileMenuOpen ? 384 : 0,
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="py-4 space-y-3 bg-black/20 backdrop-blur-xl rounded-2xl mt-4 border border-cyan-500/20">
            {/* Mobile Wallet Connection */}
            <div className="mb-4 px-4 sm:hidden">
              <WalletConnection onConnectionChange={handleWalletConnection} />
            </div>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl transition-all font-medium ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-magenta-500/20 border border-cyan-400/30 text-white'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-black/30'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};