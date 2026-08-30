import React, { useState, useRef, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  FileText,
  Users,
  Building2,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export const AIAssistantView: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    isAiLoading,
    assets,
    documents,
    trustedPeople,
    totalNetWorth,
    securityScore,
    recoveryReadiness,
    theme,
  } = useVault();

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isDark = theme === 'dark';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isAiLoading) return;
    const msg = inputPrompt;
    setInputPrompt('');
    await sendChatMessage(msg);
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isAiLoading) return;
    await sendChatMessage(prompt);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini 3.7 Flash Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            AI Continuity Sentinel
          </h1>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/20 text-[#16C47F] text-xs font-mono font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero-Knowledge Context Window</span>
        </div>
      </div>

      {/* Fullscreen Split Layout: Chat (Left 7 cols) & Insights (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Glass Chat Interface */}
        <div
          className={`lg:col-span-7 h-[680px] rounded-[28px] p-6 flex flex-col justify-between transition-all ${
            isDark
              ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border border-white/[0.08] shadow-2xl'
              : 'bg-white/80 backdrop-blur-[28px] border border-black/[0.06] shadow-xl'
          }`}
        >
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-none">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUser
                        ? 'bg-[#16C47F] text-black font-bold text-xs'
                        : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-[22px] px-4 py-3 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#16C47F] text-black font-medium'
                        : isDark
                        ? 'bg-white/[0.06] border border-white/[0.08] text-neutral-200'
                        : 'bg-black/[0.04] border border-black/[0.06] text-neutral-800'
                    }`}
                  >
                    <div className="markdown-body prose prose-invert max-w-none text-xs">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>

                    <span className={`text-[9px] font-mono mt-1.5 block ${isUser ? 'text-black/60' : 'text-neutral-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {isAiLoading && (
              <div className="flex items-center space-x-3 text-xs text-blue-400 animate-pulse pl-2">
                <Bot className="w-4 h-4" />
                <span className="font-mono">Sentinel querying encrypted estate mesh...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Query Capsules */}
          <div className="pt-3 pb-2 flex flex-wrap items-center gap-1.5 border-t border-white/[0.06]">
            {[
              'What is my total insurance coverage?',
              'Who has access to the Villa deed?',
              'Which documents need immediate renewal?',
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-neutral-400 hover:text-white transition-all truncate max-w-xs cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="relative mt-2">
            <input
              type="text"
              placeholder="Ask anything about your assets, nominees, policies, or claims..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className={`w-full pl-4 pr-12 py-3 rounded-full border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                isDark
                  ? 'bg-black/40 border-white/[0.1] text-white placeholder-neutral-500'
                  : 'bg-white border-black/[0.1] text-neutral-900 placeholder-neutral-400'
              }`}
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isAiLoading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right 5 cols: Live Estate Ledger & Continuity Insights */}
        <div
          className={`lg:col-span-5 rounded-[28px] p-6 sm:p-7 space-y-6 transition-all ${
            isDark
              ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border border-white/[0.08] shadow-2xl'
              : 'bg-white/80 backdrop-blur-[28px] border border-black/[0.06] shadow-xl'
          }`}
        >
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Live Estate Snapshot</h3>
            </div>
            <p className="text-xs text-neutral-400">
              Continuously aggregated metadata securely fed into your local AI session.
            </p>
          </div>

          {/* Ledger Cards */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-black/20 dark:bg-black/40 border border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="w-4 h-4 text-[#16C47F]" />
                <span className="text-xs font-semibold">Total Estate Valuation</span>
              </div>
              <span className="font-mono text-xs font-bold text-[#16C47F]">
                ₹{((totalNetWorth || 0) / 10000000).toFixed(2)} Cr
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/20 dark:bg-black/40 border border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold">Sealed Documents</span>
              </div>
              <span className="font-mono text-xs font-bold text-blue-400">
                {documents.length} Files
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/20 dark:bg-black/40 border border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold">Authorized Trustees</span>
              </div>
              <span className="font-mono text-xs font-bold text-purple-400">
                {trustedPeople.length} Signers
              </span>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Recommendation</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Your HDFC Life Insurance nominee is fully registered. Recommend attaching secondary trustee permissions for your Demat portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
