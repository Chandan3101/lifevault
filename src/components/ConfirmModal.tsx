import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  confirmLabel = 'Proceed',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) => {
  const variantStyles = {
    primary: 'bg-[#27AE60] hover:bg-[#2ECC71] text-white',
    danger: 'bg-[#EB5757] hover:bg-[#d14d4d] text-white',
    warning: 'bg-[#F2C94C] hover:bg-[#e0b93b] text-[#111827]',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-md rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-[0_18px_60px_rgba(15,23,42,0.28)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-color)] px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EB5757]/10 text-[#EB5757]">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.02em]">{title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">This action cannot be undone.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-md p-1.5 text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)]"
                aria-label="Close confirmation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 py-4">
              <p className="text-sm leading-6 text-[var(--text-primary)]">{message}</p>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[var(--border-color)] px-5 py-4">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-md border border-[var(--border-color)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-hover)]"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${variantStyles[confirmVariant]}`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
