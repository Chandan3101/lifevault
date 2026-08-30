import React from 'react';
import { VaultProvider, useVault } from './context/VaultContext';

import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CommandPalette } from './components/CommandPalette';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { CursorSpotlight } from './components/CursorSpotlight';

import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { DigitalLifeMapView } from './views/DigitalLifeMapView';
import { AssetsView } from './views/AssetsView';
import { DocumentsView } from './views/DocumentsView';
import { TrustedPeopleView } from './views/TrustedPeopleView';
import { RecoveryGuideView } from './views/RecoveryGuideView';
import { AIAssistantView } from './views/AIAssistantView';
import { EmergencyView } from './views/EmergencyView';
import { SecurityView } from './views/SecurityView';
import { SettingsView } from './views/SettingsView';

import { motion, AnimatePresence } from 'motion/react';

const MainLayout: React.FC = () => {
  const { currentView, theme, isAuthenticated } = useVault();
  const isDark = theme === 'dark';
  const shouldShowLanding = !isAuthenticated && currentView !== 'landing';

  if (currentView === 'landing' || shouldShowLanding) {
    return (
      <div className={`min-h-screen relative ${isDark ? 'bg-[#000000] text-white' : 'bg-[#ffffff] text-[#37352f]'}`}>
        <CursorSpotlight />
        <LandingPage />
        <CommandPalette />
        <ToastContainer />
        <AuthModal />
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative lv-shell ${isDark ? 'bg-[#000000] text-white' : 'bg-[#ffffff] text-[#37352f]'}`}>
      <CursorSpotlight />
      <div className="lv-page-shell">
        <div className="mx-auto flex w-full max-w-[1536px] gap-4 md:gap-6">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col pb-20 md:pb-8">
            <Navbar />
            <main className="flex-1 w-full pt-4 md:pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  {currentView === 'dashboard' && <DashboardView />}
                  {currentView === 'lifemap' && <DigitalLifeMapView />}
                  {currentView === 'assets' && <AssetsView />}
                  {currentView === 'documents' && <DocumentsView />}
                  {currentView === 'trusted-people' && <TrustedPeopleView />}
                  {currentView === 'recovery-guide' && <RecoveryGuideView />}
                  {currentView === 'ai-assistant' && <AIAssistantView />}
                  {currentView === 'emergency' && <EmergencyView />}
                  {currentView === 'security' && <SecurityView />}
                  {currentView === 'settings' && <SettingsView />}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
      <MobileBottomNav />
      <CommandPalette />
      <ToastContainer />
      <AuthModal />
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <VaultProvider>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <MainLayout />
      )}
    </VaultProvider>
  );
}