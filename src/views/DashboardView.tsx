import React, { useEffect, useRef, useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  ShieldCheck,
  Sparkles,
  Wallet,
  FileText,
  Users,
  ChevronRight,
  Building2,
  Database,
  Shield,
  Activity,
  CheckCircle2,
  PieChart as PieIcon,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardView: React.FC = () => {
  const {
    user,
    assets,
    documents,
    trustedPeople,
    totalNetWorth,
    securityScore,
    setCurrentView,
    auditLogs,
    theme,
  } = useVault();

  const isDark = theme === 'dark';
  const [activeHeroNode, setActiveHeroNode] = useState('insurance');

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const children = Array.from(page.children);

    children.forEach((child, index) => {
      const element = child as HTMLElement;

      element.animate(
        [
          {
            opacity: 0,
            transform: 'translateY(14px)',
          },
          {
            opacity: 1,
            transform: 'translateY(0)',
          },
        ],
        {
          duration: 420,
          delay: index * 70,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both',
        }
      );
    });
  }, []);

  const formatINR = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }

    return `₹${value.toLocaleString('en-IN')}`;
  };

  const bankTotal = assets
    .filter((asset) => asset.category === 'bank')
    .reduce((sum, asset) => sum + (asset.valuation || 0), 0);

  const insuranceTotal = assets
    .filter((asset) => asset.category === 'insurance')
    .reduce((sum, asset) => sum + (asset.valuation || 0), 0);

  const realEstateTotal = assets
    .filter((asset) => asset.category === 'real_estate')
    .reduce((sum, asset) => sum + (asset.valuation || 0), 0);

  const primaryBank =
    assets.find((asset) => asset.category === 'bank')?.name || 'Bank Account';

  const primaryInsurance =
    assets.find((asset) => asset.category === 'insurance')?.name ||
    'Insurance Policy';

  const primaryProperty =
    assets.find((asset) => asset.category === 'real_estate')?.name ||
    'Property';

  const heroNodes = [
    {
      id: 'you',
      label: user.name || 'You',
      category: 'Owner',
      value: 'Protected',
      icon: ShieldCheck,
    },
    {
      id: 'bank',
      label: primaryBank,
      category: 'Banking',
      value: formatINR(bankTotal),
      icon: Database,
    },
    {
      id: 'insurance',
      label: primaryInsurance,
      category: 'Protection',
      value: formatINR(insuranceTotal),
      icon: Shield,
    },
    {
      id: 'property',
      label: primaryProperty,
      category: 'Real Estate',
      value: formatINR(realEstateTotal),
      icon: Building2,
    },
    {
      id: 'trustees',
      label: 'Trusted People',
      category: 'Access',
      value: `${trustedPeople.length} people`,
      icon: Users,
    },
  ];

  const metrics = [
    {
      title: 'Total Estate Value',
      value: formatINR(totalNetWorth),
      description: `${assets.length} protected assets`,
      icon: Wallet,
      action: () => setCurrentView('assets'),
    },
    {
      title: 'Document Vault',
      value: `${documents.length} Files`,
      description: 'Encrypted and organized',
      icon: FileText,
      action: () => setCurrentView('documents'),
    },
    {
      title: 'Trusted People',
      value: `${trustedPeople.length} Trustees`,
      description: 'Controlled emergency access',
      icon: Users,
      action: () => setCurrentView('trusted-people'),
    },
  ];

  const allocation = [
    {
      name: 'Insurance',
      percentage: 45,
    },
    {
      name: 'Real Estate',
      percentage: 32,
    },
    {
      name: 'Equities & MF',
      percentage: 15,
    },
    {
      name: 'Bank',
      percentage: 8,
    },
  ];

  const pageClass = isDark
    ? 'text-neutral-100'
    : 'text-neutral-900';

  const cardClass = isDark
    ? 'bg-[#0d0d0d] border-white/[0.08]'
    : 'bg-white border-black/[0.08]';

  const mutedClass = isDark
    ? 'text-neutral-400'
    : 'text-neutral-500';

  const secondaryClass = isDark
    ? 'bg-white/[0.04] border-white/[0.08]'
    : 'bg-neutral-50 border-black/[0.06]';

  return (
    <div
      ref={pageRef}
      className={`space-y-7 sm:space-y-9 pb-16 ${pageClass}`}
    >
      {/* HEADER */}
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#16C47F] mb-2">
            LifeVault
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Good to see you, {user.name || 'there'}.
          </h1>

          <p className={`mt-2 text-sm max-w-xl ${mutedClass}`}>
            One secure place for your assets, documents, trusted people and
            continuity plan.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('security')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
            isDark
              ? 'border-white/[0.1] hover:bg-white/[0.05]'
              : 'border-black/[0.08] hover:bg-neutral-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#16C47F]" />
          <span>{securityScore}% Security</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* MAIN HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LIFE MAP */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className={`lg:col-span-7 rounded-2xl border p-5 sm:p-7 ${cardClass}`}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#16C47F]" />

                <span
                  className={`text-[10px] uppercase tracking-[0.12em] font-semibold ${mutedClass}`}
                >
                  Continuity Map
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold">
                Your Digital Life Map
              </h2>

              <p className={`text-xs mt-1 ${mutedClass}`}>
                A simple view of everything connected to your vault.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('lifemap')}
              className="text-xs font-semibold text-[#16C47F] flex items-center gap-1 hover:underline"
            >
              Explore
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MAP */}
          <div
            className={`relative h-[330px] rounded-xl border overflow-hidden ${
              isDark
                ? 'bg-[#090909] border-white/[0.08]'
                : 'bg-neutral-50 border-black/[0.07]'
            }`}
          >
            {/* GRID */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {/* CONNECTING LINES */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="50"
                y1="50"
                x2="23"
                y2="27"
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeWidth="0.35"
              />

              <line
                x1="50"
                y1="50"
                x2="77"
                y2="27"
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeWidth="0.35"
              />

              <line
                x1="50"
                y1="50"
                x2="23"
                y2="73"
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeWidth="0.35"
              />

              <line
                x1="50"
                y1="50"
                x2="77"
                y2="73"
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeWidth="0.35"
              />
            </svg>

            {/* CENTER */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveHeroNode('you')}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div
                className={`w-24 h-24 rounded-full border flex flex-col items-center justify-center transition-all ${
                  activeHeroNode === 'you'
                    ? 'border-[#16C47F] bg-[#16C47F]/10'
                    : isDark
                    ? 'border-white/[0.12] bg-[#111]'
                    : 'border-black/[0.08] bg-white'
                }`}
              >
                <ShieldCheck className="w-6 h-6 text-[#16C47F] mb-1" />

                <span className="text-[11px] font-bold">
                  {user.name || 'You'}
                </span>

                <span className={`text-[9px] ${mutedClass}`}>
                  Protected
                </span>
              </div>
            </motion.button>

            {/* NODES */}
            {heroNodes
              .filter((node) => node.id !== 'you')
              .map((node, index) => {
                const Icon = node.icon;

                const positions = [
                  'left-[7%] top-[12%]',
                  'right-[7%] top-[12%]',
                  'left-[7%] bottom-[12%]',
                  'right-[7%] bottom-[12%]',
                ];

                const selected = activeHeroNode === node.id;

                return (
                  <motion.button
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2 + index * 0.08,
                      duration: 0.3,
                    }}
                    whileHover={{ y: -3 }}
                    onClick={() => setActiveHeroNode(node.id)}
                    className={`absolute ${positions[index]} z-10 text-left`}
                  >
                    <div
                      className={`w-[145px] sm:w-[175px] p-3 rounded-xl border transition-all duration-200 ${
                        selected
                          ? 'border-[#16C47F]/60'
                          : isDark
                          ? 'bg-[#111] border-white/[0.08] hover:border-white/[0.18]'
                          : 'bg-white border-black/[0.07] hover:border-black/[0.14]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selected
                              ? 'bg-[#16C47F]/10 text-[#16C47F]'
                              : isDark
                              ? 'bg-white/[0.05] text-neutral-400'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold truncate">
                            {node.label}
                          </p>

                          <p className={`text-[9px] ${mutedClass}`}>
                            {node.category}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs font-bold mt-2">
                        {node.value}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
          </div>

          <div
            className={`mt-4 pt-4 border-t flex items-center justify-between text-[10px] font-mono ${mutedClass} ${
              isDark ? 'border-white/[0.07]' : 'border-black/[0.07]'
            }`}
          >
            <span>Vault integrity verified</span>
            <span className="text-[#16C47F]">100%</span>
          </div>
        </motion.div>

        {/* SECURITY PANEL */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className={`lg:col-span-5 rounded-2xl border p-5 sm:p-7 ${cardClass}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark
                    ? 'bg-white/[0.05]'
                    : 'bg-neutral-100'
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#16C47F]" />
              </div>

              <div>
                <h2 className="text-sm font-bold">
                  Continuity Assistant
                </h2>

                <p className={`text-[10px] ${mutedClass}`}>
                  Vault overview
                </p>
              </div>
            </div>

            <span className="text-[10px] font-semibold text-[#16C47F]">
              ACTIVE
            </span>
          </div>

          <div
            className={`rounded-xl border p-4 mb-5 ${secondaryClass}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#16C47F]" />

              <span className="text-xs font-bold">
                Everything looks organized
              </span>
            </div>

            <p className={`text-xs leading-relaxed ${mutedClass}`}>
              Your vault currently contains {assets.length} assets,{' '}
              {documents.length} documents and {trustedPeople.length}{' '}
              trusted people.
            </p>
          </div>

          <div className="space-y-2">
            <p
              className={`text-[10px] uppercase tracking-[0.12em] font-semibold mb-3 ${mutedClass}`}
            >
              Recent activity
            </p>

            {auditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className={`flex items-center justify-between gap-3 p-3 rounded-lg border ${
                  isDark
                    ? 'border-white/[0.06]'
                    : 'border-black/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Activity className="w-3.5 h-3.5 text-[#16C47F] shrink-0" />

                  <span className="text-[11px] truncate">
                    {log.event}
                  </span>
                </div>

                <span className={`text-[9px] font-mono shrink-0 ${mutedClass}`}>
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentView('ai-assistant')}
            className="w-full mt-5 py-3 rounded-xl bg-[#16C47F] text-black text-xs font-bold hover:bg-[#12b874] transition-all duration-200 hover:-translate-y-0.5"
          >
            Open Continuity Assistant
          </button>
        </motion.div>
      </section>

      {/* METRICS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
            <motion.button
              key={metric.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              onClick={metric.action}
              className={`text-left rounded-2xl border p-5 transition-all duration-200 ${cardClass}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark
                      ? 'bg-white/[0.05]'
                      : 'bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#16C47F]" />
                </div>

                <ArrowUpRight
                  className={`w-4 h-4 ${mutedClass}`}
                />
              </div>

              <p
                className={`text-[10px] uppercase tracking-[0.12em] font-semibold mt-5 ${mutedClass}`}
              >
                {metric.title}
              </p>

              <p className="text-2xl font-bold mt-1">
                {metric.value}
              </p>

              <p className={`text-xs mt-1 ${mutedClass}`}>
                {metric.description}
              </p>
            </motion.button>
          );
        })}
      </section>

      {/* LOWER SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ALLOCATION */}
        <div
          className={`lg:col-span-7 rounded-2xl border p-5 sm:p-7 ${cardClass}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-[#16C47F]" />

                <h2 className="text-base font-bold">
                  Estate Allocation
                </h2>
              </div>

              <p className={`text-xs mt-1 ${mutedClass}`}>
                Current distribution of protected assets.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('assets')}
              className="text-xs font-semibold text-[#16C47F] hover:underline"
            >
              View all
            </button>
          </div>

          <div
            className={`h-3 rounded-full overflow-hidden flex ${
              isDark ? 'bg-white/[0.06]' : 'bg-neutral-100'
            }`}
          >
            {allocation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.1,
                }}
                className={`h-full ${
                  index === 0
                    ? 'bg-[#16C47F]'
                    : index === 1
                    ? 'bg-neutral-500'
                    : index === 2
                    ? 'bg-neutral-400'
                    : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {allocation.map((item) => (
              <div
                key={item.name}
                className={`p-3 rounded-xl border ${secondaryClass}`}
              >
                <p className={`text-[10px] ${mutedClass}`}>
                  {item.name}
                </p>

                <p className="text-lg font-bold mt-1">
                  {item.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ASSET REGISTRY */}
        <div
          className={`lg:col-span-5 rounded-2xl border p-5 sm:p-7 ${cardClass}`}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold">
                Protected Assets
              </h2>

              <p className={`text-xs mt-1 ${mutedClass}`}>
                Recently added assets.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('assets')}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'border-white/[0.08] hover:bg-white/[0.05]'
                  : 'border-black/[0.08] hover:bg-neutral-50'
              }`}
            >
              <Plus className="w-4 h-4 text-[#16C47F]" />
            </button>
          </div>

          <div className="space-y-2">
            {assets.slice(0, 4).map((asset) => (
              <button
                key={asset.id}
                onClick={() => setCurrentView('assets')}
                className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-white/[0.06] hover:border-white/[0.14]'
                    : 'border-black/[0.06] hover:border-black/[0.13]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isDark
                        ? 'bg-white/[0.05]'
                        : 'bg-neutral-100'
                    }`}
                  >
                    <Wallet className="w-4 h-4 text-[#16C47F]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">
                      {asset.name}
                    </p>

                    <p className={`text-[10px] truncate ${mutedClass}`}>
                      {asset.institution} · {asset.nominee}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-[#16C47F]">
                    {formatINR(asset.valuation)}
                  </p>

                  <p className={`text-[9px] ${mutedClass}`}>
                    Protected
                  </p>
                </div>
              </button>
            ))}

            {assets.length === 0 && (
              <div
                className={`p-6 rounded-xl border text-center ${secondaryClass}`}
              >
                <Wallet
                  className={`w-6 h-6 mx-auto mb-2 ${mutedClass}`}
                />

                <p className="text-xs font-semibold">
                  No assets yet
                </p>

                <p className={`text-[10px] mt-1 ${mutedClass}`}>
                  Add your first protected asset.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};