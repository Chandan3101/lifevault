import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  LayoutDashboard,
  Network,
  Wallet,
  FileText,
  Users,
  HeartHandshake,
  Bot,
  AlertOctagon,
  ShieldCheck,
  Settings,
  ExternalLink,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from '../types';
import { LifeVaultLogo } from './LifeVaultLogo';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    emergencyActive,
    user,
    theme,
    setIsAuthenticated,
    showToast,
  } = useVault();

  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = theme === 'dark';

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAuthenticated(false);
    showToast({
      type: 'security',
      title: 'Vault Locked & Signed Out',
      message: 'Vault secured successfully.',
    });
    setCurrentView('landing');
  };

  const menuItems: { id: AppView; label: string; icon: any; badge?: string }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'lifemap', label: 'Life Map', icon: Network, badge: 'AI' },
    { id: 'assets', label: 'Assets', icon: Wallet },
    { id: 'documents', label: 'Doc Vault', icon: FileText, badge: 'OCR' },
    { id: 'trusted-people', label: 'Trustees', icon: Users },
    { id: 'recovery-guide', label: 'Recovery', icon: HeartHandshake },
    { id: 'ai-assistant', label: 'AI Sentinel', icon: Bot, badge: 'Gemini' },
    { id: 'emergency', label: 'Emergency SOS', icon: AlertOctagon, badge: emergencyActive ? 'LIVE' : 'SOS' },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="hidden md:flex"
      aria-label="Desktop Navigation"
    >
      <motion.div
        animate={{ width: isExpanded ? 220 : 72 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={`sticky top-3 h-[calc(100vh-1.5rem)] rounded-[18px] border ${
          isDark ? 'border-[var(--border-color)] bg-[#0d0d0d]' : 'border-[var(--border-color)] bg-[var(--bg-primary)]'
        } shadow-[0_8px_24px_rgba(15,23,42,0.06)]`}
      >
        <div className="flex h-full flex-col">
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className={`flex h-16 items-center gap-2 px-3 ${isExpanded ? 'justify-start' : 'justify-center'}`}
            aria-label="LifeVault Dashboard"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1.5">
              <LifeVaultLogo className="h-full w-full" glow={false} />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="min-w-0 text-left">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)]">LifeVault</div>
                  <div className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">AI</div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <div className={`mx-3 border-t ${isDark ? 'border-white/10' : 'border-black/5'}`} />

          <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isEmergency = item.id === 'emergency';
              const isAssistant = item.id === 'ai-assistant';

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ x: isExpanded ? 2 : 0 }}
                  onClick={() => setCurrentView(item.id)}
                  aria-label={item.label}
                  title={item.label}
                  className={`relative flex h-10 w-full items-center gap-2 rounded-lg px-2.5 transition ${
                    isActive
                      ? isEmergency
                        ? 'bg-[#EB5757]/10 text-[#EB5757]'
                        : isAssistant
                          ? 'bg-[#2D9CDB]/10 text-[#2D9CDB]'
                          : 'bg-[#27AE60]/10 text-[#27AE60]'
                      : isDark
                        ? 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                  } ${isExpanded ? 'justify-start' : 'justify-center'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-indicator"
                      className={`absolute left-0 top-1.5 h-7 w-0.5 rounded-full ${isEmergency ? 'bg-[#EB5757]' : isAssistant ? 'bg-[#2D9CDB]' : 'bg-[#27AE60]'}`}
                    />
                  )}
                  <div className="flex h-7 w-7 items-center justify-center rounded-md">
                    <Icon className="h-4 w-4" />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="ml-0.5 flex min-w-0 flex-1 items-center justify-between overflow-hidden">
                        <span className="truncate text-[11px] font-medium">{item.label}</span>
                        {item.badge && (
                          <span className={`rounded-md border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] ${isEmergency ? 'border-red-200 bg-red-50 text-red-500' : isAssistant ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-emerald-200 bg-emerald-50 text-emerald-600'}`}>
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>

          <div className={`mx-3 border-t ${isDark ? 'border-white/10' : 'border-black/5'}`} />

          <div className="space-y-2 px-2 py-3">
            <button
              type="button"
              onClick={() => setCurrentView('landing')}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 transition ${isDark ? 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'} ${isExpanded ? 'justify-start' : 'justify-center'}`}
            >
              <ExternalLink className="h-4 w-4" />
              {isExpanded && <span className="text-[11px] font-medium">Public Page</span>}
              {isExpanded && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
            </button>

            <div className={`flex items-center gap-2 rounded-lg p-2 ${isDark ? 'hover:bg-white/5' : 'hover:bg-[var(--bg-hover)]'} ${isExpanded ? 'justify-start' : 'justify-center'}`}>
              <button type="button" onClick={() => setCurrentView('settings')} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                {isExpanded && (
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11px] font-semibold">{user.name}</div>
                    <div className="truncate text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">{user.tier}</div>
                  </div>
                )}
              </button>
              {isExpanded && (
                <button type="button" onClick={handleLogout} aria-label="Log out" className="rounded-md p-1.5 text-[var(--text-secondary)] transition hover:bg-[#EB5757]/10 hover:text-[#EB5757]">
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  );
};


