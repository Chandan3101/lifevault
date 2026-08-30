import React, { useState, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Shield,
  Lock,
  ArrowRight,
  Play,
  Sparkles,
  Network,
  FileText,
  Users,
  CheckCircle2,
  AlertOctagon,
  Key,
  Database,
  EyeOff,
  Activity,
  HeartHandshake,
  Flame,
  FileCheck,
  ChevronRight,
  Check,
  Zap,
  Sun,
  Moon,
  X,
  CreditCard,
  Building2,
  Fingerprint,
  RotateCcw,
  Clock,
  Send,
  ExternalLink,
  Laptop,
  LogIn,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LifeVaultLogo } from '../components/LifeVaultLogo';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setAuthModalOpen, setAuthMode, theme, toggleTheme } = useVault();
  const isDark = theme === 'dark';

  // Navigation scroll state for glassmorphic navbar
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'protect' | 'organize' | 'connect' | 'recover'>('protect');
  const [isAnnual, setIsAnnual] = useState(true);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoTab, setDemoTab] = useState<'map' | 'ocr' | 'heartbeat' | 'claim'>('map');

  // Selected node in hero preview
  const [selectedHeroNode, setSelectedHeroNode] = useState<string>('insurance');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featurePills = [
    { label: 'AES-256 Encryption', icon: Lock },
    { label: 'Zero Trust', icon: Shield },
    { label: 'AI Digital Life Map', icon: Network },
    { label: 'Family Recovery Guide', icon: HeartHandshake },
  ];

  const problemCards = [
    {
      title: 'Lost Insurance Policies',
      stat: '₹1.5 Lakh Crore Unclaimed',
      desc: 'Billions in term life and health policies go unclaimed every year because families never knew the policy number or insurer.',
      icon: Flame,
      color: 'from-amber-500/20 to-orange-500/20 text-orange-400',
    },
    {
      title: 'Hidden & Forgotten Assets',
      stat: 'Over 8.2M Dormant Accounts',
      desc: 'Mutual funds, secondary bank accounts, and crypto wallets vanish into investor protection funds without a centralized continuity map.',
      icon: Database,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    },
    {
      title: 'Scattered Property Deeds',
      stat: '74% of Estate Litigations',
      desc: 'Missing original sale deeds, encumbrance certificates, and mutation papers cause decades of high-court property disputes.',
      icon: FileText,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400',
    },
    {
      title: 'Untracked Liabilities & Loans',
      stat: 'Surprise Foreclosures',
      desc: 'Guarantor liabilities and home loans cause unexpected distress to surviving family members without clear settlement guidelines.',
      icon: AlertOctagon,
      color: 'from-red-500/20 to-rose-500/20 text-red-400',
    },
    {
      title: 'Unverified ID Certificates',
      stat: '90+ Days Transmission Delays',
      desc: 'Incomplete eKYC, mismatched PAN names, and missing death claim kits stall bank account transmission for months.',
      icon: FileCheck,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    },
    {
      title: 'Silent Cloud Subscriptions',
      stat: '₹40K+ Leaked Annually',
      desc: 'Automated recurring credit card debits continue indefinitely for years across cloud hosting, SaaS, and digital services.',
      icon: Activity,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400',
    },
  ];

  const securityLayers = [
    {
      name: 'AES-256-GCM',
      desc: 'Hardware-level Zero-Knowledge encryption. Master keys stay in your device enclave. Even our engineers cannot decrypt your payload.',
      level: 'Layer 1: Cryptographic Enclave',
    },
    {
      name: 'TLS 1.3 & Perfect Forward Secrecy',
      desc: 'Encrypted transit channels with automated ephemeral key rotation every 24 hours.',
      level: 'Layer 2: Transport Security',
    },
    {
      name: 'FIDO2 & Biometric WebAuthn',
      desc: 'Apple Face ID, Touch ID, and hardware security keys protect master access.',
      level: 'Layer 3: Authentication Gate',
    },
    {
      name: 'Granular Role-Based Access (RBAC)',
      desc: 'Selective permission matrix separating Spouse, Children, Legal Counsel, and Chartered Accountants.',
      level: 'Layer 4: Access Governance',
    },
    {
      name: 'Shamir 2-of-3 Multi-Sig',
      desc: 'Distributed key threshold prevents single-point-of-failure or unauthorized early unlocking.',
      level: 'Layer 5: Quorum Consensus',
    },
    {
      name: 'Immutable Audit Logs',
      desc: 'Cryptographically hashed event streams recording every trustee access and biometric challenge.',
      level: 'Layer 6: Forensics & Compliance',
    },
  ];

  const pricingTiers = [
    {
      name: 'Personal Starter',
      badge: 'Free Forever',
      price: '$0',
      period: 'forever',
      description: 'Essential encrypted continuity for individuals securing primary bank folios and life policies.',
      features: [
        'Up to 15 assets & documents',
        'AES-256-GCM client-side encryption',
        '1 Primary Nominee Trustee',
        'Basic Emergency Claim Kit',
        'AI Life Map visualization',
        'Standard Email Support',
      ],
      cta: 'Start Free Vault',
      popular: false,
    },
    {
      name: 'Pro Continuity',
      badge: 'Most Popular',
      price: isAnnual ? '$15' : '$19',
      period: 'per month, billed annually',
      description: 'Comprehensive digital estate protection with Gemini AI OCR indexing and Dead Man’s switch.',
      features: [
        'Unlimited assets, folios & deeds',
        'AI OCR Document Classifier (Gemini 3.7)',
        '3 Multi-Sig Emergency Trustees',
        'Autonomous Dead Man’s Heartbeat Switch',
        'Pre-populated Insurance Claim Generator',
        'Biometric FIDO2 / Face ID WebAuthn',
        'Encrypted Offline JSON Vault Snapshot',
      ],
      cta: 'Get Pro Continuity',
      popular: true,
    },
    {
      name: 'Family Enclave',
      badge: 'Multi-Generational',
      price: isAnnual ? '$39' : '$49',
      period: 'per month, billed annually',
      description: 'Full family office legacy architecture with lawyer & CA multi-sig governance and succession legal advisory.',
      features: [
        'Everything in Pro Continuity',
        'Up to 6 Family Member Accounts',
        'Dedicated Lawyer & CA Portal Access',
        'Custom Multi-Sig Quorum (e.g. 3-of-5)',
        'Probate-Bypass Succession Playbook',
        'Priority Enclave Concierge & SLAs',
        'Annual Estate Audit & Document Health Check',
      ],
      cta: 'Provision Family Enclave',
      popular: false,
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans ${
        isDark ? 'bg-[#050505] text-[#F5F5F5]' : 'bg-[#ffffff] text-[#111827]'
      } selection:bg-[#16A34A] selection:text-white`}
    >
      {/* ========================================================
          NAVBAR: Minimal Transparent / Glassmorphic on Scroll
          ======================================================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[#232323] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
              : 'bg-[#FFFFFF]/85 backdrop-blur-xl border-b border-[#E5E7EB] shadow-xs'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: LIFEVAULT Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="w-10 h-10 rounded-2xl bg-neutral-900/90 border border-emerald-500/30 flex items-center justify-center p-1 shadow-[0_0_25px_rgba(22,196,127,0.35)] group-hover:scale-105 transition-transform">
              <LifeVaultLogo className="w-full h-full" glow={false} />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight font-sans">
                  LIFEVAULT
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#16A34A]/20 text-[#22C55E] font-mono font-bold border border-[#16A34A]/30">
                  AI
                </span>
              </div>
              <span className="text-[11px] text-[#9CA3AF] dark:text-[#9CA3AF] leading-none block -mt-0.5 font-medium">
                Digital Legacy & Continuity
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wide">
            <a
              href="#features"
              className="text-[var(--text-secondary)] hover:text-[#22C55E] transition-colors"
            >
              Features
            </a>
            <a
              href="#security"
              className="text-[var(--text-secondary)] hover:text-[#22C55E] transition-colors"
            >
              Security
            </a>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-[var(--text-secondary)] hover:text-[#22C55E] transition-colors"
            >
              Dashboard
            </button>
            <a
              href="#pricing"
              className="text-[var(--text-secondary)] hover:text-[#22C55E] transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                isDark
                  ? 'bg-[#111111] border-[#2f2f2f] text-[var(--text-primary)] hover:bg-[#1a1a1a]'
                  : 'bg-[#ffffff] border-[#e9e9e7] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-[#27AE60]" />
              <span>Login</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setAuthMode('signup');
                setAuthModalOpen(true);
              }}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ========================================================
          HERO SECTION: Centered (NetMirror Reference)
          ======================================================== */}
      <section className="relative pt-36 sm:pt-44 pb-28 px-6 overflow-hidden">
        {/* Subtle glowing ambient backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#16A34A]/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]" />
          
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${
                isDark ? '#333333' : '#B0B0B0'
              } 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border text-xs font-semibold mb-8 shadow-xs ${
              isDark
                ? 'bg-[#111111] border-[#232323] text-emerald-400'
                : 'bg-white border-[#E5E7EB] text-emerald-700 shadow-xs'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span>AI-Powered Digital Legacy Platform</span>
          </motion.div>

          {/* Large Headline (72px desktop) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.08] mb-6 text-[var(--text-primary)]"
          >
            Your Life.{' '}
            <span className="text-[#16A34A] dark:text-[#22C55E] inline-block relative">
              Protected
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-[#16A34A]/40 dark:text-[#22C55E]/40"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C50 1.5 150 1.5 199 5.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            Today.
            <br className="hidden sm:inline" /> Preserved Tomorrow.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Secure your assets, documents, family access, and life continuity
            through an intelligent AI-powered digital vault.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10"
          >
            {featurePills.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div
                  key={idx}
                  className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                    isDark
                      ? 'bg-[#0B0B0B] border-[#232323] text-neutral-300 hover:border-[#16A34A]/40 hover:bg-[#111111]'
                      : 'bg-white border-[#E5E7EB] text-neutral-700 hover:border-[#16A34A]/40 hover:bg-neutral-50 shadow-xs'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#16A34A] dark:text-[#22C55E]" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Primary + Secondary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAuthMode('signup');
                setAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-[20px] bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803d] hover:to-[#16A34A] text-white font-semibold text-sm shadow-[0_0_30px_rgba(22,163,74,0.45)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDemoModalOpen(true)}
              className={`w-full sm:w-auto px-8 py-4 rounded-[20px] border font-semibold text-sm transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                isDark
                  ? 'bg-transparent border-[#232323] text-[#F5F5F5] hover:bg-[#111111] hover:border-neutral-600'
                  : 'bg-transparent border-[#E5E7EB] text-[#111827] hover:bg-white hover:border-neutral-300 shadow-xs'
              }`}
            >
              <Play className="w-4 h-4 text-[#16A34A] fill-[#16A34A]/20" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* ========================================================
              HERO INTERACTIVE DIGITAL LIFE MAP PREVIEW
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`relative rounded-3xl border p-6 sm:p-8 text-left backdrop-blur-xl transition-all ${
              isDark
                ? 'bg-[#0B0B0B]/95 border-[#232323] shadow-[0_20px_80px_rgba(0,0,0,0.8)]'
                : 'bg-white border-[#E5E7EB] shadow-2xl'
            }`}
          >
            {/* Top Mock Window Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-inherit pb-4 mb-6 gap-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-[#9CA3AF] font-mono pl-2">
                  lifevault-mesh://enclave.live/continuity-graph
                </span>
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#16A34A]/10 text-[#22C55E] border border-[#16A34A]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                  <span>AES-256 ZERO-KNOWLEDGE ACTIVE</span>
                </span>
                <span className="text-[#9CA3AF] hidden md:inline">
                  Node Quorum: 2-of-3
                </span>
              </div>
            </div>

            {/* Interactive Grid of Graph Entities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5 mb-6">
              {[
                {
                  id: 'sbi',
                  icon: Database,
                  name: 'State Bank of India',
                  value: '₹45.00 L',
                  category: 'Banking',
                  beneficiary: 'Ananya Sharma (100%)',
                  color: 'emerald',
                },
                {
                  id: 'insurance',
                  icon: Shield,
                  name: 'HDFC Term Life',
                  value: '₹2.50 Cr',
                  category: 'Life Protection',
                  beneficiary: 'Ananya Sharma (100%)',
                  color: 'emerald',
                },
                {
                  id: 'villa',
                  icon: Building2,
                  name: 'Hyderabad Villa Deed',
                  value: '₹1.80 Cr',
                  category: 'Real Estate',
                  beneficiary: 'Joint Family Trust',
                  color: 'purple',
                },
                {
                  id: 'mf',
                  icon: Sparkles,
                  name: 'Vanguard & Zerodha',
                  value: '₹68.50 L',
                  category: 'Equity Folio',
                  beneficiary: 'Aarav Sharma (Child)',
                  color: 'blue',
                },
                {
                  id: 'trustees',
                  icon: Users,
                  name: 'Multi-Sig Quorum',
                  value: '3 Co-Signers',
                  category: 'Governance',
                  beneficiary: 'Shamir 2-of-3',
                  color: 'amber',
                },
              ].map((node) => {
                const Icon = node.icon;
                const isSelected = selectedHeroNode === node.id;
                return (
                  <motion.div
                    key={node.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedHeroNode(node.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-[#111111] border-[#16A34A] ring-2 ring-[#16A34A]/30 shadow-[0_0_20px_rgba(22,163,74,0.2)]'
                          : 'bg-white border-[#16A34A] ring-2 ring-[#16A34A]/30 shadow-md'
                        : isDark
                        ? 'bg-[#0B0B0B] border-[#232323] hover:border-neutral-700'
                        : 'bg-neutral-50 border-[#E5E7EB] hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#16A34A] text-white'
                            : 'bg-[#16A34A]/10 text-[#16A34A] dark:text-[#22C55E]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-[#9CA3AF]">
                        {node.category}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate text-neutral-900 dark:text-[#F5F5F5]">
                      {node.name}
                    </div>
                    <div className="text-xs font-mono font-semibold text-[#16A34A] dark:text-[#22C55E] mt-0.5">
                      {node.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Node Detailed Live Inspection Bar */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
                isDark
                  ? 'bg-[#111111] border-[#232323]'
                  : 'bg-[#FCFCFC] border-[#E5E7EB]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#16A34A]/15 text-[#22C55E] flex items-center justify-center shrink-0">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-[#F5F5F5] flex items-center space-x-2">
                    <span>Cryptographic Entity Inspector</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16A34A]/20 text-[#22C55E]">
                      Auto-Linked by Gemini OCR
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF]">
                    Document SHA-256 fingerprint verified • Succession phase 2 priority claim armed.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView('lifemap')}
                  className="px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs font-semibold shadow-xs flex items-center space-x-2 transition-all"
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Open Full Life Map</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          PROBLEM SECTION: Why 90% Wealth Vanishes
          ======================================================== */}
      <section
        id="problems"
        className={`py-24 px-6 border-t ${
          isDark ? 'border-[#232323] bg-[#0B0B0B]' : 'border-[#E5E7EB] bg-white'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#EF4444] font-mono">
              The Digital Estate Crisis
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-neutral-900 dark:text-[#F5F5F5]">
              Why 90% of Family Wealth Vanishes During Emergencies
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-2xl mx-auto mt-3">
              Without a secure, connected digital continuity map, your loved ones face months of bureaucratic delays, lost accounts, and bitter disputes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#111111] border-[#232323] hover:border-neutral-600 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                      : 'bg-[#FCFCFC] border-[#E5E7EB] hover:border-neutral-300 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#EF4444] mb-1">
                    {card.stat}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-[#F5F5F5]">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4 PILLARS OF LIFE CONTINUITY
          ======================================================== */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] dark:text-[#22C55E] font-mono">
              The 4 Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-neutral-900 dark:text-[#F5F5F5]">
              Everything You Need for Complete Life Continuity
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-2xl mx-auto mt-3">
              From zero-knowledge encryption to autonomous emergency handover, LIFEVAULT AI covers every lifecycle stage.
            </p>
          </div>

          {/* Pillars Navigation Buttons */}
          <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
            <div
              className={`inline-flex rounded-2xl p-1.5 border ${
                isDark ? 'bg-[#0B0B0B] border-[#232323]' : 'bg-white border-[#E5E7EB] shadow-xs'
              }`}
            >
              {[
                { id: 'protect', label: '1. Protect', icon: Shield },
                { id: 'organize', label: '2. Organize', icon: Network },
                { id: 'connect', label: '3. Connect', icon: Users },
                { id: 'recover', label: '4. Recover', icon: HeartHandshake },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white shadow-md shadow-[#16A34A]/25'
                        : 'text-[#9CA3AF] hover:text-white dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pillar Content Card */}
          <div
            className={`p-8 sm:p-12 rounded-3xl border ${
              isDark ? 'bg-[#111111] border-[#232323]' : 'bg-white border-[#E5E7EB] shadow-xl'
            }`}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'protect' && (
                <motion.div
                  key="protect"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-lg bg-[#16A34A]/10 text-[#22C55E] text-xs font-mono font-semibold mb-3">
                      ZERO-KNOWLEDGE ENCLAVE
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-neutral-900 dark:text-[#F5F5F5]">
                      Client-Side AES-256-GCM Military Encryption
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                      Your master encryption keys are derived directly on your client device using hardware-backed Secure Enclaves (Apple Touch/Face ID or Android KeyStore). No plaintext data ever leaves your device unencrypted.
                    </p>
                    <ul className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                        <span>Tamper-proof SHA-256 document hashing and timestamping</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                        <span>FIDO2 WebAuthn & Face ID biometric authentication gates</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                        <span>Automatic document shredding with zero-trace cryptographic purging</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`p-6 rounded-2xl border ${
                      isDark ? 'bg-[#0B0B0B] border-[#232323]' : 'bg-[#FCFCFC] border-[#E5E7EB]'
                    }`}
                  >
                    <div className="text-xs font-mono text-[#9CA3AF] mb-3">
                      // Zero-Knowledge Cryptographic Flow
                    </div>
                    <div className="space-y-2.5 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-black/40 text-[#22C55E] border border-emerald-900/30">
                        1. Client derives 256-bit AES Master Key
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 text-blue-400 border border-blue-900/30">
                        2. Payload sealed with GCM 96-bit Nonce Vector
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 text-purple-400 border border-purple-900/30">
                        3. Shamir Shards distributed to 3 Multi-Sig Trustees
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 text-[#9CA3AF] border border-neutral-800">
                        4. Server stores only encrypted ciphertext blob
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'organize' && (
                <motion.div
                  key="organize"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-mono font-semibold mb-3">
                      AI OCR & ENTITY LINKING
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-neutral-900 dark:text-[#F5F5F5]">
                      Documents Auto-Connect into One Digital Life Map
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                      Upload an insurance policy, property sale deed, or mutual fund statement. Gemini 3.7 inspects the document, extracts policy numbers, nominee allocations, and valuations, and creates live graph relationships.
                    </p>
                    <button
                      onClick={() => setCurrentView('lifemap')}
                      className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer shadow-md"
                    >
                      <span>View Live Life Map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div
                    className={`p-6 rounded-2xl border ${
                      isDark ? 'bg-[#0B0B0B] border-[#232323]' : 'bg-[#FCFCFC] border-[#E5E7EB]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-neutral-900 dark:text-[#F5F5F5]">
                        Extracted Entity Relationships
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16A34A]/20 text-[#22C55E]">
                        99.4% OCR Confidence
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-[#232323] space-y-2.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Document:</span>
                        <span className="font-medium text-white">HDFC_Life_Policy_99214.pdf</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Policy Cover:</span>
                        <span className="font-mono text-[#22C55E]">₹2,50,00,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Nominee Identified:</span>
                        <span className="text-blue-400">Ananya Sharma (Spouse - 100%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Auto-Linked Asset:</span>
                        <span className="text-purple-400">Life Protection Ledger #4</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'connect' && (
                <motion.div
                  key="connect"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-mono font-semibold mb-3">
                      MULTI-SIG PERMISSION MATRIX
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-neutral-900 dark:text-[#F5F5F5]">
                      Granular Governance for Family & Legal Counsel
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                      Assign distinct access tiers to your Spouse, Children, Legal Counsel, and Chartered Accountant. Control exactly who sees bank folios, property titles, or medical advance directives.
                    </p>
                    <button
                      onClick={() => setCurrentView('trusted-people')}
                      className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer shadow-md"
                    >
                      <span>Manage Trusted People</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-[#16A34A]/30 bg-[#16A34A]/10 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-[#F5F5F5]">
                          Ananya Sharma (Spouse)
                        </div>
                        <div className="text-[11px] text-[#9CA3AF]">
                          Level 1 Admin • Full Access to all Bank & Estate Assets
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#16A34A]/20 text-[#22C55E] text-[10px] font-mono">
                        Verified Multi-Sig
                      </span>
                    </div>
                    <div className="p-4 rounded-xl border border-[#232323] bg-[#0B0B0B] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-[#F5F5F5]">
                          Adv. Vikram Seth (Legal Counsel)
                        </div>
                        <div className="text-[11px] text-[#9CA3AF]">
                          Legal Trustee • Restricted to Will & Real Estate Deeds
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-mono">
                        Restricted
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'recover' && (
                <motion.div
                  key="recover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-lg bg-[#16A34A]/10 text-[#22C55E] text-xs font-mono font-semibold mb-3">
                      STEP-BY-STEP SUCCESSION
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-neutral-900 dark:text-[#F5F5F5]">
                      Automated Claim Letters & Succession Playbook
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                      During a crisis, families don't know where to start. LIFEVAULT AI generates pre-populated insurance death claim forms, bank transmission letters, and subscription cancellation kits with step-by-step guidance.
                    </p>
                    <button
                      onClick={() => setCurrentView('recovery-guide')}
                      className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer shadow-md"
                    >
                      <span>Open Recovery Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-[#16A34A]/30 flex items-center space-x-3 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                      <span>Phase 1: Immediate TPA Health Cashless & Medical Directive</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-center space-x-3 text-blue-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Phase 2: HDFC ₹2.5 Cr Term Insurance Priority Claim Letter</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0B0B0B] border border-[#232323] flex items-center space-x-3 text-[#9CA3AF]">
                      <div className="w-4 h-4 rounded-full border border-neutral-600 shrink-0" />
                      <span>Phase 3: SBI Wealth Account Transmission & Mutual Funds Transfer</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECURITY ARCHITECTURE: 6 Layers of Zero-Knowledge Trust
          ======================================================== */}
      <section
        id="security"
        className={`py-24 px-6 border-t ${
          isDark ? 'border-[#232323] bg-[#0B0B0B]' : 'border-[#E5E7EB] bg-white'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] dark:text-[#22C55E] font-mono">
              Enterprise Cryptographic Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-neutral-900 dark:text-[#F5F5F5]">
              Six Defense Layers of Zero-Knowledge Trust
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-2xl mx-auto mt-3">
              Engineered with the cryptographic rigor demanded by Swiss private banking and defense-grade security protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityLayers.map((layer, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#111111] border-[#232323] hover:border-[#16A34A]/50'
                    : 'bg-[#FCFCFC] border-[#E5E7EB] hover:border-[#16A34A]/50 shadow-xs'
                }`}
              >
                <div className="text-[10px] font-mono text-[#16A34A] dark:text-[#22C55E] font-semibold mb-2">
                  {layer.level}
                </div>
                <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-[#F5F5F5]">
                  {layer.name}
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {layer.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          TRANSPARENT PRICING TIERS
          ======================================================== */}
      <section
        id="pricing"
        className={`py-24 px-6 border-t ${
          isDark ? 'border-[#232323] bg-[#050505]' : 'border-[#E5E7EB] bg-[#F7F7F5]'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] dark:text-[#22C55E] font-mono">
              Simple, Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-neutral-900 dark:text-[#F5F5F5]">
              Invest in Total Generational Peace of Mind
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-xl mx-auto mt-3">
              Zero hidden fees. Zero cloud lock-in. Full offline backup export anytime.
            </p>

            {/* Annual / Monthly Toggle */}
            <div className="mt-8 inline-flex items-center space-x-3 p-1.5 rounded-full border border-inherit bg-[#111111]/40">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  !isAnnual
                    ? 'bg-[#16A34A] text-white shadow-xs'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isAnnual
                    ? 'bg-[#16A34A] text-white shadow-xs'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-900/60 text-emerald-300">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-3xl border flex flex-col justify-between relative transition-all ${
                  tier.popular
                    ? isDark
                      ? 'bg-[#0B0B0B] border-[#16A34A] ring-2 ring-[#16A34A]/30 shadow-[0_0_40px_rgba(22,163,74,0.2)]'
                      : 'bg-white border-[#16A34A] ring-2 ring-[#16A34A]/30 shadow-xl'
                    : isDark
                    ? 'bg-[#111111] border-[#232323]'
                    : 'bg-white border-[#E5E7EB] shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-[#F5F5F5]">
                      {tier.name}
                    </h3>
                    {!tier.popular && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-[#9CA3AF]">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-4xl font-extrabold font-mono text-neutral-900 dark:text-[#F5F5F5]">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">/{tier.period}</span>
                  </div>

                  <p className="text-xs text-[#9CA3AF] mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start space-x-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                      >
                        <Check className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthModalOpen(true);
                  }}
                  className={`w-full py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803d] hover:to-[#16A34A] text-white shadow-[0_0_20px_rgba(22,163,74,0.35)]'
                      : isDark
                      ? 'bg-[#181818] hover:bg-[#222222] text-white border border-[#2A2A2A]'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM HERO CALL TO ACTION
          ======================================================== */}
      <section className="py-24 px-6 border-t border-inherit text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#16A34A] to-[#22C55E] text-white flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(22,163,74,0.4)]">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-[#F5F5F5]">
            Protect your life's work today.
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mb-8 max-w-xl mx-auto leading-relaxed">
            Takes only 3 minutes to securely seal your bank folios, property deeds, and family directives with Zero-Knowledge encryption.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setAuthMode('signup');
              setAuthModalOpen(true);
            }}
            className="px-9 py-4 rounded-[20px] bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803d] hover:to-[#16A34A] text-white font-semibold text-sm shadow-[0_0_35px_rgba(22,163,74,0.45)] transition-all cursor-pointer"
          >
            Create Your Free Encrypted Vault
          </motion.button>
        </div>
      </section>

      {/* ========================================================
          FOOTER (Notion / Apple Style)
          ======================================================== */}
      <footer
        className={`py-12 px-6 border-t ${
          isDark
            ? 'border-[#232323] bg-[#050505] text-[#9CA3AF]'
            : 'border-[#E5E7EB] bg-white text-[#6B7280]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-xl bg-neutral-900 border border-emerald-500/30 flex items-center justify-center p-0.5 shadow-sm">
              <LifeVaultLogo className="w-full h-full" glow={false} />
            </div>
            <span className="font-bold text-neutral-900 dark:text-[#F5F5F5]">
              LIFEVAULT AI
            </span>
            <span>• © 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px]">
            <span className="flex items-center space-x-1.5 text-[#22C55E]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>All Enclave Systems Operational 99.99%</span>
            </span>
            <span>SOC2 Type II Certified</span>
            <span>AES-256-GCM Enclave</span>
          </div>
        </div>
      </footer>

      {/* ========================================================
          INTERACTIVE DEMO WALKTHROUGH MODAL
          ======================================================== */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setDemoModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-3xl rounded-3xl border p-6 z-10 shadow-2xl overflow-hidden ${
                isDark ? 'bg-[#0B0B0B] border-[#232323] text-white' : 'bg-white border-[#E5E7EB] text-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-inherit mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#16A34A]/20 text-[#22C55E] flex items-center justify-center">
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">LIFEVAULT AI Interactive Sandbox</h3>
                    <p className="text-xs text-[#9CA3AF]">Live test of the 4 core engine modules</p>
                  </div>
                </div>

                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Demo Module Tabs */}
              <div className="flex space-x-2 mb-6 overflow-x-auto pb-1">
                {[
                  { id: 'map', label: '1. Life Map Node Mesh' },
                  { id: 'ocr', label: '2. Gemini OCR Scan' },
                  { id: 'heartbeat', label: '3. Dead Man\'s Switch' },
                  { id: 'claim', label: '4. Claim Form Dispatch' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDemoTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      demoTab === t.id
                        ? 'bg-[#16A34A] text-white'
                        : isDark
                        ? 'bg-[#141414] text-[#9CA3AF] hover:text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Demo Tab Body */}
              <div className="min-h-[260px] p-6 rounded-2xl bg-black/40 border border-[#232323]">
                {demoTab === 'map' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400">GRAPH SIMULATION // NODE: HDFC_LIFE_99</span>
                      <span className="text-[10px] font-mono text-[#9CA3AF]">STATUS: 100% SYNCHRONIZED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-[#111111] border border-neutral-800">
                        <div className="text-[#9CA3AF]">Policy Cover:</div>
                        <div className="text-lg font-bold text-white mt-1">₹2,50,00,000</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#111111] border border-neutral-800">
                        <div className="text-[#9CA3AF]">Primary Nominee:</div>
                        <div className="text-sm font-bold text-emerald-400 mt-1">Ananya Sharma (Spouse)</div>
                      </div>
                    </div>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      This node automatically streams updates to the spouse's mobile enclave upon verified multi-sig heartbeat triggers.
                    </p>
                  </div>
                )}

                {demoTab === 'ocr' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-400 font-mono">
                      <Sparkles className="w-4 h-4" />
                      <span>Gemini 3.7 Flash OCR Auto-Classification Complete</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#111111] font-mono space-y-1.5 text-neutral-300">
                      <div>File: Aadhaar_eKYC_Verified.pdf</div>
                      <div>Identified Issuer: Unique Identification Authority of India (UIDAI)</div>
                      <div>Document Hash: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08</div>
                    </div>
                  </div>
                )}

                {demoTab === 'heartbeat' && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Autonomous Heartbeat Monitor</span>
                      <span className="text-emerald-400 font-mono">23 Days Remaining</span>
                    </div>
                    <p className="text-[#9CA3AF]">
                      If the vault owner is unresponsive after the grace period, LIFEVAULT AI dispatches Shamir key shards to 3 designated trustees to begin consensus.
                    </p>
                    <button
                      onClick={() => {
                        alert('Heartbeat check-in registered! Timer reset to 30 days.');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#16A34A] text-white font-semibold flex items-center space-x-2"
                    >
                      <Activity className="w-4 h-4" />
                      <span>Simulate "I'm Safe" Check-In</span>
                    </button>
                  </div>
                )}

                {demoTab === 'claim' && (
                  <div className="space-y-3 text-xs">
                    <div className="font-semibold text-white">Formal Bank & Insurance Claim Dispatch</div>
                    <p className="text-[#9CA3AF]">
                      Instantly generates formal legal transmission notices pre-filled with PAN, nominee KYC, and policy schedule details to bypass standard 90-day probate bottlenecks.
                    </p>
                    <button
                      onClick={() => {
                        setDemoModalOpen(false);
                        setCurrentView('recovery-guide');
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold"
                    >
                      View Generated Claim Letter in Playbook →
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-inherit flex items-center justify-between">
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-700 text-xs text-[#9CA3AF] hover:text-white"
                >
                  Close Preview
                </button>

                <button
                  onClick={() => {
                    setDemoModalOpen(false);
                    setCurrentView('dashboard');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs font-semibold shadow-md flex items-center space-x-2"
                >
                  <span>Launch Live Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
