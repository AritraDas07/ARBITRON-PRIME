import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle, AlertCircle, ExternalLink, Zap } from 'lucide-react';
import { web3Service } from '../../services/web3Service';

interface WalletConnectionProps {
  onConnectionChange: (connected: boolean, address?: string) => void;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnectionChange }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          onConnectionChange(true, accounts[0]);
        }
      }
    } catch (error) {
      console.error('Failed to check wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      const connectedAddress = await web3Service.connectWallet();
      if (connectedAddress) {
        setAddress(connectedAddress);
        setIsConnected(true);
        onConnectionChange(true, connectedAddress);
      } else {
        setError('Failed to connect wallet');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    onConnectionChange(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative flex items-center space-x-3 bg-black/40 backdrop-blur-2xl rounded-xl px-4 py-2 border border-emerald-400/40">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-emerald-400 font-bold text-xs">NEURAL LINK</span>
            <span className="text-white text-xs font-mono">{formatAddress(address)}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={disconnectWallet}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={connectWallet}
        disabled={isConnecting}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
        <div className="relative flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl font-bold transition-all text-sm">
          {isConnecting ? <Zap className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
          <span>{isConnecting ? 'LINKING...' : 'NEURAL LINK'}</span>
        </div>
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-lg p-2"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
};