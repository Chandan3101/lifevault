import React, { useState, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Search,
  LayoutDashboard,
  Network,
  Wallet,
  FileText,
  Users,
  HeartHandshake,
  Bot,
  AlertOctagon,
  ShieldCheck,
  Settings,
  Plus,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from '../types';

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setCurrentView,
    isAuthenticated,
    setAuthModalOpen,
    setAuthMode,
    assets,
    documents,
    trustedPeople,
    theme,
    toggleTheme,
    showToast,
  } = useVault();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  const navItems: { label: string; view: AppView; icon: any; category: string }[] = [
    { label: 'Dashboard Overview', view: 'dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Digital Life Map (Interactive Graph)', view: 'lifemap', icon: Network, category: 'Navigation' },
    { label: 'Assets & Wealth Ledger', view: 'assets', icon: Wallet, category: 'Navigation' },
    { label: 'Document Vault & OCR', view: 'documents', icon: FileText, category: 'Navigation' },
    { label: 'Trusted People & Permission Matrix', view: 'trusted-people', icon: Users, category: 'Navigation' },
    { label: 'Family Recovery Guide', view: 'recovery-guide', icon: HeartHandshake, category: 'Navigation' },
    { label: 'AI Legacy Assistant', view: 'ai-assistant', icon: Bot, category: 'Navigation' },
    { label: 'Emergency Succession Protocol', view: 'emergency', icon: AlertOctagon, category: 'Navigation' },
    { label: 'Security Center & Audit Logs', view: 'security', icon: ShieldCheck, category: 'Navigation' },
    { label: 'Settings & Supabase Schema', view: 'settings', icon: Settings, category: 'Navigation' },
  ];

  const filteredNav = navItems.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAssets = isAuthenticated
    ? assets
        .filter(
          (a) =>
            a.name.toLowerCase().includes(query.toLowerCase()) ||
            a.institution.toLowerCase().includes(query.toLowerCase()) ||
            a.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const filteredDocs = isAuthenticated
    ? documents
        .filter(
          (d) =>
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.fileName.toLowerCase().includes(query.toLowerCase()) ||
            d.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const filteredPeople = isAuthenticated
    ? trustedPeople
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.role.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSelectNav = (view: AppView) => {
    if (!isAuthenticated && view !== 'landing') {
      setCommandPaletteOpen(false);
      setAuthMode('login');
      setAuthModalOpen(true);
      showToast({
        type: 'security',
        title: 'Authentication Required',
        message: 'Unlock your vault to access confidential views.',
      });
      return;
    }
    setCurrentView(view);
    setCommandPaletteOpen(false);
  };

  const handleSelectAsset = (assetName: string) => {
    if (!isAuthenticated) {
      setCommandPaletteOpen(false);
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setCurrentView('assets');
    setCommandPaletteOpen(false);
    showToast({
      type: 'info',
      title: 'Navigating to Asset',
      message: `Focused on ${assetName}`,
    });
  };

  const handleSelectDoc = (docTitle: string) => {
    if (!isAuthenticated) {
      setCommandPaletteOpen(false);
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setCurrentView('documents');
    setCommandPaletteOpen(false);
    showToast({
      type: 'info',
      title: 'Navigating to Document',
      message: `Viewing ${docTitle}`,
    });
  };

  const handleSelectPerson = (personName: string) => {
    if (!isAuthenticated) {
      setCommandPaletteOpen(false);
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setCurrentView('trusted-people');
    setCommandPaletteOpen(false);
    showToast({
      type: 'info',
      title: 'Navigating to Trustee',
      message: `Inspecting permissions for ${personName}`,
    });
  };

  if (!commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden z-10 transition-all ${
            isDark
              ? 'bg-[#111111] border-[#262626] text-white shadow-[0_0_50px_rgba(0,0,0,0.8)]'
              : 'bg-[#FFFFFF] border-[#E5E5E5] text-neutral-900 shadow-2xl'
          }`}
        >
          {/* Search Input */}
          <div className={`flex items-center px-4 py-3.5 border-b ${isDark ? 'border-[#262626]' : 'border-[#E5E5E5]'}`}>
            <Search className="w-5 h-5 text-neutral-400 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, asset name, document, or trustee..."
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-neutral-500 font-medium"
              autoFocus
            />
            <kbd className={`px-2 py-0.5 rounded text-[10px] font-mono ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-500'}`}>
              ESC
            </kbd>
          </div>

          {/* Search Results List */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-4">
            {/* Quick Actions & Navigation */}
            {filteredNav.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 px-3 mb-1.5">
                  Pages & System Views
                </div>
                <div className="space-y-0.5">
                  {filteredNav.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.view}
                        onClick={() => handleSelectNav(item.view)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                          isDark
                            ? 'hover:bg-neutral-800/70 text-neutral-200 hover:text-white'
                            : 'hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-lg ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Assets */}
            {filteredAssets.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 px-3 mb-1.5">
                  Assets & Accounts
                </div>
                <div className="space-y-0.5">
                  {filteredAssets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleSelectAsset(asset.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                        isDark ? 'hover:bg-neutral-800/70 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                          <Wallet className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-[11px] text-neutral-500">{asset.institution} • {asset.category.toUpperCase()}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-emerald-400">
                        ₹{(asset.valuation / 100000).toFixed(1)}L
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {filteredDocs.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 px-3 mb-1.5">
                  Encrypted Documents
                </div>
                <div className="space-y-0.5">
                  {filteredDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleSelectDoc(doc.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                        isDark ? 'hover:bg-neutral-800/70 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-[11px] text-neutral-500">{doc.fileName} • {doc.fileSize}</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {doc.ocrConfidence}% OCR
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trusted People */}
            {filteredPeople.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 px-3 mb-1.5">
                  Trusted Network & Trustees
                </div>
                <div className="space-y-0.5">
                  {filteredPeople.map((person) => (
                    <button
                      key={person.id}
                      onClick={() => handleSelectPerson(person.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                        isDark ? 'hover:bg-neutral-800/70 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img src={person.avatar} alt={person.name} className="w-7 h-7 rounded-full object-cover border border-neutral-700" />
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-[11px] text-neutral-500">{person.role} • {person.accessLevel}</div>
                        </div>
                      </div>
                      <span className="text-[11px] text-neutral-400">{person.phone}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 px-3 mb-1.5">
                Quick Commands
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    toggleTheme();
                    setCommandPaletteOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isDark ? 'hover:bg-neutral-800/70 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </div>
                    <span className="font-medium">Toggle {isDark ? 'Light' : 'Dark'} Notion Theme</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">Shift + T</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('ai-assistant');
                    setCommandPaletteOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isDark ? 'hover:bg-neutral-800/70 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Ask LIFEVAULT AI Legacy Sentinel</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">Gemini 3.7</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className={`flex items-center justify-between px-4 py-2.5 border-t text-[11px] text-neutral-500 ${isDark ? 'border-[#262626] bg-[#0E0E0E]' : 'border-[#E5E5E5] bg-[#F7F7F5]'}`}>
            <div className="flex items-center space-x-3">
              <span>Use <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to navigate</span>
              <span><kbd className="font-mono">↵</kbd> to select</span>
            </div>
            <div className="flex items-center space-x-1 font-mono text-[10px] text-blue-400">
              <span>LIFEVAULT AI OMNI-SEARCH</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
