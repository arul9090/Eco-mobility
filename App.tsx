
import React, { useState, useEffect } from 'react';
import { AppScreen } from './types.ts';
import Layout from './components/Layout.tsx';
import Home from './screens/Home.tsx';
import Planner from './screens/Planner.tsx';
import NavigationScreen from './screens/Navigation.tsx';
import Profile from './screens/Profile.tsx';
import Settings from './screens/Settings.tsx';
import Marketplace from './screens/Marketplace.tsx';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);

  // Simple hash-based router simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppScreen;
      if (Object.values(AppScreen).includes(hash)) {
        setCurrentScreen(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (screen: AppScreen) => {
    window.location.hash = screen;
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return <Home onNavigate={navigate} />;
      case AppScreen.PLANNER:
        return <Planner onNavigate={navigate} />;
      case AppScreen.NAVIGATION:
        return <NavigationScreen onNavigate={navigate} />;
      case AppScreen.PROFILE:
        return <Profile onNavigate={navigate} />;
      case AppScreen.SETTINGS:
        return <Settings onNavigate={navigate} />;
      case AppScreen.MARKETPLACE:
        return <Marketplace onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  // Navigation screen is special (no layout nav bar usually, or distinct)
  const isNavigating = currentScreen === AppScreen.NAVIGATION;

  return (
    <div className="flex flex-col min-h-screen">
      {isNavigating ? (
        renderScreen()
      ) : (
        <Layout currentScreen={currentScreen} onNavigate={navigate}>
          {renderScreen()}
        </Layout>
      )}
    </div>
  );
};

export default App;
