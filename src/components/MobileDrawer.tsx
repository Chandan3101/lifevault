import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  X,
  ExternalLink,
  ChevronRight,
  User,
  LogOut,
  Sparkles,
  Search,
  Lock,
} from 'lucide-react';
import { useVault } from '../context/VaultContext';
import { AppView } from '../types';
import { LifeVaultLogo } from './LifeVaultLogo';
import { ThemeToggle } from './ThemeToggle';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const {
    currentView,
    setCurrentView,
    user,
    emergencyActive,
    theme,
    isAuthenticated,
    setAuthModalOpen,
    setAuthMode,
    setCommandPaletteOpen,
    setIsAuthenticated,
    showToast,
  } = useVault();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    setIsAuthenticated(false);
    onClose();
    showToast({
      type: 'security',
      title: 'Vault Locked & Signed Out',
      message: 'Master hardware enclave key purged from memory.',
    });
    setCurrentView('landing');
  };

  const navItems: { id: AppView; label: string; icon: any; badge?: string; desc: string; isSpecial?: boolean }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, desc: 'Digital estate executive dashboard' },
    { id: 'lifemap', label: 'Digital Life Map', icon: Network, badge: 'Interactive', desc: 'Visual network of assets & trustees' },
    { id: 'assets', label: 'Assets & Wealth', icon: Wallet, desc: 'Bank accounts, equity, real estate & crypto' },
    { id: 'documents', label: 'Document Vault', icon: FileText, badge: 'OCR', desc: 'Zero-knowledge encrypted wills & deeds' },
    { id: 'trusted-people', label: 'Trusted People', icon: Users, desc: 'Multi-sig family & legal executors' },
    { id: 'recovery-guide', label: 'Recovery Guide', icon: HeartHandshake, desc: 'Step-by-step continuity roadmaps' },
    { id: 'ai-assistant', label: 'AI Sentinel', icon: Bot, badge: 'Gemini 3.7', desc: 'Autonomous continuity advisor', isSpecial: true },
    { id: 'emergency', label: 'Emergency Hub', icon: AlertOctagon, badge: emergencyActive ? 'ACTIVE' : 'SOS', desc: 'Consensus verification & claim release' },
    { id: 'security', label: 'Security Enclave', icon: ShieldCheck, desc: 'SHA-256 integrity & biometric audits' },
    { id: 'settings', label: 'Vault Settings', icon: Settings, desc: 'FIDO2 keys, notifications & account' },
  ];

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Bottom/Slide-up Sheet Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`relative w-full max-h-[88vh] rounded-t-[32px] p-6 flex flex-col z-10 overflow-hidden shadow-2xl border-t ${
              isDark
                ? 'bg-[#0E0E0E]/95 backdrop-blur-[36px] border-white/[0.12] text-white'
                : 'bg-white/95 backdrop-blur-[36px] border-black/[0.08] text-neutral-900'
            }`}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 rounded-full bg-neutral-500/40 mx-auto mb-4 shrink-0" />

            {/* Header: Logo, User, Search & Close */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] dark:border-white/[0.08] shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-emerald-500/30 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(22,196,127,0.3)]">
                  <LifeVaultLogo className="w-full h-full" glow={false} />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-sm tracking-tight">LIFEVAULT</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#16C47F]/15 text-[#16C47F] font-mono font-bold">AI</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-medium">Digital Continuity Drawer</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ThemeToggle size="sm" />
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Search and Top Action Strip */}
            <div className="grid grid-cols-2 gap-2 my-3 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  setCommandPaletteOpen(true);
                }}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:border-[#16C47F]/40'
                    : 'bg-black/[0.03] border-black/[0.06] text-neutral-700 hover:border-[#16C47F]/40'
                }`}
              >
                <Search className="w-4 h-4 text-neutral-400" />
                <span>Search (⌘K)</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setCurrentView('emergency');
                }}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  emergencyActive
                    ? 'bg-red-600 text-white animate-pulse border-red-500'
                    : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                }`}
              >
                <AlertOctagon className="w-4 h-4" />
                <span>{emergencyActive ? 'SOS ACTIVE' : 'Emergency SOS'}</span>
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 my-2 min-h-0">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full min-h-[52px] p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-[#16C47F]/15 border-[#16C47F]/40 text-[#16C47F] shadow-[0_0_20px_rgba(22,196,127,0.15)]'
                          : 'bg-[#16C47F]/10 border-[#16C47F]/40 text-[#0E9F6E]'
                        : isDark
                        ? 'bg-white/[0.02] border-white/[0.05] text-neutral-300 hover:bg-white/[0.06]'
                        : 'bg-black/[0.02] border-black/[0.04] text-neutral-700 hover:bg-black/[0.05]'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#16C47F] text-black shadow-sm'
                            : 'bg-black/20 dark:bg-white/[0.06] text-neutral-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold truncate">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold bg-[#16C47F]/15 text-[#16C47F]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-500 truncate">{item.desc}</p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-neutral-500 shrink-0" />
                  </motion.button>
                );
              })}
            </div>

            {/* Footer: User Account & Authentication Buttons */}
            <div className="pt-3 border-t border-black/[0.08] dark:border-white/[0.08] shrink-0 space-y-2.5">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => handleNavigate('settings')}
                      className="flex items-center space-x-3 cursor-pointer py-1"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-[#16C47F]/40"
                      />
                      <div>
                        <div className="text-xs font-bold leading-tight">{user.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">{user.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleNavigate('landing')}
                        className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                        title="Public Landing"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Log Out Action Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500/20 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Lock & Log Out of Vault</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#16C47F]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">Vault Locked</div>
                        <div className="text-[10px] text-neutral-500 font-mono">Guest Session</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavigate('landing')}
                      className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                      title="Public Landing"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sign In & Sign Up Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        setAuthMode('login');
                        setAuthModalOpen(true);
                      }}
                      className="py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] transition-colors cursor-pointer text-center"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        setAuthMode('signup');
                        setAuthModalOpen(true);
                      }}
                      className="py-2.5 rounded-xl bg-[#16C47F] hover:bg-[#13B172] text-black text-xs font-bold transition-colors cursor-pointer shadow-xs text-center"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
