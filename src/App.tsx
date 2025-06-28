import React, { useEffect, useState } from 'react';
import { ArbitronBackground } from './components/3D/ArbitronBackground';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { Header } from './components/Layout/Header';
import { DashboardView } from './components/Dashboard/DashboardView';
import { TradingView } from './components/Trading/TradingView';
import { AnalyticsView } from './components/Analytics/AnalyticsView';
import { PortfolioView } from './components/Portfolio/PortfolioView';
import { SmartContractInterface } from './components/Web3/SmartContractInterface';
import { useArbitronStore } from './store/useArbitronStore';
import { mockDataService } from './services/mockDataService';
import { web3Service } from './services/web3Service';

function App() {
  const { activeTab, updateOpportunities, updatePortfolio } = useArbitronStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Enhanced loading experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsAppReady(true);
    
    // Initialize with mock data after loading
    updateOpportunities(mockDataService.generateMockOpportunities());
    updatePortfolio(mockDataService.generateMockPortfolio());

    // Start real-time updates
    mockDataService.startRealTimeUpdates(
      updateOpportunities,
      updatePortfolio
    );

    // Set up Web3 event listeners
    web3Service.onArbitrageExecuted((event) => {
      console.log('Arbitrage executed:', event);
    });

    web3Service.onOpportunityCreated((event) => {
      console.log('Opportunity created:', event);
    });
  };

  useEffect(() => {
    return () => {
      mockDataService.stopRealTimeUpdates();
      web3Service.removeAllListeners();
    };
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'trading':
        return <TradingView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'contracts':
        return <SmartContractInterface isConnected={false} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
      
      {isAppReady && (
        <>
          <ArbitronBackground />
          
          {/* Cyberpunk Grid Overlay */}
          <div className="fixed inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 0, 255, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          {/* Matrix Rain Effect */}
          <div className="fixed inset-0 opacity-8 pointer-events-none overflow-hidden">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="absolute w-px h-screen animate-matrix"
                style={{
                  left: `${i * 4}%`,
                  background: 'linear-gradient(180deg, transparent 0%, #39FF14 50%, transparent 100%)',
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          {/* Data Flow Lines */}
          <div className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute h-px w-full animate-data-flow"
                style={{
                  top: `${10 + i * 10}%`,
                  background: 'linear-gradient(90deg, transparent 0%, #00FFFF 50%, transparent 100%)',
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: '4s'
                }}
              />
            ))}
          </div>

          {/* Neon Glow Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-40 h-40 bg-magenta-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-20 w-36 h-36 bg-lime-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
          
          <div className="relative z-10 min-h-screen">
            <Header />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl">
              <div className="w-full">
                {renderActiveView()}
              </div>
            </main>

            {/* Floating Smart Contract Access */}
            {activeTab !== 'contracts' && (
              <div className="fixed bottom-6 right-6 z-50">
                <button
                  onClick={() => useArbitronStore.getState().setActiveTab('contracts')}
                  className="group relative"
                  title="Smart Contracts"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-magenta-500 to-lime-400 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-cyber-pulse"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 via-magenta-500 to-lime-500 hover:from-cyan-400 hover:via-magenta-400 hover:to-lime-400 text-white p-4 rounded-2xl shadow-2xl transition-all group-hover:scale-110 border border-cyan-400/50 animate-neon-flicker">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;