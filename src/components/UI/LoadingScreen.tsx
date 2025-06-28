import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Activity, Cpu, Database } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    { text: 'Initializing Quantum Core', icon: Cpu },
    { text: 'Connecting Neural Networks', icon: Brain },
    { text: 'Scanning Cross-Chain Matrix', icon: Database },
    { text: 'Calibrating AI Algorithms', icon: Activity },
    { text: 'Quantum Intelligence Online', icon: Zap },
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 12 + 8;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1500);
          return 100;
        }
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * phases.length);
        setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
        
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isLoading, onComplete, phases.length]);

  const CurrentIcon = phases[currentPhase]?.icon || Cpu;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Quantum Background */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#8000FF' : '#FF0080',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Neural Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 text-center max-w-lg mx-auto px-8">
            {/* Quantum Logo */}
            <motion.div
              className="mb-12 relative"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-magenta-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-purple-500 to-magenta-500 rounded-3xl flex items-center justify-center">
                  <span className="text-white font-black text-5xl">Λ</span>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-magenta-400 bg-clip-text text-transparent mb-4"
            >
              ARBITRON
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-cyan-300 mb-12 text-xl font-bold tracking-wider"
            >
              QUANTUM INTELLIGENCE
            </motion.p>

            {/* Progress Section */}
            <div className="space-y-8">
              {/* Current Phase */}
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center space-x-4 text-white"
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative"
                >
                  <CurrentIcon className="w-8 h-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50"></div>
                </motion.div>
                <span className="text-xl font-bold">{phases[currentPhase]?.text}</span>
              </motion.div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-magenta-500 rounded-full relative"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-magenta-500/50 animate-pulse"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-cyan-300 font-medium">Quantum Loading...</span>
                  <span className="text-white font-bold">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Neural Activity Indicators */}
              <div className="flex justify-center space-x-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantum Matrix Visualization */}
            <motion.div
              className="mt-12 grid grid-cols-6 gap-2 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 1.5 }}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-cyan-400 to-purple-500 rounded"
                  animate={{
                    backgroundColor: [
                      'rgba(0, 212, 255, 0.2)',
                      'rgba(128, 0, 255, 0.2)',
                      'rgba(255, 0, 128, 0.2)',
                      'rgba(0, 212, 255, 0.2)',
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};