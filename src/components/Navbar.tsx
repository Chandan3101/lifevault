import React, { useEffect, useRef, useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Search,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LifeVaultLogo } from './LifeVaultLogo';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const {
    setCommandPaletteOpen,
    theme,
    setCurrentView,
    user,
    isAuthenticated,
    setAuthModalOpen,
    setAuthMode,
    showToast,
    logoutSession,
  } = useVault();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const isDark = theme === 'dark';

  const handleLogout = () => {
    logoutSession();
    setProfileMenuOpen(false);
    showToast({
      type: 'security',
      title: 'Vault Locked & Signed Out',
      message: 'Master hardware enclave key purged from memory.',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        lastScrollYRef.current = 0;
        setIsHeaderVisible(true);
        return;
      }

      const delta = currentScrollY - lastScrollYRef.current;
      if (Math.abs(delta) < 8) {
        return;
      }

      if (delta > 0 && currentScrollY > 72) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const onScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        handleScroll();
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-50 pb-3 pt-3"
      style={{
        transform: isHeaderVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -110%, 0)',
        opacity: isHeaderVisible ? 1 : 0.96,
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform, opacity',
        pointerEvents: isHeaderVisible ? 'auto' : 'none',
      }}
    >
      <div
        className={`mx-auto flex w-full max-w-[1440px] items-center gap-3 rounded-[18px] border px-3 py-2.5 md:px-4 ${isDark ? 'border-[var(--border-color)] bg-[#0d0d0d]/90' : 'border-[var(--border-color)] bg-[var(--bg-primary)]/90'
          } backdrop-blur-sm`}
      >
        <button
          type="button"
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2 md:hidden"
          aria-label="Go to dashboard"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1.5">
            <LifeVaultLogo className="h-full w-full" glow={false} />
          </div>
        </button>

        <div className="hidden min-w-0 items-center gap-3 md:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1.5">
            <LifeVaultLogo className="h-full w-full" glow={false} />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)]">LifeVault</div>
            <div className="truncate text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">AI</div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => setCommandPaletteOpen(true)}
            className={`flex w-full items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2 text-left text-xs transition hover:border-[#27AE60]/40 hover:shadow-[0_0_0_3px_rgba(39,174,96,0.08)] md:w-[480px] ${isDark ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]'
              }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="truncate">Search assets, documents, trustees...</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" />

          {isAuthenticated ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2.5 py-2 transition hover:bg-[var(--bg-hover)]"
              >
                <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full object-cover" />
                <span className="text-[11px] font-medium text-[var(--text-primary)]">{user.name}</span>
                <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      className={`absolute right-0 z-50 mt-3 w-52 rounded-[18px] border p-2 ${isDark ? 'border-[var(--border-color)] bg-[#111111] text-white' : 'border-[var(--border-color)] bg-white text-[var(--text-primary)]'
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setCurrentView('settings');
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                      >
                        Profile
                        <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setCurrentView('settings');
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                      >
                        Settings
                        <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      </button>
                      <div className="my-1 border-t border-[var(--border-color)]" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-[#EB5757] hover:bg-[#EB5757]/10"
                      >
                        Logout
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2 text-[11px] font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-hover)]"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setAuthModalOpen(true);
                }}
                className="rounded-lg border border-[#27AE60]/30 bg-[#27AE60] px-3 py-2 text-[11px] font-semibold text-black transition hover:bg-[#2ecc71]"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
