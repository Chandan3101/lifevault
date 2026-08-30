import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Wallet,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  Building2,
  Database,
  Shield,
  Coins,
  Car,
  TrendingUp,
  ExternalLink,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AssetItem, AssetCategory } from '../types';

export const AssetsView: React.FC = () => {
  const { assets, addAsset, deleteAsset, totalNetWorth, theme } = useVault();
  const isDark = theme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Asset Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('bank_account');
  const [institution, setInstitution] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [valuation, setValuation] = useState('');
  const [nominee, setNominee] = useState('');
  const [nomineeContact, setNomineeContact] = useState('');
  const [accessInstructions, setAccessInstructions] = useState('');

  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const getCategoryIcon = (cat: AssetCategory) => {
    switch (cat) {
      case 'bank_account':
        return Database;
      case 'real_estate':
        return Building2;
      case 'insurance':
        return Shield;
      case 'crypto':
        return Coins;
      case 'demat':
        return TrendingUp;
      case 'vehicle':
        return Car;
      default:
        return Wallet;
    }
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !valuation) return;

    addAsset({
      name,
      category,
      institution: institution || 'Self-Managed',
      accountNumberMasked: accountNumber ? `•••• ${accountNumber.slice(-4)}` : '•••• 8821',
      accountNumber: accountNumber || '••••••••',
      valuation: parseFloat(valuation) || 0,
      currency: 'INR',
      primaryBeneficiary: nominee || 'Primary Heir',
      nominee: nominee || 'Primary Heir',
      nomineeContact: nomineeContact || 'On File',
      accessInstructions: accessInstructions || 'Stored in zero-knowledge secure enclave.',
      status: 'verified',
      linkedDocumentIds: ['doc-1'],
      linkedDocsCount: 1,
    });

    // Reset & close
    setName('');
    setInstitution('');
    setAccountNumber('');
    setValuation('');
    setNominee('');
    setNomineeContact('');
    setAccessInstructions('');
    setIsAddModalOpen(false);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesCat = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.nominee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/25 text-[#16C47F] text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Knowledge Asset Ledger</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Asset Inventory
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Total Net Worth Secured: <span className="font-bold text-[#16C47F] font-mono">{formatINR(totalNetWorth)}</span> across {assets.length} portfolio items.
          </p>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#16C47F] to-[#0E9F6E] hover:from-[#13B172] hover:to-[#0B855C] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(22,196,127,0.35)] transition-all flex items-center space-x-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Register New Asset</span>
        </motion.button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by asset, bank, or nominee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-full border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-[#16C47F]/40 ${
              isDark
                ? 'bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-500'
                : 'bg-black/[0.03] border-black/[0.06] text-neutral-900 placeholder-neutral-400'
            }`}
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'bank_account', label: 'Banking' },
            { id: 'real_estate', label: 'Real Estate' },
            { id: 'insurance', label: 'Insurance' },
            { id: 'crypto', label: 'Crypto & Web3' },
            { id: 'demat', label: 'Demat & Equity' },
            { id: 'vehicle', label: 'Vehicles' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#16C47F] text-black shadow-[0_0_15px_rgba(22,196,127,0.35)]'
                  : isDark
                  ? 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                  : 'bg-black/[0.04] text-neutral-600 hover:text-black hover:bg-black/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Floating Tiles Grid with Empty State */}
      {filteredAssets.length === 0 ? (
        <div
          className={`rounded-[28px] p-12 text-center border transition-all ${
            isDark
              ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border-white/[0.08]'
              : 'bg-white/90 backdrop-blur-[28px] border-black/[0.06] shadow-sm'
          }`}
        >
          <div className="w-16 h-16 rounded-3xl bg-[#16C47F]/10 text-[#16C47F] flex items-center justify-center mx-auto mb-4 border border-[#16C47F]/20">
            <Wallet className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
            {searchQuery || selectedCategory !== 'all' ? 'No Matching Assets Found' : 'No Assets Registered Yet'}
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
            {searchQuery || selectedCategory !== 'all'
              ? `No asset matches "${searchQuery || selectedCategory}". Try clearing your filters or search term.`
              : 'Add your bank accounts, term life policies, real estate deeds, or crypto cold wallets to protect your estate.'}
          </p>
          <div className="flex items-center justify-center space-x-3">
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.06] text-xs font-semibold hover:bg-black/[0.1] text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#16C47F] hover:bg-[#13B172] text-black font-extrabold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register First Asset</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            const Icon = getCategoryIcon(asset.category);

            return (
              <motion.div
                key={asset.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`rounded-[28px] p-6 sm:p-7 relative overflow-hidden transition-all duration-300 group ${
                  isDark
                    ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border border-white/[0.08] hover:border-[#16C47F]/60 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(22,196,127,0.2)]'
                    : 'bg-white/90 backdrop-blur-[28px] border border-black/[0.06] hover:border-[#16C47F]/60 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#16C47F]/15 text-[#16C47F] flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#16C47F]/10 text-[#16C47F] border border-[#16C47F]/20 font-bold uppercase">
                      {asset.status}
                    </span>
                    <button
                      onClick={() => deleteAsset(asset.id)}
                      className="p-1.5 rounded-full text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Institution */}
                <div className="mb-4">
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white truncate">
                    {asset.name}
                  </h3>
                  <span className="text-xs text-neutral-500">{asset.institution} • {asset.accountNumber}</span>
                </div>

                {/* Valuation Number */}
                <div className="p-3.5 rounded-2xl bg-black/20 dark:bg-black/40 border border-white/[0.04] mb-4">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-0.5">
                    Secured Value
                  </span>
                  <span className="text-2xl font-extrabold text-[#16C47F] font-mono tracking-tight">
                    {formatINR(asset.valuation)}
                  </span>
                </div>

                {/* Nominee & Instructions */}
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Nominee:</span>
                    <span className="font-semibold text-neutral-300 dark:text-neutral-200">{asset.nominee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Linked Docs:</span>
                    <span className="font-mono text-[#16C47F] font-bold">{asset.linkedDocsCount || 1} Verified</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add New Asset Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg rounded-[28px] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden ${
                isDark
                  ? 'bg-[#121212] border border-white/[0.1] text-white'
                  : 'bg-white border border-black/[0.08] text-neutral-900 shadow-2xl'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-inherit mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#16C47F]/15 text-[#16C47F] flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Register New Life Asset</h3>
                    <p className="text-xs text-neutral-500">Encrypted with AES-256 GCM</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAsset} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Asset Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., HDFC Premium Savings or Hyderabad Plot Deed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as AssetCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                    >
                      <option value="bank_account">Bank Account</option>
                      <option value="real_estate">Real Estate</option>
                      <option value="insurance">Insurance Policy</option>
                      <option value="crypto">Crypto & Web3</option>
                      <option value="demat">Demat & Stock Portfolio</option>
                      <option value="vehicle">Vehicle Title</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">Valuation (INR ₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 2500000"
                      value={valuation}
                      onChange={(e) => setValuation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">Institution / Issuer</label>
                    <input
                      type="text"
                      placeholder="e.g., State Bank of India"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">Account / Folio Ref</label>
                    <input
                      type="text"
                      placeholder="e.g., •••• 9821"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Primary Nominee / Heir</label>
                  <input
                    type="text"
                    placeholder="e.g., Ananya Sharma (Spouse - 100%)"
                    value={nominee}
                    onChange={(e) => setNominee(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#16C47F] hover:bg-[#13B172] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(22,196,127,0.3)] transition-all cursor-pointer mt-2"
                >
                  Seal & Add to Vault Ledger
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
