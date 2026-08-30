import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useVault } from '../context/VaultContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useVault();
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5',
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all ${sizeClasses[size]} ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
    >
      <div className="absolute inset-0 rounded-lg bg-[var(--bg-hover)] opacity-0 transition-opacity duration-150 hover:opacity-100" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative z-10"
        >
          {isDark ? <Sun className={`${iconSizes[size]} text-[#F2C94C]`} /> : <Moon className={`${iconSizes[size]} text-[#37352f]`} />}
        </motion.div>
      </AnimatePresence>
      {showLabel && (
        <span className="ml-2 text-xs font-medium text-[var(--text-primary)]">{isDark ? 'Light' : 'Dark'}</span>
      )}
    </motion.button>
  );
};
