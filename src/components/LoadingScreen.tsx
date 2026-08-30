import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
}) => {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-[#060606] text-white flex items-center justify-center"
    >
      <div className="flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-2xl border border-emerald-500/30 bg-[#0E0E0E] flex items-center justify-center shadow-[0_0_40px_rgba(22,196,127,0.25)]"
        >
          <div className="w-8 h-8 rounded-full border-2 border-emerald-400 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
        </motion.div>

        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-5 text-xl font-bold tracking-[0.18em]"
        >
          LIFEVAULT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-1 text-[10px] uppercase tracking-[0.25em] text-neutral-500"
        >
          Digital Legacy
        </motion.p>

        {/* Loading line */}
        <div className="mt-8 w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 1.6,
              ease: 'easeInOut',
            }}
            className="h-full bg-emerald-400"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-[10px] font-mono text-neutral-600"
        >
          SECURE INITIALIZATION
        </motion.p>

      </div>
    </motion.div>
  );
};