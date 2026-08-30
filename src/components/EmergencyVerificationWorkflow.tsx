import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  FileCheck,
  AlertTriangle,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Radio,
  Sparkles,
  Camera,
  Smartphone,
  FileText,
  Building2,
  Landmark,
  Home,
  TrendingUp,
  CreditCard,
  HeartHandshake,
  Heart,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Download,
  ExternalLink,
  PhoneCall,
  Mail,
  Copy,
  Check,
  Fingerprint,
  RefreshCw,
  Eye,
  EyeOff,
  Activity,
  AlertOctagon,
  FileSearch,
  Scale,
  Award,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ExecutorProfile,
  EmergencyEventType,
  TransferProcessTracker,
  RecoveryTimelineTask,
  ProgressiveAccessStage,
} from '../types';

export const EmergencyVerificationWorkflow: React.FC = () => {
  const {
    theme,
    user,
    executors,
    activeExecutor,
    setActiveExecutor,
    pipelineStep,
    setPipelineStep,
    identityState,
    setIdentityState,
    relationshipState,
    setRelationshipState,
    emergencyEventState,
    setEmergencyEventState,
    riskState,
    setRiskState,
    progressiveUnlockedStage,
    setProgressiveUnlockedStage,
    transferTrackers,
    updateTransferTracker,
    recoveryTimelineTasks,
    toggleRecoveryTimelineTask,
    auditLogs,
    addAuditLog,
    showToast,
    emergencyActive,
    triggerEmergency,
    cancelEmergency,
  } = useVault();

  const isDark = theme === 'dark';

  // Navigation tab for the workflow view
  const [activeTab, setActiveTab] = useState<
    'verification_pipeline' | 'ai_transfer_assistant' | 'recovery_timeline' | 'audit_log' | 'owner_sentinel'
  >('verification_pipeline');

  // Interactive state helpers
  const [isSimulatingOCR, setIsSimulatingOCR] = useState<boolean>(false);
  const [isSimulatingCRS, setIsSimulatingCRS] = useState<boolean>(false);
  const [isScanningSelfie, setIsScanningSelfie] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>('884920');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedTrackerId, setSelectedTrackerId] = useState<string>('tr-1');
  const [safeCheckedIn, setSafeCheckedIn] = useState<boolean>(false);
  const [activeDayFilter, setActiveDayFilter] = useState<number>(1);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);
  const [simulatedRiskOverride, setSimulatedRiskOverride] = useState<'low' | 'medium' | 'high'>('low');

  const selectedTracker = transferTrackers.find((t) => t.id === selectedTrackerId) || transferTrackers[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: `${label} copied.`,
    });
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleHeartbeat = () => {
    setSafeCheckedIn(true);
    if (emergencyActive) {
      cancelEmergency();
    }
    showToast({
      type: 'success',
      title: 'Heartbeat Verified',
      message: 'Dead-man switch countdown reset to 48 hours.',
    });
    setTimeout(() => setSafeCheckedIn(false), 4000);
  };

  // Simulation: Selfie scanning
  const triggerSelfieScan = () => {
    setIsScanningSelfie(true);
    setTimeout(() => {
      setIsScanningSelfie(false);
      setIdentityState((prev) => ({
        ...prev,
        selfieVerified: true,
        selfieLivenessScore: 99.7,
      }));
      showToast({
        type: 'success',
        title: 'Biometric Liveness Confirmed',
        message: '3D Facial depth & anti-spoofing check passed (99.7% score).',
      });
    }, 2000);
  };

  // Simulation: Government CRS validation
  const triggerGovApiValidation = () => {
    setIsSimulatingCRS(true);
    setTimeout(() => {
      setIsSimulatingCRS(false);
      setEmergencyEventState((prev) => ({
        ...prev,
        deathDetails: prev.deathDetails
          ? {
              ...prev.deathDetails,
              crsGovApiValidated: true,
              nameMatched: true,
              dobMatched: true,
              qrHashValid: true,
            }
          : undefined,
      }));
      showToast({
        type: 'security',
        title: 'Government CRS Registry Verified',
        message: 'Official Death Certificate verified with National Registry & NDMC QR seal.',
      });
      addAuditLog({
        event: 'Govt CRS Registry API Validation Passed (DL-NDMC-2026-884920)',
        severity: 'security',
        ipAddress: '103.212.45.18',
        location: 'Hyderabad, India',
        device: 'macOS Safari / WebKit',
        status: 'Authorized',
        requesterName: activeExecutor.name,
        verificationMethod: 'CRS India National Registry API',
        verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      });
    }, 2200);
  };

  // Advance step in pipeline
  const advanceStep = (targetStep: number) => {
    setPipelineStep(targetStep);
    if (targetStep === 5) {
      setProgressiveUnlockedStage('stage2_verified_family');
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Set simulated risk score
  const handleRiskChange = (level: 'low' | 'medium' | 'high') => {
    setSimulatedRiskOverride(level);
    if (level === 'low') {
      setRiskState({
        riskScore: 12,
        riskLevel: 'low',
        deviceStatus: 'trusted',
        deviceFingerprint: 'FP-MACOS-SAFARI-892A',
        ipAddress: '103.212.45.18',
        ipLocation: 'Hyderabad, Telangana, IN',
        isp: 'Airtel Broadband Fiber',
        vpnOrProxyDetected: false,
        failedAttemptsCount: 0,
        documentMatchPercentage: 100,
        behavioralAnomalyScore: 4,
        actionRequired: 'None — Safe for Progressive Access',
        evaluatedAt: 'Just now',
      });
    } else if (level === 'medium') {
      setRiskState({
        riskScore: 48,
        riskLevel: 'medium',
        deviceStatus: 'new_device',
        deviceFingerprint: 'FP-CHROME-WIN11-4091',
        ipAddress: '49.36.128.90',
        ipLocation: 'Bengaluru, Karnataka, IN',
        isp: 'ACT Fibernet',
        vpnOrProxyDetected: false,
        failedAttemptsCount: 1,
        documentMatchPercentage: 94,
        behavioralAnomalyScore: 32,
        actionRequired: 'Step-up Aadhaar Mobile OTP Required',
        evaluatedAt: 'Just now',
      });
    } else {
      setRiskState({
        riskScore: 84,
        riskLevel: 'high',
        deviceStatus: 'suspicious',
        deviceFingerprint: 'FP-TOR-PROXY-991A',
        ipAddress: '185.220.101.5',
        ipLocation: 'Frankfurt, Germany (Tor Node)',
        isp: 'Unknown Hosting Proxy',
        vpnOrProxyDetected: true,
        failedAttemptsCount: 3,
        documentMatchPercentage: 78,
        behavioralAnomalyScore: 82,
        actionRequired: 'Manual Approval from Backup Executor (Adv. Vikram Seth) Required',
        evaluatedAt: 'Just now',
      });
    }
  };

  const steps = [
    { number: 1, title: 'Identity Verification', sub: 'Aadhaar / Passport & Selfie' },
    { number: 2, title: 'Relationship Proof', sub: 'Marriage / Birth / Legal POA' },
    { number: 3, title: 'Emergency Event Proof', sub: 'Death / Hospital / FIR CRS' },
    { number: 4, title: 'Sentinel AI Risk Analysis', sub: 'Device, Geolocation & Anomaly' },
    { number: 5, title: 'Progressive Vault Access', sub: 'Tiered 3-Stage Legal Release' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Top Banner: Bank-Grade Emergency Verification & Legal Continuity */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span>Bank-Grade Emergency Protocol & Digital Continuity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Emergency Verification & Succession Workflow
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Strict non-automated transmission protocol: Multi-layer identity and event verification, Sentinel AI risk gating, and guided official legal execution.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleHeartbeat}
            className="px-4 py-2.5 rounded-full bg-[#16C47F] hover:bg-[#13B172] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(22,196,127,0.35)] transition-all flex items-center space-x-2 cursor-pointer"
          >
            {safeCheckedIn ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4 fill-black" />}
            <span>{safeCheckedIn ? 'Heartbeat Acknowledged!' : "I'm Safe (Reset Dead-Man Timer)"}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('owner_sentinel')}
            className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'owner_sentinel'
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : isDark
                ? 'bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:bg-white/[0.08]'
                : 'bg-black/[0.04] border-black/[0.08] text-neutral-700 hover:bg-black/[0.08]'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Sentinel Radar</span>
          </motion.button>
        </div>
      </div>

      {/* Main Workflow Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-b border-black/[0.08] dark:border-white/[0.08]">
        {[
          { id: 'verification_pipeline', label: '1. Multi-Layer Verification Pipeline', icon: ShieldCheck },
          { id: 'ai_transfer_assistant', label: '2. AI Transfer Assistant & Claims', icon: Sparkles },
          { id: 'recovery_timeline', label: '3. Family Recovery Timeline (Day 1-3)', icon: Clock },
          { id: 'audit_log', label: '4. Forensic Audit & Security Log', icon: Scale },
          { id: 'owner_sentinel', label: '5. Owner Sentinel & Dead-Man Switch', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : isDark
                  ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  : 'text-neutral-600 hover:text-black hover:bg-black/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 5-STEP MULTI-LAYER VERIFICATION PIPELINE */}
      {activeTab === 'verification_pipeline' && (
        <div className="space-y-8">
          {/* Digital Executor Hierarchy Selector */}
          <div
            className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
              isDark
                ? 'bg-[#0E0E0E]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold font-mono text-blue-400 mb-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>PRE-DESIGNATED SUCCESSION HIERARCHY</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Designated Digital Executor & Multi-Sig Quorum
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Only the Primary Executor can initiate emergency succession. Backup Executor can request after 48-hr unanswered grace period.
                </p>
              </div>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#16C47F] text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>2-of-3 Shamir Consensus Enforced</span>
              </div>
            </div>

            {/* Executor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {executors.map((exec) => {
                const isSelected = activeExecutor.id === exec.id;
                const isPrimary = exec.executorType === 'primary_executor';
                const isBackup = exec.executorType === 'backup_executor';

                return (
                  <motion.div
                    key={exec.id}
                    whileHover={{ y: -3 }}
                    onClick={() => {
                      setActiveExecutor(exec);
                      showToast({
                        type: 'info',
                        title: `Active Requester: ${exec.name}`,
                        message: `Switched perspective to ${exec.role}.`,
                      });
                    }}
                    className={`p-4 rounded-[22px] border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.25)] ring-1 ring-blue-500'
                        : isDark
                        ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                        : 'bg-black/[0.03] border-black/[0.06] hover:bg-black/[0.06]'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isPrimary
                            ? 'bg-emerald-500/20 text-[#16C47F] border border-emerald-500/30'
                            : isBackup
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-neutral-500/20 text-neutral-400'
                        }`}
                      >
                        {isPrimary ? 'PRIMARY EXECUTOR' : isBackup ? 'BACKUP EXECUTOR' : 'READ-ONLY TRUSTEE'}
                      </span>
                      {exec.isShamirHolder && (
                        <span className="text-[10px] text-blue-400 font-mono font-bold" title="Shamir Cryptographic Shard Holder">
                          Shard #{exec.shardIndex}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src={exec.avatar}
                        alt={exec.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">{exec.name}</h4>
                        <p className="text-[11px] text-neutral-400 truncate">{exec.relationship}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] text-[10px] text-neutral-500 flex justify-between">
                      <span>{exec.idDocType}: {exec.idDocNumberMasked}</span>
                      <span className="text-emerald-400 font-bold">Verified</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 5-Step Animated Verification Timeline Indicator */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {steps.map((step) => {
              const isCurrent = pipelineStep === step.number;
              const isPassed = pipelineStep > step.number;

              return (
                <button
                  key={step.number}
                  onClick={() => setPipelineStep(step.number)}
                  className={`p-4 rounded-[22px] border text-left transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                      : isPassed
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : isDark
                      ? 'bg-white/[0.02] border-white/[0.06] opacity-60 hover:opacity-100'
                      : 'bg-black/[0.02] border-black/[0.06] opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? 'bg-blue-500 text-white'
                          : isPassed
                          ? 'bg-emerald-500 text-black'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      Step 0{step.number}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-neutral-500" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">{step.title}</h4>
                  <p className="text-[10px] text-neutral-500 truncate mt-0.5">{step.sub}</p>
                </button>
              );
            })}
          </div>

          {/* STEP 1: IDENTITY VERIFICATION */}
          {pipelineStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
                isDark
                  ? 'bg-[#101010]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                  : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">STEP 1 OF 5</span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      Executor Government Identity & Live Liveness Check
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Applicant: <span className="text-neutral-300 font-semibold">{activeExecutor.name}</span> ({activeExecutor.relationship})
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#16C47F] text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DigiLocker & UIDAI Gateway Connected</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. ID Upload */}
                <div
                  className={`p-5 rounded-[22px] border ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-300 mb-3">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>1. Government Photo ID</span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-blue-500/20 mb-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">ID Document:</span>
                      <span className="text-white font-mono font-bold">Aadhaar (UIDAI Masked)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">ID Number:</span>
                      <span className="text-[#16C47F] font-mono font-bold">{identityState.idNumber}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">OCR Hash:</span>
                      <span className="text-neutral-400 font-mono text-[10px]">sha256: 89ab...4412</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-2 text-xs text-[#16C47F]">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Aadhaar e-KYC Attested via UIDAI</span>
                  </div>
                </div>

                {/* 2. Live Selfie Scan */}
                <div
                  className={`p-5 rounded-[22px] border ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-300 mb-3">
                    <Camera className="w-4 h-4 text-purple-400" />
                    <span>2. 3D Facial Liveness Verification</span>
                  </div>

                  <div className="aspect-video rounded-xl bg-black/50 border border-purple-500/20 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-4">
                    {isScanningSelfie ? (
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto" />
                        <span className="text-xs text-purple-300 font-mono animate-pulse">
                          Scanning 3D Depth Map & Eye Blink...
                        </span>
                      </div>
                    ) : identityState.selfieVerified ? (
                      <div className="text-center space-y-1">
                        <img
                          src={activeExecutor.avatar}
                          alt="Selfie"
                          className="w-16 h-16 rounded-full object-cover mx-auto ring-4 ring-emerald-500/40"
                        />
                        <span className="text-xs font-bold text-[#16C47F] block">
                          Liveness Verified: {identityState.selfieLivenessScore}% Match
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                        <span className="text-xs text-neutral-400">Position face within camera frame</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={triggerSelfieScan}
                    disabled={isScanningSelfie}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanningSelfie ? 'animate-spin' : ''}`} />
                    <span>{identityState.selfieVerified ? 'Re-run Biometric Scan' : 'Start Live Selfie Scan'}</span>
                  </button>
                </div>

                {/* 3. Mobile OTP */}
                <div
                  className={`p-5 rounded-[22px] border ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-300 mb-3">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>3. Registered Mobile OTP</span>
                  </div>

                  <p className="text-xs text-neutral-400 mb-3">
                    One-Time Password dispatched to registered number <span className="font-mono text-white">{activeExecutor.phone}</span>.
                  </p>

                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-center font-mono text-lg tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-500">
                      <span>Valid for: 04:52</span>
                      <button
                        onClick={() => {
                          setOtpInput('884920');
                          showToast({ type: 'info', title: 'OTP Resent', message: 'Demo OTP: 884920' });
                        }}
                        className="text-blue-400 hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-2 text-xs text-[#16C47F]">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Identity Status: <strong className="ml-1">VERIFIED (Step 1 Complete)</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Advance CTA */}
              <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex justify-end">
                <button
                  onClick={() => advanceStep(2)}
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Proceed to Step 2: Relationship Proof</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: RELATIONSHIP VERIFICATION */}
          {pipelineStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
                isDark
                  ? 'bg-[#101010]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                  : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">STEP 2 OF 5</span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      Relationship & Succession Authorization Proof
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Applicant must substantiate legally attested relationship with vault owner <span className="text-white font-semibold">Chandan Vamsi</span>.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#16C47F] text-xs font-bold">
                  <Award className="w-4 h-4" />
                  <span>OCR Confidence: {relationshipState.confidenceScore}%</span>
                </div>
              </div>

              {/* Relationship Proof Document Selector & Match Engine */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Proof Type Selector */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-neutral-400">Select Mandatory Relationship Document</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'marriage_certificate', label: 'Spouse: Marriage Certificate', desc: 'Govt Registrar attested' },
                      { id: 'birth_certificate', label: 'Child: Birth Certificate', desc: 'Municipal Corp seal' },
                      { id: 'power_of_attorney', label: 'Lawyer: Legal POA Letter', desc: 'High Court Registered' },
                      { id: 'court_order', label: 'Guardian: Court Order', desc: 'Family Court decree' },
                    ].map((doc) => {
                      const isSelected = relationshipState.proofType === doc.id;
                      return (
                        <button
                          key={doc.id}
                          onClick={() => {
                            setRelationshipState((prev) => ({
                              ...prev,
                              proofType: doc.id as any,
                            }));
                            showToast({
                              type: 'info',
                              title: 'Proof Type Changed',
                              message: `Switched to ${doc.label}.`,
                            });
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                              : isDark
                              ? 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white'
                              : 'bg-black/[0.02] border-black/[0.06] text-neutral-600 hover:text-black'
                          }`}
                        >
                          <h5 className="text-xs font-bold truncate">{doc.label}</h5>
                          <span className="text-[10px] text-neutral-500 block mt-0.5">{doc.desc}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Document Card Preview */}
                  <div
                    className={`p-5 rounded-[22px] border ${
                      isDark ? 'bg-black/40 border-white/[0.08]' : 'bg-neutral-50 border-black/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-neutral-300">{relationshipState.documentName}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#16C47F] font-bold">SHA-256 SEED VERIFIED</span>
                    </div>

                    <div className="text-xs text-neutral-400 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Applicant:</span>
                        <span className="text-white font-semibold">{relationshipState.ocrMatchDetails.applicantName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Vault Owner:</span>
                        <span className="text-white font-semibold">{relationshipState.ocrMatchDetails.vaultOwnerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Registry Authority:</span>
                        <span className="text-neutral-300">{relationshipState.ocrMatchDetails.registryAuthority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Registration Date:</span>
                        <span className="text-neutral-300">{relationshipState.ocrMatchDetails.issueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Document OCR Match Confidence Box */}
                <div
                  className={`p-6 rounded-[24px] border flex flex-col justify-between ${
                    isDark ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50/60 border-indigo-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-bold font-mono text-indigo-400 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>SENTINEL AI OCR MATCH REPORT</span>
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                      Spousal Succession Authorization Authenticated
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                      AI OCR parsed marriage certificate registration records and cross-referenced with Government of Telangana Marriage Portal. Names, Aadhaar seeds, and residential addresses match 100%.
                    </p>

                    {/* Progress Match Bar */}
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span className="text-neutral-400">Match Confidence Score</span>
                        <span className="text-[#16C47F]">{relationshipState.confidenceScore}% (High Assurance)</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-black/40 overflow-hidden p-0.5 border border-white/[0.08]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-[#16C47F] shadow-[0_0_12px_#16C47F]"
                          style={{ width: `${relationshipState.confidenceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-indigo-500/20">
                    <button
                      onClick={() => advanceStep(1)}
                      className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                    >
                      ← Back to Step 1
                    </button>
                    <button
                      onClick={() => advanceStep(3)}
                      className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Proceed to Step 3: Event Proof</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: EMERGENCY EVENT VERIFICATION */}
          {pipelineStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
                isDark
                  ? 'bg-[#101010]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                  : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <FileSearch className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">STEP 3 OF 5</span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      Official Emergency Event & Casualty Validation
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Multi-channel proof required depending on the nature of the critical life event.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#16C47F] text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>National CRS API & QR Scanner Armed</span>
                </div>
              </div>

              {/* Event Type Tabs */}
              <div className="flex space-x-3 mb-6">
                {[
                  { id: 'death', label: '1. Demise / Death Certificate', icon: HeartHandshake },
                  { id: 'hospitalization', label: '2. Critical Hospitalization', icon: Activity },
                  { id: 'missing_person', label: '3. Missing Person / Police FIR', icon: AlertOctagon },
                ].map((ev) => {
                  const Icon = ev.icon;
                  const isSelected = emergencyEventState.eventType === ev.id;
                  return (
                    <button
                      key={ev.id}
                      onClick={() => {
                        setEmergencyEventState((prev) => ({
                          ...prev,
                          eventType: ev.id as EmergencyEventType,
                        }));
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : isDark
                          ? 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white'
                          : 'bg-black/[0.02] border-black/[0.06] text-neutral-600 hover:text-black'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{ev.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* SUB-PANEL 1: DEATH CERTIFICATE */}
              {emergencyEventState.eventType === 'death' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div
                    className={`p-6 rounded-[22px] border space-y-4 ${
                      isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-300">Official Death Registration Details</span>
                      <span className="text-[10px] font-mono text-[#16C47F] font-bold">CRS INDIA PORTAL</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          Death Registration Number (CRS / Municipal Corporation)
                        </label>
                        <input
                          type="text"
                          value={emergencyEventState.deathDetails?.registrationNumber || 'DL-NDMC-2026-884920'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEmergencyEventState((prev) => ({
                              ...prev,
                              deathDetails: prev.deathDetails ? { ...prev.deathDetails, registrationNumber: val } : undefined,
                            }));
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/[0.1] font-mono text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                          <span className="text-neutral-500 block text-[10px]">Name in Record:</span>
                          <span className="text-white font-semibold">Chandan Vamsi</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                          <span className="text-neutral-500 block text-[10px]">Place of Demise:</span>
                          <span className="text-white font-semibold">Apollo Hospital, Hyd</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={triggerGovApiValidation}
                      disabled={isSimulatingCRS}
                      className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingCRS ? 'animate-spin' : ''}`} />
                      <span>{isSimulatingCRS ? 'Validating with Civil Registration Gateway...' : 'Validate with Govt CRS API & QR'}</span>
                    </button>
                  </div>

                  {/* Right validation checklist */}
                  <div
                    className={`p-6 rounded-[22px] border flex flex-col justify-between ${
                      isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/60 border-amber-200'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">
                        Cryptographic Event Integrity Checklist
                      </h4>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex items-center space-x-2.5 text-[#16C47F]">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                          <span>Name matches Vault Owner (Chandan Vamsi)</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-[#16C47F]">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                          <span>Date of Demise within valid notification window</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-[#16C47F]">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                          <span>Registration Number format verified against GHMC CRS</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-[#16C47F]">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                          <span>SHA-256 Digital QR Signature matches municipal key</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                      <button
                        onClick={() => advanceStep(2)}
                        className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                      >
                        ← Back to Step 2
                      </button>
                      <button
                        onClick={() => advanceStep(4)}
                        className="px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <span>Proceed to Step 4: Sentinel Risk</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-PANEL 2: HOSPITALIZATION */}
              {emergencyEventState.eventType === 'hospitalization' && (
                <div
                  className={`p-6 rounded-[22px] border space-y-4 ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                    <Activity className="w-4 h-4" />
                    <span>Hospital ICU Admission & Medical Incapacitation Protocol</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Hospital Admission Summary: <strong className="text-white">Apollo Hospitals Hyderabad (ICU Bed 04)</strong>. Attending: Dr. Suresh R. Reddy, MD (Reg TS-MCI-48192).
                  </p>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400">
                    Owner fallback check: Push notification sent to owner's registered hardware token with 12-hour response grace period.
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => advanceStep(4)}
                      className="px-6 py-2.5 rounded-full bg-amber-600 text-white font-extrabold text-xs cursor-pointer flex items-center space-x-2"
                    >
                      <span>Proceed to Risk Analysis</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-PANEL 3: MISSING PERSON */}
              {emergencyEventState.eventType === 'missing_person' && (
                <div
                  className={`p-6 rounded-[22px] border space-y-4 ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-red-400">
                    <AlertOctagon className="w-4 h-4" />
                    <span>Police FIR & Statutory Waiting Period (Missing Persons Act)</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Police Reference: <strong className="text-white">FIR-CYB-2026-0941</strong> (Gachibowli Cyber Crime & Missing Persons Unit).
                  </p>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
                    <span>Statutory Waiting Period Enforced:</span>
                    <span className="font-mono font-bold text-white">48 Hours Remaining of 72 Hours</span>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => advanceStep(4)}
                      className="px-6 py-2.5 rounded-full bg-amber-600 text-white font-extrabold text-xs cursor-pointer flex items-center space-x-2"
                    >
                      <span>Proceed to Risk Analysis</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: SENTINEL AI RISK ANALYSIS */}
          {pipelineStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
                isDark
                  ? 'bg-[#101010]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                  : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">STEP 4 OF 5</span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      Sentinel AI Real-Time Risk Analysis Engine
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Heuristic scoring of client telemetry, device fingerprint, network route, and biometric consistency.
                    </p>
                  </div>
                </div>

                {/* Risk Level Selector for Testing */}
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-neutral-400 mr-1">Simulate Risk:</span>
                  {(['low', 'medium', 'high'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleRiskChange(lvl)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        simulatedRiskOverride === lvl
                          ? lvl === 'low'
                            ? 'bg-emerald-500 text-black'
                            : lvl === 'medium'
                            ? 'bg-amber-500 text-black'
                            : 'bg-red-500 text-white'
                          : isDark
                          ? 'bg-white/[0.04] text-neutral-400 hover:text-white'
                          : 'bg-black/[0.04] text-neutral-600 hover:text-black'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Score Hero Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div
                  className={`p-6 rounded-[24px] border flex flex-col items-center justify-center text-center ${
                    riskState.riskLevel === 'low'
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-[#16C47F]'
                      : riskState.riskLevel === 'medium'
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-400'
                      : 'bg-red-950/20 border-red-500/40 text-red-400'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1">LIVE RISK ASSESSMENT SCORE</span>
                  <div className="text-5xl font-extrabold font-mono tracking-tight my-2">
                    {riskState.riskScore} <span className="text-xl text-neutral-500">/ 100</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold font-mono uppercase ${
                      riskState.riskLevel === 'low'
                        ? 'bg-emerald-500/20 text-[#16C47F] border border-emerald-500/40'
                        : riskState.riskLevel === 'medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}
                  >
                    {riskState.riskLevel.toUpperCase()} RISK TIER
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-3 max-w-xs">
                    {riskState.actionRequired}
                  </p>
                </div>

                {/* Heuristic Matrix */}
                <div
                  className={`lg:col-span-2 p-6 rounded-[24px] border space-y-3 ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <h4 className="text-xs font-bold text-neutral-300 mb-2">Telemetry Heuristics</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-500">Device Footprint:</span>
                      <span className="text-white font-mono">{riskState.deviceStatus} ({riskState.deviceFingerprint})</span>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-500">Geo & IP Route:</span>
                      <span className="text-white font-mono">{riskState.ipLocation}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-500">VPN / Tor Proxy:</span>
                      <span className={`font-mono font-bold ${riskState.vpnOrProxyDetected ? 'text-red-400' : 'text-[#16C47F]'}`}>
                        {riskState.vpnOrProxyDetected ? 'Detected' : 'None (Safe IP)'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-500">Document Match:</span>
                      <span className="text-[#16C47F] font-mono font-bold">{riskState.documentMatchPercentage}% Exact</span>
                    </div>
                  </div>

                  {/* Decision Guidance */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
                      riskState.riskLevel === 'low'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-[#16C47F]'
                        : riskState.riskLevel === 'medium'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-red-500/10 border-red-500/30 text-red-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {riskState.riskLevel === 'low'
                          ? 'Green Light: Low risk threshold satisfied. Permitted to proceed to Progressive Vault Access.'
                          : riskState.riskLevel === 'medium'
                          ? 'Yellow Light: Step-up authentication triggered. Additional mobile SMS OTP required.'
                          : 'Red Light: High risk anomaly detected. Access blocked until secondary trustee co-signs.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex justify-between">
                <button
                  onClick={() => advanceStep(3)}
                  className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  ← Back to Step 3
                </button>
                <button
                  onClick={() => advanceStep(5)}
                  className="px-6 py-3 rounded-full bg-[#16C47F] hover:bg-[#13B172] text-black font-extrabold text-xs shadow-[0_0_25px_rgba(22,196,127,0.4)] transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Authorize Progressive Vault Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: PROGRESSIVE VAULT ACCESS (3-STAGE TIERED UNLOCK) */}
          {pipelineStep === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[28px] p-6 sm:p-8 border transition-all ${
                isDark
                  ? 'bg-[#101010]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                  : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#16C47F]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#16C47F] font-bold uppercase">STEP 5 OF 5 — UNLOCKED</span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      Progressive Vault Access & Guided Succession Release
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Tiered security architecture: Zero automated fund transfers. Official legal documents released progressively.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[#16C47F] text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Stage 2 Family Access Verified</span>
                </div>
              </div>

              {/* Strict FinTech Security Guarantee Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start space-x-3 mb-8">
                <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-white block">FinTech Security Mandate Enforced:</strong>
                  <p className="leading-relaxed">
                    Passwords, NetBanking credentials, and UPI PINs are <strong>NEVER stored or displayed</strong>. LIFEVAULT AI generates official claim dossiers, legal succession forms, and municipal mutation packs to facilitate legitimate legal transfers through authorized banking and governmental channels.
                  </p>
                </div>
              </div>

              {/* 3-Stage Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Stage 1 */}
                <div
                  className={`p-6 rounded-[24px] border ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      STAGE 1: UNLOCKED
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    Immediate Crisis Access
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4">
                    Emergency medical directives, hospital cashless authorization, emergency contact list, and personal notes.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-400">Medical Directive:</span>
                      <span className="text-white font-semibold">Blood Group B+ / Star Health</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-400">Personal Video Note:</span>
                      <span className="text-blue-400 font-semibold cursor-pointer hover:underline">Play Encrypted Video</span>
                    </div>
                  </div>
                </div>

                {/* Stage 2 */}
                <div
                  className={`p-6 rounded-[24px] border relative ${
                    isDark
                      ? 'bg-blue-950/20 border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.15)]'
                      : 'bg-blue-50/60 border-blue-300 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-blue-400 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                      STAGE 2: ACTIVE UNLOCKED
                    </span>
                    <Unlock className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    Verified Family Access
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4">
                    Official policy bonds, property sale deeds, Demat folios, and bank account summaries with zero raw credentials.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-400">Term Insurance:</span>
                      <span className="text-white font-semibold">HDFC Life (₹2.50 Cr Cover)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex justify-between">
                      <span className="text-neutral-400">Property Title Deed:</span>
                      <span className="text-white font-semibold">Gachibowli Plot 42</span>
                    </div>
                  </div>
                </div>

                {/* Stage 3 */}
                <div
                  className={`p-6 rounded-[24px] border ${
                    isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                      STAGE 3: GUIDED COMPLETION
                    </span>
                    <Scale className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    Legal Completion & Transmission
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4">
                    AI Transfer Assistant generates pre-drafted claim forms, legal notices, and branch appointment packs.
                  </p>
                  <button
                    onClick={() => setActiveTab('ai_transfer_assistant')}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open AI Transfer Assistant</span>
                  </button>
                </div>
              </div>

              {/* Fast-Track Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                <button
                  onClick={() => advanceStep(1)}
                  className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  ← Restart Verification Pipeline
                </button>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setActiveTab('recovery_timeline')}
                    className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    View Day 1-3 Recovery Timeline
                  </button>
                  <button
                    onClick={() => setActiveTab('ai_transfer_assistant')}
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Launch AI Transfer Assistant</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* TAB 2: AI TRANSFER ASSISTANT & CLAIMS DOSSIERS */}
      {activeTab === 'ai_transfer_assistant' && (
        <div className="space-y-8">
          {/* Assistant Banner */}
          <div
            className={`rounded-[28px] p-6 sm:p-8 border relative overflow-hidden transition-all ${
              isDark
                ? 'bg-gradient-to-r from-blue-950/40 via-[#0A0D18] to-[#0A0A0A] border-blue-500/30 shadow-2xl'
                : 'bg-gradient-to-r from-blue-50 to-white border-blue-200 shadow-xl'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold font-mono text-blue-400 uppercase">
                AI DIGITAL EXECUTOR TRANSFER ASSISTANT
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">
              "I've verified your authorization under Chandan Vamsi's Digital Continuity Plan."
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              I will guide you step-by-step through each official claim and transfer process without exposing sensitive credentials or performing unsafe automated transactions.
            </p>
          </div>

          {/* Transfer Dossier Grid & Detailed View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Asset Transmission Cards */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase px-1">Active Transfer Dockets</h4>
              {transferTrackers.map((tracker) => {
                const isSelected = selectedTracker.id === tracker.id;
                const Icon =
                  tracker.category === 'insurance'
                    ? ShieldCheck
                    : tracker.category === 'bank'
                    ? Landmark
                    : tracker.category === 'property'
                    ? Home
                    : TrendingUp;

                return (
                  <motion.div
                    key={tracker.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedTrackerId(tracker.id)}
                    className={`p-4 rounded-[22px] border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.25)] ring-1 ring-blue-500'
                        : isDark
                        ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                        : 'bg-black/[0.02] border-black/[0.06] hover:bg-black/[0.05]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-neutral-900 dark:text-white truncate">{tracker.assetName}</h5>
                        <span className="text-[10px] text-neutral-500 font-mono">{tracker.institution}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                      <span className="font-mono text-neutral-400 font-bold">
                        ₹{(tracker.valuation / 100000).toFixed(2)} Lakhs
                      </span>
                      <span className="text-[10px] text-[#16C47F] font-bold font-mono">
                        Stage {tracker.currentStageNumber}/5
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right 2 Columns: Detailed Claim Protocol & Step-by-Step Guidance */}
            <div
              className={`lg:col-span-2 p-6 sm:p-8 rounded-[28px] border transition-all ${
                isDark
                  ? 'bg-[#101010]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                  : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                    OFFICIAL CLAIM & TRANSFER PROCEDURE
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
                    {selectedTracker.assetName}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    Account / Policy: <span className="text-white">{selectedTracker.accountOrPolicyMasked}</span> • Nominee: <span className="text-[#16C47F] font-bold">{selectedTracker.nominee}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(selectedTracker.officialFormName, 'Official Form Name')}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs text-neutral-300 transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Form Ref</span>
                  </button>
                </div>
              </div>

              {/* Progress Milestones Bar */}
              <div className="mb-8">
                <span className="text-xs font-bold font-mono text-neutral-400 block mb-3">
                  Transfer Progression Roadmap
                </span>
                <div className="space-y-2">
                  {selectedTracker.stages.map((st, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                        st.completed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-[#16C47F]'
                          : idx + 1 === selectedTracker.currentStageNumber
                          ? 'bg-blue-600/15 border-blue-500 text-blue-300 font-bold'
                          : isDark
                          ? 'bg-white/[0.02] border-white/[0.04] text-neutral-500'
                          : 'bg-black/[0.02] border-black/[0.04] text-neutral-500'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        {st.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#16C47F]" />
                        ) : idx + 1 === selectedTracker.currentStageNumber ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                        )}
                        <span>{st.name}</span>
                      </div>
                      {st.date && <span className="text-[10px] font-mono text-neutral-400">{st.date}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents Checklist for this claim */}
              <div className="mb-8">
                <span className="text-xs font-bold font-mono text-neutral-400 block mb-3">
                  Mandatory Submission Documents Docket
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTracker.requiredDocuments.map((doc, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs flex items-center space-x-2.5 ${
                        isDark ? 'bg-black/40 border-white/[0.06]' : 'bg-neutral-50 border-black/[0.06]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-neutral-300 text-xs truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Care & Portal Direct Action */}
              <div
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-black/[0.02] border-black/[0.08]'
                }`}
              >
                <div className="text-xs text-neutral-400 space-y-0.5">
                  <div>
                    <span className="text-neutral-500">Official Claim Kit:</span>{' '}
                    <strong className="text-white">{selectedTracker.officialFormName}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500">Helpdesk:</span>{' '}
                    <strong className="text-blue-400 font-mono">{selectedTracker.customerCareContact}</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      showToast({
                        type: 'success',
                        title: 'Dossier Downloaded',
                        message: `Pre-filled ${selectedTracker.officialFormName} generated with SHA-256 seal.`,
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Pre-Filled Claim Kit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAMILY RECOVERY TIMELINE (DAY 1 - DAY 3) */}
      {activeTab === 'recovery_timeline' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#16C47F] text-xs font-semibold mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Structured Family Action Roadmap</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                Family Recovery Timeline
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Step-by-step action plan replacing confusing document folders with an interactive guided checklist.
              </p>
            </div>

            {/* Day Filter Pills */}
            <div className="flex space-x-2">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDayFilter(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDayFilter === day
                      ? 'bg-[#16C47F] text-black font-extrabold shadow-[0_0_15px_rgba(22,196,127,0.4)]'
                      : isDark
                      ? 'bg-white/[0.04] text-neutral-400 hover:text-white'
                      : 'bg-black/[0.04] text-neutral-600 hover:text-black'
                  }`}
                >
                  Day 0{day} Actions
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Tasks List */}
          <div className="space-y-4">
            {recoveryTimelineTasks
              .filter((task) => task.day === activeDayFilter)
              .map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-6 rounded-[24px] border transition-all ${
                    task.completed
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(22,196,127,0.15)]'
                      : isDark
                      ? 'bg-[#101010]/90 border-white/[0.08]'
                      : 'bg-white/90 border-black/[0.06] shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => toggleRecoveryTimelineTask(task.id)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer mt-0.5 ${
                          task.completed
                            ? 'bg-[#16C47F] text-black shadow-[0_0_12px_#16C47F]'
                            : 'border-2 border-neutral-500 hover:border-white'
                        }`}
                      >
                        {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">
                            {task.timeframe}
                          </span>
                          <span className="text-neutral-600 dark:text-neutral-500">•</span>
                          <span className="text-[11px] font-mono text-blue-400 font-semibold">
                            Assigned: {task.assignedExecutor}
                          </span>
                        </div>
                        <h4
                          className={`text-base font-bold transition-all ${
                            task.completed
                              ? 'text-neutral-400 line-through'
                              : 'text-neutral-900 dark:text-white'
                          }`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
                          {task.description}
                        </p>

                        {/* Contact info pill */}
                        {task.contactNumber && (
                          <div className="pt-2 flex items-center space-x-3 text-xs text-neutral-400">
                            <span className="text-neutral-500">Direct Contact:</span>
                            <span className="font-mono text-white font-bold">{task.contactPerson} ({task.contactNumber})</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleRecoveryTimelineTask(task.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        task.completed
                          ? 'bg-emerald-500/20 text-[#16C47F] border border-emerald-500/30'
                          : 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Mark as Done'}
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 4: FORENSIC AUDIT & SECURITY LOG */}
      {activeTab === 'audit_log' && (
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Immutable Forensic Audit Ledger</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Emergency Access Security & Verification Audit Log
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Every identity check, OCR scan, CRS API lookup, and document unlock is cryptographically signed and logged.
            </p>
          </div>

          <div
            className={`rounded-[28px] p-6 border overflow-hidden transition-all ${
              isDark
                ? 'bg-[#101010]/90 backdrop-blur-[28px] border-white/[0.08] shadow-2xl'
                : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-xl'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.08] dark:border-white/[0.08] text-neutral-500 font-mono uppercase text-[10px]">
                    <th className="pb-3 px-3">Timestamp</th>
                    <th className="pb-3 px-3">Event & Action</th>
                    <th className="pb-3 px-3">Requester & Method</th>
                    <th className="pb-3 px-3">Device & IP Location</th>
                    <th className="pb-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 font-mono text-neutral-400 whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-3.5 px-3 font-semibold text-neutral-900 dark:text-white">{log.event}</td>
                      <td className="py-3.5 px-3 text-neutral-300 font-mono">
                        {log.requesterName || 'System'} {log.verificationMethod ? `(${log.verificationMethod})` : ''}
                      </td>
                      <td className="py-3.5 px-3 text-neutral-400 font-mono">
                        {log.device || 'Authorized Enclave'} • {log.location}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                            log.severity === 'emergency'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                              : log.severity === 'security'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                              : 'bg-emerald-500/20 text-[#16C47F] border border-emerald-500/40'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: OWNER SENTINEL & DEAD-MAN SWITCH */}
      {activeTab === 'owner_sentinel' && (
        <div className="space-y-8">
          <div
            className={`rounded-[28px] p-8 sm:p-12 relative overflow-hidden transition-all text-center flex flex-col items-center justify-center ${
              emergencyActive
                ? 'bg-gradient-to-b from-red-950/80 via-[#1A0505] to-[#0A0000] border-2 border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.5)]'
                : isDark
                ? 'bg-gradient-to-b from-red-950/30 via-[#120808] to-[#0A0A0A] border border-red-500/20 shadow-2xl'
                : 'bg-gradient-to-b from-red-50 to-white border border-red-200 shadow-xl'
            }`}
          >
            {/* Animated Radar */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center animate-ping absolute pointer-events-none" />
              <div className="w-24 h-24 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center animate-pulse">
                <AlertOctagon className="w-12 h-12 text-red-500" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">
              {emergencyActive ? 'EMERGENCY PROTOCOL TRANSMISSION ACTIVE' : 'Dead-Man Switch & Sentinel Standby'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mb-8 leading-relaxed">
              Heartbeat check-in window is set to <strong>48 hours</strong>. If uninterrupted for 48 hours, multi-sig alerts are sent to Primary Executor Ananya Sharma and Backup Executor Adv. Vikram Seth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleHeartbeat}
                className="px-8 py-3.5 rounded-full bg-[#16C47F] text-black font-extrabold text-xs shadow-[0_0_25px_rgba(22,196,127,0.4)] cursor-pointer flex items-center space-x-2"
              >
                <Heart className="w-4 h-4 fill-black" />
                <span>Send Heartbeat Check-in</span>
              </button>

              {emergencyActive ? (
                <button
                  onClick={cancelEmergency}
                  className="px-8 py-3.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-xs cursor-pointer"
                >
                  De-escalate & Reset
                </button>
              ) : (
                <button
                  onClick={() => triggerEmergency('Manual Multi-Sig Sentinel Test Trigger')}
                  className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-[0_0_25px_rgba(239,68,68,0.5)] cursor-pointer flex items-center space-x-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Test Emergency Alert Dispatch</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
