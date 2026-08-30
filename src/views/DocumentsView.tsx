import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import {
  FileText,
  UploadCloud,
  Search,
  Eye,
  Trash2,
  Scan,
  Camera,
  Image,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DocumentsView: React.FC = () => {
  const {
    documents,
    addDocument,
    deleteDocument,
    theme,
  } = useVault();

  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocIndex, setSelectedDocIndex] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSimulatedUpload = (fileType: string) => {
    setIsScanning(true);
    setScanStep('Preparing secure document import...');

    setTimeout(() => {
      setScanStep('Reading document information...');
    }, 900);

    setTimeout(() => {
      setScanStep('Verifying document integrity...');
    }, 1800);

    setTimeout(() => {
      addDocument({
        title:
          fileType === 'will'
            ? 'Registered Last Will & Testament'
            : fileType === 'camera'
            ? 'Camera Captured Health Card'
            : 'Health Insurance Master Policy',

        fileName:
          fileType === 'will'
            ? 'Will_Testament_2026_Certified.pdf'
            : fileType === 'camera'
            ? 'Camera_Scan_Health_2026.jpg'
            : 'Health_Shield_Card_2026.pdf',

        category: fileType === 'will' ? 'legal' : 'insurance',

        fileSize: '3.4 MB',

        mimeType:
          fileType === 'camera'
            ? 'image/jpeg'
            : 'application/pdf',

        isVerified: true,
        ocrConfidence: 99.4,

        encryptionType: 'AES-256-GCM + Hardware Enclave',

        accessPermissions: [
          'Spouse (Ananya)',
          'Adv. Vikram Seth',
        ],

        extractedKeyData: [
          {
            key: 'Signatory',
            value: 'Master Keyholder',
          },
          {
            key: 'Executor',
            value: 'Adv. Vikram Seth (Legal Counsel)',
          },
          {
            key: 'Witnesses',
            value: '2 Attested Witnesses',
          },
          {
            key: 'Registration Ref',
            value: 'REG/HYD/2026/8941',
          },
        ],
      });

      setIsScanning(false);
      setScanStep('');
    }, 2700);
  };

  const categories = [
    {
      id: 'all',
      label: 'All Files',
    },
    {
      id: 'legal',
      label: 'Wills & Deeds',
    },
    {
      id: 'insurance',
      label: 'Insurance',
    },
    {
      id: 'financial',
      label: 'Tax & Banks',
    },
  ];

  const filteredDocs = documents.filter((doc) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      doc.title.toLowerCase().includes(query) ||
      doc.fileName.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === 'all' ||
      doc.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const selectedDoc =
    selectedDocIndex !== null
      ? filteredDocs[selectedDocIndex]
      : null;

  const handleNextDoc = () => {
    if (
      selectedDocIndex !== null &&
      selectedDocIndex < filteredDocs.length - 1
    ) {
      setSelectedDocIndex(selectedDocIndex + 1);
    }
  };

  const handlePrevDoc = () => {
    if (
      selectedDocIndex !== null &&
      selectedDocIndex > 0
    ) {
      setSelectedDocIndex(selectedDocIndex - 1);
    }
  };

  return (
    <div className="space-y-8 pb-16">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
      >
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-3 ${
              isDark
                ? 'border-white/10 bg-white/[0.03] text-emerald-400'
                : 'border-black/10 bg-black/[0.02] text-emerald-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Secure document storage</span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDark
                ? 'text-white'
                : 'text-neutral-900'
            }`}
          >
            Document Vault
          </h1>

          <p className="text-sm text-neutral-500 mt-2 max-w-2xl leading-relaxed">
            Store, organize and securely access important documents from one
            protected workspace.
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full lg:w-80">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
          />

          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
              isDark
                ? 'bg-[#101010] border-white/10 text-white placeholder:text-neutral-600 focus:border-emerald-500/50'
                : 'bg-white border-black/10 text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-600/50'
            }`}
          />
        </div>
      </motion.section>


      {/* =====================================================
          CATEGORY FILTERS
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
      >
        {categories.map((category) => {
          const active =
            activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() =>
                setActiveCategory(category.id)
              }
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? isDark
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-white'
                  : isDark
                  ? 'border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  : 'border border-black/10 text-neutral-600 hover:text-neutral-900 hover:bg-black/[0.03]'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </motion.div>


      {/* =====================================================
          UPLOAD AREA
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.1,
        }}
        className={`border rounded-2xl p-7 sm:p-10 ${
          isDark
            ? 'bg-[#0d0d0d] border-white/10'
            : 'bg-white border-black/10'
        }`}
      >
        {isScanning ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${
                isDark
                  ? 'border-white/10 border-t-emerald-400'
                  : 'border-black/10 border-t-emerald-600'
              }`}
            >
              <Scan
                className={`w-6 h-6 ${
                  isDark
                    ? 'text-emerald-400'
                    : 'text-emerald-600'
                }`}
              />
            </motion.div>

            <h3
              className={`mt-5 text-sm font-bold ${
                isDark
                  ? 'text-white'
                  : 'text-neutral-900'
              }`}
            >
              Processing document
            </h3>

            <p className="text-xs text-neutral-500 mt-2 font-mono">
              {scanStep}
            </p>
          </div>
        ) : (
          <div className="text-center">

            <div
              className={`mx-auto w-14 h-14 rounded-2xl border flex items-center justify-center ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 text-neutral-300'
                  : 'bg-black/[0.02] border-black/10 text-neutral-700'
              }`}
            >
              <UploadCloud className="w-6 h-6" />
            </div>

            <h2
              className={`mt-5 text-lg font-bold ${
                isDark
                  ? 'text-white'
                  : 'text-neutral-900'
              }`}
            >
              Add a document
            </h2>

            <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto">
              Upload important documents and keep them organized
              inside your secure vault.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 mt-6">

              <button
                onClick={() =>
                  handleSimulatedUpload('camera')
                }
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <Camera className="w-4 h-4" />
                Camera Scan
              </button>

              <button
                onClick={() =>
                  handleSimulatedUpload('insurance')
                }
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-white/10 text-neutral-300 hover:bg-white/[0.05]'
                    : 'border-black/10 text-neutral-700 hover:bg-black/[0.03]'
                }`}
              >
                <Image className="w-4 h-4" />
                Gallery & Files
              </button>

              <button
                onClick={() =>
                  handleSimulatedUpload('will')
                }
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-white/10 text-neutral-300 hover:bg-white/[0.05]'
                    : 'border-black/10 text-neutral-700 hover:bg-black/[0.03]'
                }`}
              >
                <FileText className="w-4 h-4" />
                Upload Will
              </button>

            </div>
          </div>
        )}
      </motion.section>


      {/* =====================================================
          DOCUMENT COUNT
      ===================================================== */}

      <div className="flex items-center justify-between">

        <div>
          <h2
            className={`text-lg font-bold ${
              isDark
                ? 'text-white'
                : 'text-neutral-900'
            }`}
          >
            Your Documents
          </h2>

          <p className="text-xs text-neutral-500 mt-1">
            {filteredDocs.length} document
            {filteredDocs.length !== 1 ? 's' : ''} available
          </p>
        </div>

      </div>


      {/* =====================================================
          DOCUMENT GRID
      ===================================================== */}

      {filteredDocs.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredDocs.map((doc, idx) => (

            <motion.article
              key={doc.id}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                delay: idx * 0.05,
              }}
              whileHover={{
                y: -3,
              }}
              className={`group rounded-2xl border p-5 transition-all ${
                isDark
                  ? 'bg-[#0d0d0d] border-white/10 hover:border-white/20'
                  : 'bg-white border-black/10 hover:border-black/20'
              }`}
            >

              {/* Top */}

              <div className="flex items-start justify-between gap-3">

                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark
                      ? 'border-white/10 bg-white/[0.03] text-neutral-300'
                      : 'border-black/10 bg-black/[0.02] text-neutral-700'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2">

                  {doc.isVerified && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold ${
                        isDark
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDocument(doc.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'text-neutral-600 hover:text-red-400 hover:bg-red-500/10'
                        : 'text-neutral-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                    title="Delete document"
                    aria-label="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>


              {/* Information */}

              <div className="mt-5">

                <h3
                  className={`text-sm font-bold truncate ${
                    isDark
                      ? 'text-white'
                      : 'text-neutral-900'
                  }`}
                >
                  {doc.title}
                </h3>

                <p className="text-xs text-neutral-500 mt-1 truncate">
                  {doc.fileName}
                </p>

                <div className="flex items-center gap-2 mt-4 text-[11px] text-neutral-500">
                  <span>{doc.fileSize}</span>
                  <span>•</span>
                  <span>
                    {doc.category}
                  </span>
                </div>

              </div>


              {/* Bottom */}

              <div
                className={`mt-5 pt-4 border-t flex items-center justify-between ${
                  isDark
                    ? 'border-white/[0.08]'
                    : 'border-black/[0.07]'
                }`}
              >

                <span className="text-[10px] text-neutral-500">
                  Uploaded {doc.uploadDate}
                </span>

                <button
                  onClick={() =>
                    setSelectedDocIndex(idx)
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    isDark
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>

              </div>

            </motion.article>

          ))}

        </div>

      ) : (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`border rounded-2xl py-16 text-center ${
            isDark
              ? 'border-white/10 bg-[#0d0d0d]'
              : 'border-black/10 bg-white'
          }`}
        >
          <FileText
            className="w-10 h-10 mx-auto text-neutral-400"
          />

          <h3
            className={`mt-4 text-sm font-bold ${
              isDark
                ? 'text-white'
                : 'text-neutral-900'
            }`}
          >
            No documents found
          </h3>

          <p className="text-xs text-neutral-500 mt-1">
            Try changing your search or category filter.
          </p>
        </motion.div>

      )}


      {/* =====================================================
          DOCUMENT MODAL
      ===================================================== */}

      <AnimatePresence>

        {selectedDoc && selectedDocIndex !== null && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setSelectedDocIndex(null)
              }
              className="fixed inset-0 bg-black/70"
            />


            {/* Modal */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
              }}
              className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 ${
                isDark
                  ? 'bg-[#0d0d0d] border-white/10 text-white'
                  : 'bg-white border-black/10 text-neutral-900'
              }`}
            >

              {/* Modal Header */}

              <div
                className={`flex items-center justify-between pb-5 border-b ${
                  isDark
                    ? 'border-white/10'
                    : 'border-black/10'
                }`}
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                      isDark
                        ? 'border-white/10 text-neutral-300'
                        : 'border-black/10 text-neutral-700'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-base font-bold truncate">
                      {selectedDoc.title}
                    </h3>

                    <p className="text-xs text-neutral-500 truncate">
                      {selectedDoc.fileName}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedDocIndex(null)
                  }
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isDark
                      ? 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-black/[0.04]'
                  }`}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

              </div>


              {/* Verification */}

              <div className="mt-6">

                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    isDark
                      ? 'border-emerald-500/20 bg-emerald-500/[0.04]'
                      : 'border-emerald-600/20 bg-emerald-50'
                  }`}
                >

                  <CheckCircle2
                    className={`w-5 h-5 ${
                      isDark
                        ? 'text-emerald-400'
                        : 'text-emerald-700'
                    }`}
                  />

                  <div>

                    <div
                      className={`text-xs font-bold ${
                        isDark
                          ? 'text-emerald-400'
                          : 'text-emerald-800'
                      }`}
                    >
                      Document verified
                    </div>

                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Integrity check completed successfully.
                    </div>

                  </div>

                </div>

              </div>


              {/* Metadata */}

              <div className="mt-6">

                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Document information
                </h4>

                <div
                  className={`border rounded-xl overflow-hidden ${
                    isDark
                      ? 'border-white/10'
                      : 'border-black/10'
                  }`}
                >

                  {selectedDoc.extractedKeyData.map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-4 py-3 ${
                          idx !==
                          selectedDoc.extractedKeyData.length - 1
                            ? isDark
                              ? 'border-b border-white/[0.07]'
                              : 'border-b border-black/[0.07]'
                            : ''
                        }`}
                      >

                        <span className="text-xs text-neutral-500">
                          {item.key}
                        </span>

                        <span
                          className={`text-xs font-semibold ${
                            isDark
                              ? 'text-neutral-200'
                              : 'text-neutral-800'
                          }`}
                        >
                          {item.value}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>


              {/* Technical details */}

              <div className="mt-6">

                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Security details
                </h4>

                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-3`}
                >

                  <div
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'border-white/10'
                        : 'border-black/10'
                    }`}
                  >
                    <span className="text-[10px] text-neutral-500 block">
                      Encryption
                    </span>

                    <span className="text-xs font-semibold mt-1 block">
                      {selectedDoc.encryptionType}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'border-white/10'
                        : 'border-black/10'
                    }`}
                  >
                    <span className="text-[10px] text-neutral-500 block">
                      OCR Confidence
                    </span>

                    <span className="text-xs font-semibold mt-1 block">
                      {selectedDoc.ocrConfidence}%
                    </span>
                  </div>

                </div>

              </div>


              {/* Navigation */}

              <div
                className={`mt-6 pt-5 border-t flex items-center justify-between ${
                  isDark
                    ? 'border-white/10'
                    : 'border-black/10'
                }`}
              >

                <div className="flex items-center gap-2">

                  <button
                    onClick={handlePrevDoc}
                    disabled={
                      selectedDocIndex === 0
                    }
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-30 ${
                      isDark
                        ? 'border-white/10 hover:bg-white/[0.05]'
                        : 'border-black/10 hover:bg-black/[0.03]'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs text-neutral-500 font-mono">
                    {selectedDocIndex + 1} /{' '}
                    {filteredDocs.length}
                  </span>

                  <button
                    onClick={handleNextDoc}
                    disabled={
                      selectedDocIndex ===
                      filteredDocs.length - 1
                    }
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-30 ${
                      isDark
                        ? 'border-white/10 hover:bg-white/[0.05]'
                        : 'border-black/10 hover:bg-black/[0.03]'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>

                <button
                  onClick={() =>
                    setSelectedDocIndex(null)
                  }
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold ${
                    isDark
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  Done
                </button>

              </div>

            </motion.div>

          </div>

        )}

      </AnimatePresence>

    </div>
  );
};