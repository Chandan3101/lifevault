import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppView,
  AssetItem,
  DocumentItem,
  TrustedPerson,
  RecoveryStep,
  SecurityAuditLog,
  UserProfile,
  ChatMessage,
  ExecutorProfile,
  TransferProcessTracker,
  RecoveryTimelineTask,
  IdentityVerificationState,
  RelationshipVerificationState,
  EmergencyEventVerificationState,
  SentinelRiskAnalysisState,
  ProgressiveAccessStage,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_ASSETS,
  INITIAL_DOCUMENTS,
  INITIAL_TRUSTED_PEOPLE,
  INITIAL_RECOVERY_STEPS,
  INITIAL_AUDIT_LOGS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_EXECUTORS,
  INITIAL_TRANSFER_TRACKERS,
  INITIAL_RECOVERY_TIMELINE_TASKS,
} from '../data/mockData';
import confetti from 'canvas-confetti';

export interface ToastItem {
  id: string;
  type: 'success' | 'security' | 'warning' | 'emergency' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

interface VaultContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  assets: AssetItem[];
  addAsset: (asset: Omit<AssetItem, 'id' | 'updatedAt'>) => void;
  updateAsset: (id: string, updated: Partial<AssetItem>) => void;
  deleteAsset: (id: string) => void;
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadDate' | 'sha256'>) => void;
  deleteDocument: (id: string) => void;
  trustedPeople: TrustedPerson[];
  addTrustedPerson: (person: Omit<TrustedPerson, 'id' | 'lastActive'>) => void;
  updateTrustedPerson: (id: string, updated: Partial<TrustedPerson>) => void;
  deleteTrustedPerson: (id: string) => void;
  recoverySteps: RecoveryStep[];
  toggleRecoveryStep: (id: string) => void;
  auditLogs: SecurityAuditLog[];
  addAuditLog: (log: Omit<SecurityAuditLog, 'id' | 'timestamp'>) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => Promise<void>;
  isAiLoading: boolean;
  emergencyActive: boolean;
  triggerEmergency: (reason: string) => void;
  cancelEmergency: () => void;
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id' | 'timestamp'>) => void;
  dismissToast: (id: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;

  // Emergency Verification & Continuity Workflow
  executors: ExecutorProfile[];
  activeExecutor: ExecutorProfile;
  setActiveExecutor: React.Dispatch<React.SetStateAction<ExecutorProfile>>;
  transferTrackers: TransferProcessTracker[];
  updateTransferTracker: (id: string, updates: Partial<TransferProcessTracker>) => void;
  recoveryTimelineTasks: RecoveryTimelineTask[];
  toggleRecoveryTimelineTask: (id: string) => void;
  pipelineStep: number;
  setPipelineStep: (step: number) => void;
  identityState: IdentityVerificationState;
  setIdentityState: React.Dispatch<React.SetStateAction<IdentityVerificationState>>;
  relationshipState: RelationshipVerificationState;
  setRelationshipState: React.Dispatch<React.SetStateAction<RelationshipVerificationState>>;
  emergencyEventState: EmergencyEventVerificationState;
  setEmergencyEventState: React.Dispatch<React.SetStateAction<EmergencyEventVerificationState>>;
  riskState: SentinelRiskAnalysisState;
  setRiskState: React.Dispatch<React.SetStateAction<SentinelRiskAnalysisState>>;
  progressiveUnlockedStage: ProgressiveAccessStage;
  setProgressiveUnlockedStage: (stage: ProgressiveAccessStage) => void;
  advanceVerificationPipeline: () => void;
  resetVerificationWorkflow: () => void;

  // Computed metrics
  totalNetWorth: number;
  securityScore: number;
  recoveryReadiness: number;
  activeAlertCount: number;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
  }, [theme]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('lifevault_authenticated');
    return savedAuth !== null ? savedAuth === 'true' : true;
  });

  // Sync auth state to localStorage and listen for multi-tab logout/login
  useEffect(() => {
    localStorage.setItem('lifevault_authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lifevault_authenticated') {
        const nextAuth = e.newValue === 'true';
        setIsAuthenticated(nextAuth);
      }
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const [user, setUser] = useState<UserProfile>(() => {
    const savedVersion = localStorage.getItem('lifevault_data_version');
    if (savedVersion !== 'v2.2_indian_names_avatars') {
      localStorage.setItem('lifevault_data_version', 'v2.2_indian_names_avatars');
      localStorage.setItem('lifevault_user', JSON.stringify(INITIAL_USER));
      localStorage.setItem('lifevault_assets', JSON.stringify(INITIAL_ASSETS));
      localStorage.setItem('lifevault_documents', JSON.stringify(INITIAL_DOCUMENTS));
      localStorage.setItem('lifevault_people', JSON.stringify(INITIAL_TRUSTED_PEOPLE));
      localStorage.setItem('lifevault_recovery', JSON.stringify(INITIAL_RECOVERY_STEPS));
      return INITIAL_USER;
    }
    const saved = localStorage.getItem('lifevault_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [assets, setAssets] = useState<AssetItem[]>(() => {
    const saved = localStorage.getItem('lifevault_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('lifevault_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });
  const [trustedPeople, setTrustedPeople] = useState<TrustedPerson[]>(() => {
    const saved = localStorage.getItem('lifevault_people');
    return saved ? JSON.parse(saved) : INITIAL_TRUSTED_PEOPLE;
  });
  const [recoverySteps, setRecoverySteps] = useState<RecoveryStep[]>(() => {
    const saved = localStorage.getItem('lifevault_recovery');
    return saved ? JSON.parse(saved) : INITIAL_RECOVERY_STEPS;
  });
  const [executors] = useState<ExecutorProfile[]>(INITIAL_EXECUTORS);
  const [activeExecutor, setActiveExecutor] = useState<ExecutorProfile>(INITIAL_EXECUTORS[0]);
  const [transferTrackers, setTransferTrackers] = useState<TransferProcessTracker[]>(INITIAL_TRANSFER_TRACKERS);
  const [recoveryTimelineTasks, setRecoveryTimelineTasks] = useState<RecoveryTimelineTask[]>(INITIAL_RECOVERY_TIMELINE_TASKS);
  const [pipelineStep, setPipelineStep] = useState<number>(1);

  // Verification Step States
  const [identityState, setIdentityState] = useState<IdentityVerificationState>({
    idType: 'Aadhaar',
    idNumber: '8842-9901-4412',
    idDocumentUploaded: true,
    idDocumentName: 'Aadhaar_AnanyaSharma_Verified.pdf',
    selfieVerified: true,
    selfieLivenessScore: 99.4,
    otpVerified: true,
    otpCode: '884920',
    verifiedAt: 'Today, 08:30 AM',
    status: 'verified',
  });

  const [relationshipState, setRelationshipState] = useState<RelationshipVerificationState>({
    proofType: 'marriage_certificate',
    documentUploaded: true,
    documentName: 'Marriage_Registration_Certificate_TS_2016.pdf',
    confidenceScore: 98.6,
    ocrMatchDetails: {
      applicantName: 'Ananya Sharma',
      vaultOwnerName: 'Chandan Vamsi',
      registryAuthority: 'Govt of Telangana Marriage Registrar',
      issueDate: '18 Nov 2016',
    },
    verifiedAt: 'Today, 08:31 AM',
    status: 'verified',
  });

  const [emergencyEventState, setEmergencyEventState] = useState<EmergencyEventVerificationState>({
    eventType: 'death',
    deathDetails: {
      certificateUploaded: true,
      certificateFileName: 'Official_Death_Certificate_GHMC.pdf',
      registrationNumber: 'DL-NDMC-2026-884920',
      issuingAuthority: 'Greater Hyderabad Municipal Corp (CRS Portal)',
      dateOfDemise: '24 Feb 2026',
      placeOfDemise: 'Apollo Hospitals, Jubilee Hills, Hyderabad',
      nameMatched: true,
      dobMatched: true,
      crsGovApiValidated: true,
      qrHashValid: true,
    },
    hospitalizationDetails: {
      admissionLetterUploaded: true,
      admissionDocName: 'Apollo_ICU_Admission_Summary.pdf',
      hospitalName: 'Apollo Hospitals, Hyderabad',
      attendingPhysician: 'Dr. Suresh R. Reddy, MD',
      physicianRegNumber: 'TS-MCI-48192',
      ownerOtpRequested: true,
      ownerOtpConfirmed: false,
      icuStatus: true,
    },
    missingDetails: {
      firUploaded: true,
      firDocName: 'Police_FIR_Hyderabad_Cyberabad.pdf',
      firNumber: 'FIR-CYB-2026-0941',
      policeStation: 'Gachibowli Cyber Crime & Missing Persons Unit',
      investigatingOfficer: 'Insp. R. Venkatesh',
      reportedDate: '20 Feb 2026',
      waitingPeriodHoursRemaining: 48,
      waitingPeriodTotalHours: 72,
    },
    verifiedAt: 'Today, 08:32 AM',
    status: 'verified',
  });

  const [riskState, setRiskState] = useState<SentinelRiskAnalysisState>({
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
    evaluatedAt: 'Today, 08:33 AM',
  });

  const [progressiveUnlockedStage, setProgressiveUnlockedStage] = useState<ProgressiveAccessStage>('stage2_verified_family');

  const updateTransferTracker = (id: string, updates: Partial<TransferProcessTracker>) => {
    setTransferTrackers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast({
      type: 'info',
      title: 'Transfer Claim Updated',
      message: 'Official transfer docket updated.',
    });
  };

  const toggleRecoveryTimelineTask = (id: string) => {
    setRecoveryTimelineTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      const target = next.find((t) => t.id === id);
      if (target?.completed) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
        showToast({
          type: 'success',
          title: '✓ Task Completed',
          message: `${target.title.slice(0, 45)}...`,
        });
      }
      return next;
    });
  };

  const advanceVerificationPipeline = () => {
    if (pipelineStep < 5) {
      setPipelineStep((prev) => prev + 1);
      showToast({
        type: 'security',
        title: `Step ${pipelineStep + 1} Unlocked`,
        message: 'Proceeding through multi-layer emergency verification.',
      });
    }
  };

  const resetVerificationWorkflow = () => {
    setPipelineStep(1);
    showToast({
      type: 'info',
      title: 'Verification Reset',
      message: 'Workflow reset to initial standby state.',
    });
  };
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [emergencyActive, setEmergencyActive] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lifevault_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lifevault_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('lifevault_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('lifevault_people', JSON.stringify(trustedPeople));
  }, [trustedPeople]);

  useEffect(() => {
    localStorage.setItem('lifevault_recovery', JSON.stringify(recoverySteps));
  }, [recoverySteps]);

  // Global Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast({
        type: 'info',
        title: `${next === 'dark' ? 'Dark' : 'Light'} Mode Activated`,
        message: `Switched aesthetic theme to ${next} mode.`,
      });
      return next;
    });
  };

  const showToast = (toast: Omit<ToastItem, 'id' | 'timestamp'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAuditLog = (log: Omit<SecurityAuditLog, 'id' | 'timestamp'>) => {
    const newLog: SecurityAuditLog = {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      timestamp: 'Just now',
      ...log,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addAsset = (assetData: Omit<AssetItem, 'id' | 'updatedAt'>) => {
    const newAsset: AssetItem = {
      ...assetData,
      id: 'ast-' + Date.now(),
      updatedAt: 'Just now',
    };
    setAssets((prev) => [newAsset, ...prev]);
    showToast({
      type: 'success',
      title: 'Asset Added & Encrypted',
      message: `${newAsset.name} secured with AES-256 GCM.`,
    });
    addAuditLog({
      event: `Asset Registered: ${newAsset.name} (${newAsset.category.toUpperCase()})`,
      severity: 'security',
      ipAddress: '49.205.142.88',
      location: 'Hyderabad, India',
      device: 'macOS Client',
      status: 'Encrypted',
    });
  };

  const updateAsset = (id: string, updated: Partial<AssetItem>) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated, updatedAt: 'Just now' } : a))
    );
    showToast({
      type: 'info',
      title: 'Asset Updated',
      message: `Modifications synchronized to encrypted vault.`,
    });
  };

  const deleteAsset = (id: string) => {
    const asset = assets.find((a) => a.id === id);
    setAssets((prev) => prev.filter((a) => a.id !== id));
    showToast({
      type: 'warning',
      title: 'Asset Removed',
      message: `${asset?.name || 'Item'} purged from active estate ledger.`,
    });
  };

  const addDocument = (docData: Omit<DocumentItem, 'id' | 'uploadDate' | 'sha256'>) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: 'doc-' + Date.now(),
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      sha256: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast({
      type: 'security',
      title: 'Document Verified by AI OCR',
      message: `${newDoc.title} classified with ${newDoc.ocrConfidence}% confidence.`,
    });
    addAuditLog({
      event: `Document Ingested & SHA-256 Sealed: ${newDoc.fileName}`,
      severity: 'security',
      ipAddress: '49.205.142.88',
      location: 'Hyderabad, India',
      device: 'macOS Client',
      status: 'Authorized',
    });
  };

  const deleteDocument = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast({
      type: 'warning',
      title: 'Document Shredded',
      message: `${doc?.title || 'Document'} permanently purged with zero trace.`,
    });
  };

  const addTrustedPerson = (personData: Omit<TrustedPerson, 'id' | 'lastActive'>) => {
    const newPerson: TrustedPerson = {
      ...personData,
      id: 'tp-' + Date.now(),
      lastActive: 'Invitation sent just now',
    };
    setTrustedPeople((prev) => [newPerson, ...prev]);
    showToast({
      type: 'success',
      title: 'Trustee Added to Multi-Sig',
      message: `Encrypted invitation sent to ${newPerson.email}.`,
    });
    addAuditLog({
      event: `Trustee Enrolled: ${newPerson.name} (${newPerson.role})`,
      severity: 'security',
      ipAddress: '49.205.142.88',
      location: 'Hyderabad, India',
      device: 'macOS Client',
      status: 'Authorized',
    });
  };

  const updateTrustedPerson = (id: string, updated: Partial<TrustedPerson>) => {
    setTrustedPeople((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast({
      type: 'security',
      title: 'Permissions Updated',
      message: `Access control matrix re-calculated.`,
    });
  };

  const deleteTrustedPerson = (id: string) => {
    const person = trustedPeople.find((p) => p.id === id);
    setTrustedPeople((prev) => prev.filter((p) => p.id !== id));
    showToast({
      type: 'warning',
      title: 'Trustee Revoked',
      message: `Access revoked for ${person?.name || 'Contact'}.`,
    });
  };

  const toggleRecoveryStep = (id: string) => {
    setRecoverySteps((prev) => {
      const next = prev.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      );
      const allDone = next.every((s) => s.completed);
      if (allDone) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        showToast({
          type: 'success',
          title: '🎉 100% Recovery Readiness Achieved!',
          message: 'All life continuity and claim checklists are fully completed.',
        });
      }
      return next;
    });
  };

  const triggerEmergency = (reason: string) => {
    setEmergencyActive(true);
    setUser((prev) => ({ ...prev, emergencyModeActive: true }));
    showToast({
      type: 'emergency',
      title: '🚨 EMERGENCY PROTOCOL ACTIVATED',
      message: `Reason: ${reason}. Multi-sig trustee notifications dispatched.`,
    });
    addAuditLog({
      event: `EMERGENCY TRIGGER INITIATED: ${reason}`,
      severity: 'emergency',
      ipAddress: '49.205.142.88',
      location: 'Hyderabad, India (SOS Trigger)',
      device: 'Web Client Emergency Sentinel',
      status: 'Flagged',
    });
  };

  const cancelEmergency = () => {
    setEmergencyActive(false);
    setUser((prev) => ({ ...prev, emergencyModeActive: false }));
    showToast({
      type: 'success',
      title: 'Emergency Mode Cancelled',
      message: 'Vault returned to standard encrypted state. Trustees notified of resolution.',
    });
    addAuditLog({
      event: 'Emergency Protocol De-escalated & Reset by Master Biometric',
      severity: 'security',
      ipAddress: '49.205.142.88',
      location: 'Hyderabad, India',
      device: 'Face ID Authenticated',
      status: 'Authorized',
    });
  };

  const sendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            assetsCount: assets.length,
            docsCount: documents.length,
            trustedCount: trustedPeople.length,
            totalValuation: assets.reduce((sum, a) => sum + (a.valuation || 0), 0),
          },
        }),
      });

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: data.text || 'I have analyzed your request across your digital life map.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'Show my insurance policies',
          'Which documents are missing?',
          'Who can access my property in emergency?',
        ],
      };
      setChatMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
      const fallbackReply: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: `### 🛡️ LIFEVAULT Continuity Sentinel\nI have securely processed your query regarding **"${text}"**.\n\n* **Assets Protected**: ₹${(totalNetWorth / 10000000).toFixed(2)} Cr across ${assets.length} portfolio items.\n* **Documents**: ${documents.length} verified zero-knowledge records.\n* **Next Recommended Step**: Ensure your Will document is marked with primary trustee access for seamless transfer.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Computed values
  const totalNetWorth = assets.reduce((sum, a) => sum + (a.valuation || 0), 0);
  const completedRecovery = recoverySteps.filter((s) => s.completed).length;
  const recoveryReadiness = recoverySteps.length > 0 ? Math.round((completedRecovery / recoverySteps.length) * 100) : 0;
  const verifiedDocs = documents.filter((d) => d.isVerified).length;
  const securityScore = Math.min(100, Math.round((verifiedDocs / (documents.length || 1)) * 40 + (user.biometricEnabled ? 30 : 0) + (user.mfaEnabled ? 20 : 0) + (trustedPeople.length >= 3 ? 10 : 5)));
  const activeAlertCount = (emergencyActive ? 1 : 0) + assets.filter((a) => a.status === 'review_needed').length;

  return (
    <VaultContext.Provider
      value={{
        currentView,
        setCurrentView,
        theme,
        toggleTheme,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        assets,
        addAsset,
        updateAsset,
        deleteAsset,
        documents,
        addDocument,
        deleteDocument,
        trustedPeople,
        addTrustedPerson,
        updateTrustedPerson,
        deleteTrustedPerson,
        recoverySteps,
        toggleRecoveryStep,
        auditLogs,
        addAuditLog,
        chatMessages,
        sendChatMessage,
        isAiLoading,
        emergencyActive,
        triggerEmergency,
        cancelEmergency,
        toasts,
        showToast,
        dismissToast,
        commandPaletteOpen,
        setCommandPaletteOpen,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        executors,
        activeExecutor,
        setActiveExecutor,
        transferTrackers,
        updateTransferTracker,
        recoveryTimelineTasks,
        toggleRecoveryTimelineTask,
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
        advanceVerificationPipeline,
        resetVerificationWorkflow,
        totalNetWorth,
        securityScore,
        recoveryReadiness,
        activeAlertCount,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};
