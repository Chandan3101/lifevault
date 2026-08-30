import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  Users,
  UserPlus,
  Shield,
  CheckCircle2,
  Lock,
  Key,
  Trash2,
  Mail,
  Phone,
  AlertTriangle,
  X,
  Sparkles,
  Fingerprint,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TrustedPerson, TrusteeRole, AccessLevel } from '../types';

export const TrustedPeopleView: React.FC = () => {
  const {
    trustedPeople,
    addTrustedPerson,
    deleteTrustedPerson,
    showToast,
    theme,
  } = useVault();

  const isDark = theme === 'dark';

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<TrustedPerson>>({
    name: '',
    role: 'Spouse',
    email: '',
    phone: '',
    accessLevel: 'Full Access',
    approvalStatus: 'Multisig Verified',
    permissions: {
      viewBanking: true,
      viewProperty: true,
      viewLegal: true,
      viewMedical: true,
      initiateEmergency: true,
    },
  });

  const handleSavePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast({
        type: 'warning',
        title: 'Missing Required Fields',
        message: 'Please provide Trustee Name and Email Address.',
      });
      return;
    }

    const indianAvatars = [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594824813590-4828114421b8?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    ];
    const randomAvatar = indianAvatars[Math.floor(Math.random() * indianAvatars.length)];

    const newPerson: TrustedPerson = {
      id: `trp-${Date.now()}`,
      name: formData.name || '',
      role: (formData.role as TrusteeRole) || 'Family Member',
      email: formData.email || '',
      phone: formData.phone || '',
      accessLevel: (formData.accessLevel as AccessLevel) || 'Restricted',
      approvalStatus: 'Multisig Verified',
      avatar: randomAvatar,
      assignedShards: '1 of 3 Cryptographic Shard',
      hasShard: true,
      permissions: formData.permissions || {
        viewBanking: false,
        viewProperty: true,
        viewLegal: true,
        viewMedical: true,
        initiateEmergency: false,
      },
    };

    addTrustedPerson(newPerson);
    setIsAddModalOpen(false);
    showToast({
      type: 'success',
      title: 'Trustee Enrolled in Multi-Sig',
      message: `${newPerson.name} has been issued a Shamir cryptographic shard.`,
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/25 text-[#16C47F] text-xs font-semibold mb-2">
            <Key className="w-3.5 h-3.5" />
            <span>Shamir's Secret Sharing (2-of-3 Threshold)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Trusted People & Co-Signers
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Designate trusted executors, family members, and legal counsel who hold distributed cryptographic shards.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#16C47F] to-[#0E9F6E] hover:from-[#13B172] hover:to-[#0B855C] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(22,196,127,0.35)] transition-all flex items-center space-x-2 cursor-pointer self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4 stroke-[3]" />
          <span>Enroll New Trustee</span>
        </motion.button>
      </div>

      {/* Quorum Status Capsule Card */}
      <div
        className={`rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
          isDark
            ? 'bg-[#121212]/70 backdrop-blur-[28px] border border-white/[0.08] shadow-2xl'
            : 'bg-white/80 backdrop-blur-[28px] border border-black/[0.06] shadow-lg'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#16C47F]/15 text-[#16C47F] flex items-center justify-center">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Shamir 2-of-3 Mathematical Quorum
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Decryption master key is partitioned across 3 hardware shards. 2 signers must co-sign to release succession protocol.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#16C47F]/10 border border-[#16C47F]/30 text-[#16C47F] text-xs font-mono font-bold">
            Quorum Active (2 / 3 Armed)
          </span>
        </div>
      </div>

      {/* Trustees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustedPeople.map((person) => (
          <motion.div
            key={person.id}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`rounded-[28px] p-6 sm:p-7 relative overflow-hidden transition-all flex flex-col justify-between ${
              isDark
                ? 'bg-[#0E0E0E]/80 backdrop-blur-[28px] border border-white/[0.08] hover:border-[#16C47F]/50 shadow-xl'
                : 'bg-white/90 backdrop-blur-[28px] border border-black/[0.06] hover:border-[#16C47F]/50 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#16C47F]/30"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-neutral-900 dark:text-white truncate">
                      {person.name}
                    </h3>
                    <span className="text-xs text-[#16C47F] font-mono font-semibold">{person.role}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTrustedPerson(person.id)}
                  className="p-1.5 rounded-full text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Remove Trustee"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{person.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{person.phone}</span>
                </div>
              </div>

              {/* Permissions Matrix */}
              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Permissions Matrix
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {person.permissions.viewBanking && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                      Banking
                    </span>
                  )}
                  {person.permissions.viewProperty && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-mono border border-purple-500/20">
                      Property
                    </span>
                  )}
                  {person.permissions.viewMedical && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">
                      Medical
                    </span>
                  )}
                  {person.permissions.initiateEmergency && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-mono border border-red-500/20">
                      Emergency Co-Signer
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-[#16C47F] font-mono flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{person.approvalStatus}</span>
              </span>
              <span className="text-neutral-500 font-mono">{person.assignedShards}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Trustee Modal */}
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
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Enroll New Trustee</h3>
                    <p className="text-xs text-neutral-500">Shamir Key Shard Generation</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePerson} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adv. Vikram Seth"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">Role</label>
                    <select
                      value={formData.role || 'Spouse'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as TrusteeRole })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Lawyer / Legal Counsel">Lawyer / Legal Counsel</option>
                      <option value="Chartered Accountant">Chartered Accountant</option>
                      <option value="Trusted Friend">Trusted Friend</option>
                      <option value="Executor">Executor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">Access Level</label>
                    <select
                      value={formData.accessLevel || 'Full Access'}
                      onChange={(e) => setFormData({ ...formData, accessLevel: e.target.value as AccessLevel })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                    >
                      <option value="Full Access">Full Access</option>
                      <option value="Restricted">Restricted</option>
                      <option value="Emergency Only">Emergency Only</option>
                      <option value="Posthumous Only">Posthumous Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikram@legalservices.in"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#16C47F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#16C47F] hover:bg-[#13B172] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(22,196,127,0.3)] transition-all cursor-pointer mt-2"
                >
                  Issue Shamir Cryptographic Shard
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
