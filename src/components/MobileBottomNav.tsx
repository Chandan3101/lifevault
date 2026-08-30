import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Bot,
  Settings,
  Plus,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useVault } from '../context/VaultContext';
import { AppView } from '../types';
import { MobileDrawer } from './MobileDrawer';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, theme } = useVault();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDark = theme === 'dark';

  const navTabs: { id: AppView; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'documents', label: 'Vault', icon: FileText },
    { id: 'trusted-people', label: 'Family', icon: Users },
    { id: 'ai-assistant', label: 'AI', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-3 inset-x-3 z-40 md:hidden flex justify-center pointer-events-none pb-safe"
      >
        <div
          className={`pointer-events-auto w-full max-w-md h-16 rounded-[28px] px-3 flex items-center justify-around shadow-2xl transition-all duration-300 ${
            isDark
              ? 'bg-[#0E0E0E]/90 backdrop-blur-[32px] border border-white/[0.12] shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 backdrop-blur-[32px] border border-black/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.12)]'
          }`}
        >
          {navTabs.map((tab) => {
            const isActive = currentView === tab.id;
            const Icon = tab.icon;
            const isAI = tab.id === 'ai-assistant';

            return (
              <motion.button
                key={tab.id}
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={() => setCurrentView(tab.id)}
                className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-2xl transition-all cursor-pointer select-none ${
                  isActive
                    ? isAI
                      ? 'text-blue-400 font-bold'
                      : 'text-[#16C47F] font-bold'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {/* Active Indicator Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="mobileNavActivePill"
                    className={`absolute inset-0 rounded-2xl -z-10 ${
                      isAI
                        ? 'bg-blue-500/15 border border-blue-500/30'
                        : isDark
                        ? 'bg-[#16C47F]/15 border border-[#16C47F]/30'
                        : 'bg-[#16C47F]/15 border border-[#16C47F]/30'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}

                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'scale-100'}`} />
                  {isAI && (
                    <Sparkles className="absolute -top-1 -right-2 w-2.5 h-2.5 text-blue-400 animate-pulse" />
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                  {tab.label}
                </span>
              </motion.button>
            );
          })}

          {/* Center/End Floating Action Button for Drawer */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1 rounded-2xl text-neutral-400 hover:text-white transition-all cursor-pointer"
            aria-label="Open full menu drawer"
          >
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] dark:bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-neutral-300">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[9px] text-neutral-400 mt-0.5">More</span>
          </motion.button>
        </div>
      </nav>

      {/* Slide-out Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
