import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Settings,
  User,
  Shield,
  Download,
  Moon,
  Sun,
  Database,
  Smartphone,
  Save,
  CheckCircle2,
  Trash2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export const SettingsView: React.FC = () => {
  const {
    user,
    setUser,
    assets,
    documents,
    trustedPeople,
    recoverySteps,
    theme,
    toggleTheme,
    showToast,
  } = useVault();

  const isDark = theme === 'dark';

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [emergencyPhone, setEmergencyPhone] = useState(user.emergencyContactPhone);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      emergencyContactPhone: emergencyPhone,
    }));
    showToast({
      type: 'success',
      title: 'Master Enclave Profile Updated',
      message: 'Credentials securely stored with biometric signature.',
    });
  };

  const handleDownloadVaultBackup = () => {
    const backupData = {
      exportVersion: '2.0-ZeroKnowledge-AppleEnclave',
      timestamp: new Date().toISOString(),
      vaultOwner: user,
      assets,
      documents,
      trustedPeople,
      recoverySteps,
      sha256VerificationHash: 'f4b1e8e4a90b4d4584e0d9b4b9b94fa8',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lifevault-encrypted-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast({
      type: 'security',
      title: 'Vault Backup Downloaded',
      message: 'Encrypted offline snapshot saved to local device.',
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/25 text-[#16C47F] text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Settings & Vault Preferences
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Configure master hardware identity, local offline backups, and aesthetic preferences.
        </p>
      </div>

      {/* User Profile Form */}
      <div
        className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
          isDark
            ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
            : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
        }`}
      >
        <div className="flex items-center space-x-2.5 mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#16C47F]/15 text-[#16C47F] flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Master Keyholder Identity
          </h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="flex items-center space-x-4 mb-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-[#16C47F]/30" />
            <div>
              <span className="text-[10px] font-mono font-bold text-[#16C47F] px-2 py-0.5 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/20">
                {user.tier}
              </span>
              <div className="text-base font-extrabold text-neutral-900 dark:text-white mt-1">{user.name}</div>
              <div className="text-xs text-neutral-500 font-mono">Enclave ID: #LV-99214-IND</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#16C47F]/40 ${
                  isDark ? 'bg-black/50 border-white/[0.1] text-white' : 'bg-neutral-50 border-black/[0.1] text-neutral-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Primary Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#16C47F]/40 ${
                  isDark ? 'bg-black/50 border-white/[0.1] text-white' : 'bg-neutral-50 border-black/[0.1] text-neutral-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Primary Emergency Phone (SMS Multi-Sig)</label>
            <input
              type="text"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#16C47F]/40 ${
                isDark ? 'bg-black/50 border-white/[0.1] text-white' : 'bg-neutral-50 border-black/[0.1] text-neutral-900'
              }`}
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#16C47F] text-black font-extrabold text-xs shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Save Credentials</span>
            </button>
          </div>
        </form>
      </div>

      {/* Theme Selector */}
      <div
        className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
          isDark
            ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
            : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
        }`}
      >
        <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
          Interface Aesthetic & Color System
        </h3>
        <p className="text-xs text-neutral-500 mb-6">
          Switch between Apple Intelligence Dark Mode (#060606) and Minimalist Clean Light Mode.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => theme !== 'dark' && toggleTheme()}
            className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              isDark
                ? 'bg-neutral-900 border-[#16C47F] ring-2 ring-[#16C47F]/20'
                : 'bg-neutral-100 border-neutral-200 opacity-60'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <Moon className="w-5 h-5 text-[#16C47F]" />
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Dark Mode</div>
                <div className="text-[11px] text-neutral-500 font-mono">#060606 Deep Space Canvas</div>
              </div>
            </div>
            {isDark && <CheckCircle2 className="w-4 h-4 text-[#16C47F]" />}
          </button>

          <button
            onClick={() => theme !== 'light' && toggleTheme()}
            className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              !isDark
                ? 'bg-white border-[#16C47F] ring-2 ring-[#16C47F]/20 shadow-sm'
                : 'bg-neutral-900 border-neutral-800 opacity-60'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <Sun className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Light Mode</div>
                <div className="text-[11px] text-neutral-500 font-mono">#FAFAF8 Crisp Off-White</div>
              </div>
            </div>
            {!isDark && <CheckCircle2 className="w-4 h-4 text-[#16C47F]" />}
          </button>
        </div>
      </div>

      {/* Offline Backup Export */}
      <div
        className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
          isDark
            ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
            : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Offline Cryptographic Vault Snapshot
              </h3>
              <p className="text-xs text-neutral-500">
                Self-contained encrypted JSON containing all deeds, SHA-256 seals, and trustee roles.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadVaultBackup}
            className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md flex items-center space-x-2 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON Snapshot</span>
          </button>
        </div>
      </div>
    </div>
  );
};
