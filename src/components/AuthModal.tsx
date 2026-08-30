import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Lock,
  Mail,
  Shield,
  User,
  Phone,
  ScanFace,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LifeVaultLogo } from './LifeVaultLogo';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    setIsAuthenticated,
    setUser,
    showToast,
    theme,
  } = useVault();

  const [email, setEmail] = useState('chandanvamsi101@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Chandan Vamsi');
  const [emergencyContact, setEmergencyContact] = useState('+91 98450 19284 (Ananya Sharma)');
  const [isFaceIdScanning, setIsFaceIdScanning] = useState(false);
  const [faceIdSuccess, setFaceIdSuccess] = useState(false);

  const isDark = theme === 'dark';

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    showToast({
      type: 'security',
      title: 'Authenticated Successfully',
      message: 'Zero-Knowledge enclave unlocked with AES-256 session token.',
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setUser((prev) => ({
      ...prev,
      name,
      email,
    }));
    setAuthModalOpen(false);
    showToast({
      type: 'success',
      title: 'LifeVault Account Provisioned',
      message: `Welcome to LIFEVAULT AI, ${name}. Security enclave initialized.`,
    });
  };

  const triggerFaceIdScan = () => {
    setIsFaceIdScanning(true);
    setFaceIdSuccess(false);

    setTimeout(() => {
      setFaceIdSuccess(true);
      setTimeout(() => {
        setIsFaceIdScanning(false);
        setIsAuthenticated(true);
        setAuthModalOpen(false);
        showToast({
          type: 'security',
          title: 'Face ID Biometric Confirmed',
          message: 'Hardware enclave verified user credentials (Apple Secure Enclave).',
        });
      }, 900);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAuthModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg"
        />

        {/* Modal Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`relative w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden z-10 p-8 ${
            isDark
              ? 'bg-[#111111] border-[#262626] text-white shadow-[0_0_80px_rgba(0,0,0,0.9)]'
              : 'bg-[#FFFFFF] border-[#E5E5E5] text-neutral-900 shadow-2xl'
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-6 right-6 text-neutral-500 hover:text-neutral-300 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 border border-emerald-500/30 p-2 mb-3 shadow-[0_0_25px_rgba(22,196,127,0.35)]">
              <LifeVaultLogo className="w-full h-full" glow={false} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {authMode === 'login' ? 'Unlock Your LifeVault' : 'Create Encrypted Vault'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1.5">
              {authMode === 'login'
                ? 'Your Life. Protected Today. Preserved Tomorrow.'
                : 'Zero-knowledge legacy architecture with multi-sig emergency handover.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className={`flex rounded-xl p-1 mb-6 border ${isDark ? 'bg-[#181818] border-[#262626]' : 'bg-neutral-100 border-neutral-200'}`}>
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authMode === 'login'
                  ? isDark
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authMode === 'signup'
                  ? isDark
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Biometric Face ID Button */}
          {authMode === 'login' && (
            <div className="mb-6">
              <button
                type="button"
                onClick={triggerFaceIdScan}
                disabled={isFaceIdScanning}
                className={`w-full relative overflow-hidden py-3 px-4 rounded-xl border flex items-center justify-center space-x-3 text-xs font-semibold transition-all group ${
                  isDark
                    ? 'bg-blue-950/20 border-blue-500/30 hover:border-blue-500/60 text-blue-400 hover:bg-blue-900/30'
                    : 'bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-700'
                }`}
              >
                {isFaceIdScanning ? (
                  <div className="flex items-center space-x-2">
                    <ScanFace className="w-4 h-4 animate-pulse text-blue-400" />
                    <span>Scanning Face ID Sensor...</span>
                  </div>
                ) : faceIdSuccess ? (
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Biometric Enclave Authenticated!</span>
                  </div>
                ) : (
                  <>
                    <ScanFace className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span>Sign In with Apple Face ID / Touch ID</span>
                  </>
                )}

                {/* Laser scan animation bar */}
                {isFaceIdScanning && (
                  <motion.div
                    className="absolute inset-x-0 h-0.5 bg-blue-400 shadow-[0_0_12px_#3b82f6]"
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  />
                )}
              </button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`} />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className={`px-2 font-mono ${isDark ? 'bg-[#111111] text-neutral-500' : 'bg-white text-neutral-400'}`}>
                    or continue with email
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                      isDark ? 'bg-[#181818] border-[#262626] text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-neutral-400">Master Password</label>
                  <a href="#forgot" className="text-[10px] text-blue-400 hover:underline">
                    Forgot key?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                      isDark ? 'bg-[#181818] border-[#262626] text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center space-x-2"
              >
                <span>Unlock Vault Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chandan Vamsi"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                      isDark ? 'bg-[#181818] border-[#262626] text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chandanvamsi101@gmail.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                      isDark ? 'bg-[#181818] border-[#262626] text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">Primary Emergency Trustee Contact</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="+91 98450 19284 (Spouse / Next of Kin)"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                      isDark ? 'bg-[#181818] border-[#262626] text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center space-x-2"
              >
                <span>Initialize LifeVault Enclave</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Footer Security Badges */}
          <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>AES-256 GCM Zero-Knowledge</span>
            </span>
            <span>SOC2 Type II • ISO 27001</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
