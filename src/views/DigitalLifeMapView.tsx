import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  ShieldCheck,
  Building2,
  Database,
  Shield,
  Users,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
  Fingerprint,
  CheckCircle2,
  FileText,
  Search,
  Maximize2,
  RefreshCw,
  Eye,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GraphNode {
  id: string;
  label: string;
  category: 'root' | 'bank' | 'insurance' | 'property' | 'investments' | 'family';
  categoryLabel: string;
  value: string;
  valuationRaw: number;
  beneficiary: string;
  status: string;
  docCount: number;
  icon: any;
  color: string;
  borderColor: string;
  bgGlow: string;
  x: number;
  y: number;
  description: string;
  sha256: string;
}

export const DigitalLifeMapView: React.FC = () => {
  const { theme, setCurrentView, user, assets, documents, trustedPeople, totalNetWorth } = useVault();
  const isDark = theme === 'dark';

  const [selectedNodeId, setSelectedNodeId] = useState<string>('insurance');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isSimulatingEmergency, setIsSimulatingEmergency] = useState<boolean>(false);

  // Format currency
  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Dynamic category calculations
  const bankAssets = assets.filter((a) => a.category === 'bank');
  const bankVal = bankAssets.reduce((sum, a) => sum + (a.valuation || 0), 0);
  const bankDocs = documents.filter((d) => d.category === 'financial' || d.category === 'legal').length;

  const insAssets = assets.filter((a) => a.category === 'insurance');
  const insVal = insAssets.reduce((sum, a) => sum + (a.valuation || 0), 0);
  const insDocs = documents.filter((d) => d.category === 'insurance').length;

  const propAssets = assets.filter((a) => a.category === 'real_estate');
  const propVal = propAssets.reduce((sum, a) => sum + (a.valuation || 0), 0);
  const propDocs = documents.filter((d) => d.category === 'property').length;

  const invAssets = assets.filter((a) => a.category === 'investments');  const invVal = invAssets.reduce((sum, a) => sum + (a.valuation || 0), 0);
  const invDocs = documents.filter((d) => d.category === 'financial').length;

  const shardHolders = trustedPeople.filter((p) => p.hasShard);
  const primaryBeneficiary =
  trustedPeople.find((p) => p.role.toLowerCase().includes('spouse'))?.name ||
  trustedPeople[0]?.name ||
  'Next of Kin';

  const nodes: GraphNode[] = [
    {
      id: 'you',
      label: `${user.name} (Master Enclave)`,
      category: 'root',
      categoryLabel: 'Hardware Enclave',
      value: `${formatINR(totalNetWorth)} Protected`,
      valuationRaw: totalNetWorth,
      beneficiary: 'Self (Master Keyholder)',
      status: 'Active Enclave',
      docCount: documents.length,
      icon: ShieldCheck,
      color: '#16C47F',
      borderColor: 'border-[#16C47F]',
      bgGlow: 'rgba(22, 196, 127, 0.4)',
      x: 50,
      y: 50,
      description: 'Master hardware-backed key derivation on Apple Secure Enclave / FIDO2 biometric gate.',
      sha256: '9f8a3c42e19d7b8849c25f1620a87d091e46bc20e2a39281a8b9f1234abcd567',
    },
    {
      id: 'bank',
      label: bankAssets[0]?.name || 'State Bank of India',
      category: 'bank',
      categoryLabel: 'Banking & Liquidity',
      value: formatINR(bankVal),
      valuationRaw: bankVal,
      beneficiary: `${primaryBeneficiary} (Nominee)`,
      status: 'Nominee Verified',
      docCount: bankDocs,
      icon: Database,
      color: '#10B981',
      borderColor: 'border-emerald-500',
      bgGlow: 'rgba(16, 185, 129, 0.4)',
      x: 22,
      y: 28,
      description: 'Primary savings & wealth management portfolio with automated survivor mandate.',
      sha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    },
    {
      id: 'insurance',
      label: insAssets[0]?.name || 'HDFC Term Life Policy',
      category: 'insurance',
      categoryLabel: 'Life Protection',
      value: formatINR(insVal),
      valuationRaw: insVal,
      beneficiary: `${primaryBeneficiary} (100%)`,
      status: 'Claim Ready (Phase 1)',
      docCount: insDocs,
      icon: Shield,
      color: '#16C47F',
      borderColor: 'border-[#16C47F]',
      bgGlow: 'rgba(22, 196, 127, 0.4)',
      x: 78,
      y: 25,
      description: 'Pure term insurance policy with pre-drafted instant death claim documentation.',
      sha256: 'c893247012938471092837401928374019283740192837401928374019283740',
    },
    {
      id: 'property',
      label: propAssets[0]?.name || 'Hyderabad Villa Deed',
      category: 'property',
      categoryLabel: 'Real Estate Estate',
      value: formatINR(propVal),
      valuationRaw: propVal,
      beneficiary: 'Joint Family Trust',
      status: 'Title Encumbrance Clear',
      docCount: propDocs,
      icon: Building2,
      color: '#8B5CF6',
      borderColor: 'border-purple-500',
      bgGlow: 'rgba(139, 92, 246, 0.4)',
      x: 22,
      y: 72,
      description: 'Registered Sale Deed with Encumbrance Certificate & Property Tax receipts up-to-date.',
      sha256: 'd4e5f6a1b2c37890123456789abcdef0123456789abcdef0123456789abcdef0',
    },
    {
      id: 'investments',
      label: invAssets[0]?.name || 'Equity & Digital Assets',
      category: 'investments',
      categoryLabel: 'Mutual Funds & Crypto',
      value: formatINR(invVal),
      valuationRaw: invVal,
      beneficiary: 'Designated Beneficiaries',
      status: 'Folios Linked via OCR',
      docCount: invDocs,
      icon: TrendingUp,
      color: '#3B82F6',
      borderColor: 'border-blue-500',
      bgGlow: 'rgba(59, 130, 246, 0.4)',
      x: 50,
      y: 84,
      description: 'Diversified holdings and cryptographic cold storage with e-nomination certified.',
      sha256: 'e5f6a1b2c3d47890123456789abcdef0123456789abcdef0123456789abcdef0',
    },
    {
      id: 'family',
      label: 'Family Quorum & Trustees',
      category: 'family',
      categoryLabel: 'Multi-Sig Governance',
      value: `${trustedPeople.length} Trusted Co-Signers`,
      valuationRaw: 0,
      beneficiary: `Shamir ${Math.min(2, trustedPeople.length)}-of-${trustedPeople.length || 1} Threshold`,
      status: `${shardHolders.length} Shards Distributed`,
      docCount: documents.filter((d) => d.category === 'identity').length,
      icon: Users,
      color: '#F59E0B',
      borderColor: 'border-amber-500',
      bgGlow: 'rgba(245, 158, 11, 0.4)',
      x: 78,
      y: 72,
      description: trustedPeople.map((p) => p.name).join(', ') || 'No trustees enrolled yet.',
      sha256: 'f6a1b2c3d4e57890123456789abcdef0123456789abcdef0123456789abcdef0',
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const filteredNodes = nodes.filter((n) => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory || n.category === 'root';
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/25 text-[#16C47F] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Digital Life Mesh</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Digital Life Map
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Dynamic relational graph connecting assets, legal titles, nominees, and emergency handover pathways.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'bank', 'insurance', 'property', 'investments', 'family'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#16C47F] text-black shadow-[0_0_15px_rgba(22,196,127,0.4)]'
                  : isDark
                  ? 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                  : 'bg-black/[0.04] text-neutral-600 hover:text-black hover:bg-black/[0.08]'
              }`}
            >
              {cat === 'all' ? 'All Entities' : cat}
            </button>
          ))}

          {/* Emergency Simulation Button */}
          <button
            onClick={() => setIsSimulatingEmergency(!isSimulatingEmergency)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              isSimulatingEmergency
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                : 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isSimulatingEmergency ? 'Simulating SOS Pulse' : 'Simulate Crisis Routing'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 8 cols: Interactive Graph Stage */}
        <div
          className={`lg:col-span-8 h-[540px] sm:h-[600px] rounded-[28px] relative overflow-hidden flex items-center justify-center p-6 select-none transition-all ${
            isDark
              ? 'bg-[#0A0A0A]/80 backdrop-blur-[28px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
              : 'bg-white/80 backdrop-blur-[28px] border border-black/[0.06] shadow-xl'
          }`}
        >
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${
                isDark ? '#16C47F' : '#16C47F'
              } 1px, transparent 0)`,
              backgroundSize: '36px 36px',
            }}
          />

          {/* Ambient Aurora Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#16C47F]/10 blur-[120px] pointer-events-none" />

          {/* SVG Animated Connector Edges with Light Particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Edges from 'you' (50%, 50%) to nodes */}
            {filteredNodes
              .filter((n) => n.id !== 'you')
              .map((node) => {
                const isEmergencyEdge = isSimulatingEmergency;
                return (
                  <g key={node.id}>
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke={
                        isEmergencyEdge
                          ? '#EF4444'
                          : selectedNodeId === node.id
                          ? '#16C47F'
                          : isDark
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(0, 0, 0, 0.12)'
                      }
                      strokeWidth={selectedNodeId === node.id ? '2.5' : '1.5'}
                      strokeDasharray="6 6"
                      className="transition-all duration-300"
                    />

                    {/* Animated Light Particle traveling along edge */}
                    <circle r="4" fill={isEmergencyEdge ? '#EF4444' : '#16C47F'}>
                      <animateMotion
                        dur={isEmergencyEdge ? '1.5s' : '3.5s'}
                        repeatCount="indefinite"
                        path={`M 500,300 L ${node.x * 10},${node.y * 6}`}
                      />
                    </circle>
                  </g>
                );
              })}
          </svg>

          {/* Render Graph Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const Icon = node.icon;

            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                whileHover={{ scale: 1.08, y: -4 }}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`p-4 sm:p-5 rounded-[24px] border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#16C47F] text-black border-[#16C47F] shadow-[0_0_35px_rgba(22,196,127,0.6)] scale-105'
                      : isDark
                      ? 'bg-[#141414]/90 backdrop-blur-xl border-white/[0.1] text-white hover:border-[#16C47F]/50 shadow-2xl'
                      : 'bg-white/95 backdrop-blur-xl border-black/[0.08] text-neutral-900 hover:border-[#16C47F]/50 shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-black text-white'
                          : 'bg-[#16C47F]/15 text-[#16C47F]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-left min-w-[120px]">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                        isSelected ? 'text-black/70' : 'text-neutral-500'
                      }`}>
                        {node.categoryLabel}
                      </span>
                      <div className="text-xs sm:text-sm font-extrabold tracking-tight truncate">
                        {node.label}
                      </div>
                      <div className={`text-[11px] font-mono font-bold mt-0.5 ${
                        isSelected ? 'text-black' : 'text-[#16C47F]'
                      }`}>
                        {node.value}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right 4 cols: Holographic Cryptographic Inspector */}
        <div
          className={`lg:col-span-4 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all ${
            isDark
              ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border border-white/[0.08] shadow-2xl'
              : 'bg-white/80 backdrop-blur-[28px] border border-black/[0.06] shadow-xl'
          }`}
        >
          <div>
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] dark:border-white/[0.06] mb-6">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#16C47F]/15 text-[#16C47F] flex items-center justify-center">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Entity Inspector</h3>
                  <span className="text-[10px] font-mono text-[#16C47F]">Zero-Knowledge Record</span>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[#16C47F]/10 text-[#16C47F] border border-[#16C47F]/30 font-bold">
                {selectedNode.status}
              </span>
            </div>

            {/* Selected Node Details */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Entity Name
                </span>
                <div className="text-lg font-extrabold text-neutral-900 dark:text-white">
                  {selectedNode.label}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Valuation / Coverage
                </span>
                <div className="text-2xl font-extrabold text-[#16C47F] font-mono">
                  {selectedNode.value}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/20 dark:bg-black/40 border border-white/[0.05] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Primary Beneficiary:</span>
                  <span className="font-semibold text-neutral-200">{selectedNode.beneficiary}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Linked Documents:</span>
                  <span className="font-semibold text-[#16C47F]">{selectedNode.docCount} Sealed Files</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Continuity Directive
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  {selectedNode.description}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  SHA-256 Hash Digest
                </span>
                <div className="p-2.5 rounded-xl bg-black/30 font-mono text-[10px] text-neutral-400 break-all border border-white/[0.04] mt-1">
                  {selectedNode.sha256}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-2.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView('assets')}
              className="w-full py-3 px-4 rounded-2xl bg-[#16C47F] hover:bg-[#13B172] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(22,196,127,0.3)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Manage Entity in Asset Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
