import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  HeartHandshake,
  CheckCircle2,
  Circle,
  FileText,
  Copy,
  Check,
  Sparkles,
  Download,
  ShieldCheck,
  ChevronRight,
  Clock,
  ArrowRight,
  Send,
  Printer,
  X,
  Building2,
  Landmark,
  Home,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const RecoveryGuideView: React.FC = () => {
  const {
    recoverySteps,
    toggleRecoveryStep,
    recoveryReadiness,
    theme,
    transferTrackers,
    recoveryTimelineTasks,
    toggleRecoveryTimelineTask,
    setCurrentView,
    showToast,
  } = useVault();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'timeline' | 'checklists' | 'claims'>('timeline');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const claimLetterTemplate = `To: Claims Management Department, HDFC Life Insurance Co. Ltd.
Date: ${new Date().toLocaleDateString('en-GB')}
Subject: Notice of Claim & Transmission Request — Policy Ref #HDFC-TL-8829-2026

Dear Sir / Madam,

This is to officially lodge a life insurance claim under Master Term Policy #HDFC-TL-8829-2026.

As registered primary beneficiary and executor of the estate under LIFEVAULT AI Cryptographic Verification, please find attached:
1. Certified Death Certificate / Primary Casualty Report (CRS Reg: DL-NDMC-2026-884920)
2. Original Policy Document with SHA-256 Seal: c893...8374
3. Identity & KYC Verification of Nominee: Ananya Sharma (Spouse)
4. Bank Account Mandate for NEFT/RTGS Transmission

Kindly acknowledge receipt and confirm standard SLA timeline for disbursement.

Authorized Signer,
Ananya Sharma (Beneficiary) & Adv. Vikram Seth (Co-Signer)`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(claimLetterTemplate);
    setCopied(true);
    showToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: 'Claim Notice template copied.',
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/25 text-[#16C47F] text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Succession & Continuity Protocols</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Life Continuity Recovery Guide
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Step-by-step verified action plan for trustees and family members during critical life transitions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setCurrentView('emergency')}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex items-center space-x-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Launch Emergency Verification Hub</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsLetterModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 font-extrabold text-xs transition-all flex items-center space-x-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Draft Claim Notice</span>
          </motion.button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center space-x-2 border-b border-black/[0.08] dark:border-white/[0.08] pb-1">
        {[
          { id: 'timeline', label: 'Day 1-3 Recovery Timeline', icon: Clock },
          { id: 'claims', label: 'Official Transfer Dossiers', icon: Sparkles },
          { id: 'checklists', label: 'Master Continuity Checklist', icon: CheckCircle2 },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : isDark
                  ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  : 'text-neutral-600 hover:text-black hover:bg-black/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DAY 1-3 RECOVERY TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Day-by-Day Family Action Roadmap</h3>
            <div className="flex space-x-2">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDay === day
                      ? 'bg-[#16C47F] text-black font-extrabold shadow-sm'
                      : isDark
                      ? 'bg-white/[0.04] text-neutral-400'
                      : 'bg-black/[0.04] text-neutral-600'
                  }`}
                >
                  Day 0{day}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {recoveryTimelineTasks
              .filter((t) => t.day === activeDay)
              .map((task) => (
                <div
                  key={task.id}
                  className={`p-5 rounded-[24px] border transition-all flex items-start justify-between gap-4 ${
                    task.completed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                      : isDark
                      ? 'bg-[#101010]/80 border-white/[0.08]'
                      : 'bg-white border-black/[0.06] shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    <button
                      onClick={() => toggleRecoveryTimelineTask(task.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer mt-0.5 ${
                        task.completed ? 'bg-[#16C47F] text-black' : 'border border-neutral-500'
                      }`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">{task.timeframe}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-[11px] font-mono text-blue-400">Assigned: {task.assignedExecutor}</span>
                      </div>
                      <h4 className={`text-sm font-bold ${task.completed ? 'line-through opacity-70' : 'text-neutral-900 dark:text-white'}`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">{task.description}</p>
                      {task.contactNumber && (
                        <div className="pt-1 text-xs text-neutral-400">
                          Direct Contact: <strong className="text-white font-mono">{task.contactPerson} ({task.contactNumber})</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRecoveryTimelineTask(task.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                      task.completed ? 'bg-emerald-500/20 text-[#16C47F]' : 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                    }`}
                  >
                    {task.completed ? 'Done' : 'Mark'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL TRANSFER DOSSIERS */}
      {activeTab === 'claims' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transferTrackers.map((tracker) => {
            const Icon =
              tracker.category === 'insurance'
                ? ShieldCheck
                : tracker.category === 'bank'
                ? Landmark
                : tracker.category === 'property'
                ? Home
                : TrendingUp;

            return (
              <div
                key={tracker.id}
                className={`p-6 rounded-[28px] border transition-all ${
                  isDark ? 'bg-[#101010]/90 border-white/[0.08] shadow-xl' : 'bg-white border-black/[0.06] shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{tracker.assetName}</h4>
                    <span className="text-[11px] text-neutral-400 font-mono">{tracker.institution}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-400 mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Valuation / Cover:</span>
                    <span className="text-white font-mono font-bold">₹{(tracker.valuation / 100000).toFixed(2)} Lakhs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Account / Policy:</span>
                    <span className="text-neutral-300 font-mono">{tracker.accountOrPolicyMasked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Designated Nominee:</span>
                    <span className="text-[#16C47F] font-bold">{tracker.nominee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Official Form:</span>
                    <span className="text-blue-400">{tracker.officialFormName}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] mb-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Required Documents</span>
                  <div className="text-[11px] text-neutral-300 space-y-1">
                    {tracker.requiredDocuments.slice(0, 3).map((d, i) => (
                      <div key={i} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    showToast({
                      type: 'success',
                      title: 'Claim Docket Downloaded',
                      message: `${tracker.officialFormName} prepared with encrypted hash.`,
                    });
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Pre-Filled Claim Kit</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: MASTER CHECKLIST */}
      {activeTab === 'checklists' && (
        <div className="space-y-4">
          {recoverySteps.map((step) => (
            <div
              key={step.id}
              className={`p-5 rounded-[24px] border transition-all flex items-start justify-between gap-4 ${
                step.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : isDark
                  ? 'bg-[#101010]/80 border-white/[0.08]'
                  : 'bg-white border-black/[0.06] shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleRecoveryStep(step.id)}
                  className="mt-1 text-neutral-400 hover:text-[#16C47F] cursor-pointer shrink-0"
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-[#16C47F] fill-[#16C47F]/20" />
                  ) : (
                    <Circle className="w-6 h-6 text-neutral-500 hover:border-[#16C47F]" />
                  )}
                </button>

                <div>
                  <h4 className={`text-sm font-bold ${step.completed ? 'line-through opacity-70' : 'text-neutral-900 dark:text-white'}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">{step.description}</p>
                  <div className="mt-2 text-[10px] text-neutral-500">
                    Assigned: <strong className="text-neutral-300">{step.responsibleParty}</strong> • SLA: {step.estimatedHours}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleRecoveryStep(step.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                  step.completed ? 'bg-[#16C47F] text-black font-extrabold' : 'bg-white/[0.06] text-neutral-300 hover:bg-white/[0.1]'
                }`}
              >
                {step.completed ? 'Completed' : 'Mark Ready'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Claim Letter Modal */}
      <AnimatePresence>
        {isLetterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLetterModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl rounded-[28px] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden ${
                isDark
                  ? 'bg-[#121212] border border-white/[0.1] text-white'
                  : 'bg-white border border-black/[0.08] text-neutral-900 shadow-2xl'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-inherit mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Automated Insurance Claim Dispatch</h3>
                    <p className="text-xs text-neutral-500">Auto-filled with HDFC Term Life policy metadata</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLetterModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                readOnly
                rows={12}
                value={claimLetterTemplate}
                className="w-full p-4 rounded-2xl bg-black/40 font-mono text-xs text-neutral-300 leading-relaxed border border-white/[0.08] resize-none focus:outline-none"
              />

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Attestation Seal: Validated</span>
                <button
                  onClick={handleCopyLetter}
                  className="px-5 py-2.5 rounded-full bg-[#16C47F] text-black font-extrabold text-xs shadow-md flex items-center space-x-2 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Claim Notice'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

