import React from 'react';
import { useVault } from '../context/VaultContext';
import { CheckCircle2, ShieldAlert, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast, theme } = useVault();
  const isDark = theme === 'dark';

  const toneStyles: Record<string, { icon: any; bg: string; border: string; iconBg: string; text: string }> = {
    success: {
      icon: CheckCircle2,
      bg: isDark ? 'bg-[#0f1712]' : 'bg-[#f2fbf6]',
      border: 'border-[#27AE60]',
      iconBg: 'bg-[#27AE60]/10 text-[#27AE60]',
      text: 'text-[#27AE60]',
    },
    security: {
      icon: ShieldAlert,
      bg: isDark ? 'bg-[#0f1317]' : 'bg-[#f4f7ff]',
      border: 'border-[#2D9CDB]',
      iconBg: 'bg-[#2D9CDB]/10 text-[#2D9CDB]',
      text: 'text-[#2D9CDB]',
    },
    warning: {
      icon: AlertTriangle,
      bg: isDark ? 'bg-[#17130d]' : 'bg-[#fffaf0]',
      border: 'border-[#F2C94C]',
      iconBg: 'bg-[#F2C94C]/15 text-[#b57800]',
      text: 'text-[#b57800]',
    },
    emergency: {
      icon: AlertTriangle,
      bg: isDark ? 'bg-[#170f0f]' : 'bg-[#fff5f5]',
      border: 'border-[#EB5757]',
      iconBg: 'bg-[#EB5757]/10 text-[#EB5757]',
      text: 'text-[#EB5757]',
    },
    info: {
      icon: Info,
      bg: isDark ? 'bg-[#0e1319]' : 'bg-[#f5fbff]',
      border: 'border-[#2D9CDB]',
      iconBg: 'bg-[#2D9CDB]/10 text-[#2D9CDB]',
      text: 'text-[#2D9CDB]',
    },
  };

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[130] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = toneStyles[toast.type] ?? toneStyles.info;
          const Icon = style.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 32, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 28, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-[var(--bg-primary)] p-3 shadow-[0_12px_38px_rgba(0,0,0,0.12)] ${style.border} ${style.bg}`}
            >
              <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${style.iconBg}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h4 className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${style.text}`}>{toast.title}</h4>
                  <span className="text-[10px] text-[var(--text-muted)]">{toast.timestamp}</span>
                </div>
                <p className="mt-1 text-sm leading-5 text-[var(--text-primary)]">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="rounded-md p-1 text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)]"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
