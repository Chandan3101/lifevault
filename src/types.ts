export type AssetCategory =
  | 'bank'
  | 'bank_account'
  | 'property'
  | 'real_estate'
  | 'insurance'
  | 'investments'
  | 'demat'
  | 'vehicles'
  | 'vehicle'
  | 'gold'
  | 'loans'
  | 'crypto'
  | 'subscriptions';

export interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  institution: string;
  accountNumberMasked: string;
  accountNumber?: string;
  valuation: number; // in INR
  currency?: string;
  owner?: string;
  primaryBeneficiary: string;
  nominee?: string;
  nomineeContact?: string;
  accessInstructions?: string;
  contingentBeneficiary?: string;
  status: 'active' | 'review_needed' | 'verified' | 'claim_ready';
  linkedDocumentIds: string[];
  linkedDocsCount?: number;
  notes?: string;
  updatedAt?: string;
  lastUpdated?: string;
  growthRate?: number;
  monthlyFlow?: number;
  location?: string;
  maturityDate?: string;
  coverageAmount?: number;
}

export type Asset = AssetItem;

export type DocumentCategory =
  | 'identity'
  | 'property'
  | 'insurance'
  | 'financial'
  | 'legal'
  | 'medical'
  | 'certificates';

export interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  mimeType?: string;
  isVerified?: boolean;
  sha256?: string;
  sha256Hash?: string;
  tags?: string[];
  docNumberMasked?: string;
  issuer?: string;
  assignedTrustees?: string[];
  accessRestrictedTo?: string[];
  linkedAssetId?: string;
  ocrConfidence?: number;
  ocrProcessed?: boolean;
  ocrSummary?: string;
  extractedKeyData?: Array<{ key: string; value: string }>;
  summary?: string;
  encryptionAlgorithm?: string;
  encryptionType?: string;
  accessPermissions?: string[];
  previewUrl?: string;
}

export type VaultDocument = DocumentItem;

export type TrustedRole =
  | 'Spouse'
  | 'Child'
  | 'Parent'
  | 'Lawyer'
  | 'Lawyer / Legal Counsel'
  | 'CA'
  | 'Chartered Accountant'
  | 'Executor'
  | 'Guardian'
  | 'Trusted Friend'
  | 'Family Member';

export type TrusteeRole = TrustedRole;

export type AccessLevel =
  | 'Full Admin'
  | 'Full Access'
  | 'Financial & Property'
  | 'Legal & Estate'
  | 'Restricted'
  | 'Emergency Only'
  | 'Medical Only'
  | 'Posthumous Only';

export interface TrustedPerson {
  id: string;
  name: string;
  role: TrustedRole;
  email: string;
  phone: string;
  avatar: string;
  accessLevel: AccessLevel;
  permissions: {
    viewFinancials?: boolean;
    viewBanking?: boolean;
    viewProperty?: boolean;
    viewLegal?: boolean;
    viewLegalDocs?: boolean;
    viewMedical?: boolean;
    initiateEmergency: boolean;
    downloadMedicalDirectives?: boolean;
    manageSubscriptions?: boolean;
  };
  approvalStatus: 'Active' | 'Pending Invite' | 'Multisig Verified';
  lastActive?: string;
  assignedShards?: string;
  hasShard?: boolean;
}

export interface RecoveryStep {
  id: string;
  phase?: number;
  phaseTitle?: string;
  title: string;
  description: string;
  category: 'immediate' | 'financial' | 'legal' | 'digital';
  assignedTo: string;
  responsibleParty?: string;
  completed: boolean;
  priority: 'Critical' | 'High' | 'Medium' | 'critical' | 'high' | 'medium';
  estimatedTime?: string;
  estimatedHours?: string;
  actionableDocs?: string[];
  contactNumber?: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  event: string;
  severity: 'info' | 'security' | 'warning' | 'emergency';
  ipAddress?: string;
  location: string;
  device?: string;
  status: 'Authorized' | 'MFA Verified' | 'Flagged' | 'Encrypted' | string;
  requesterName?: string;
  verificationMethod?: string;
  verificationHash?: string;
  riskScore?: number;
  unlockedStage?: string;
}

export type ExecutorRoleType = 'primary_executor' | 'backup_executor' | 'read_only_trustee';

export interface ExecutorProfile {
  id: string;
  name: string;
  role: string;
  executorType: ExecutorRoleType;
  relationship: string;
  phone: string;
  email: string;
  avatar: string;
  idDocType: 'Aadhaar' | 'Passport' | 'Voter ID';
  idDocNumberMasked: string;
  isShamirHolder: boolean;
  shardIndex?: number;
  priorityOrder: number;
}

export type EmergencyEventType = 'death' | 'hospitalization' | 'missing_person';

export interface IdentityVerificationState {
  idType: 'Aadhaar' | 'Passport';
  idNumber: string;
  idDocumentUploaded: boolean;
  idDocumentName?: string;
  selfieVerified: boolean;
  selfieLivenessScore: number;
  otpVerified: boolean;
  otpCode: string;
  verifiedAt?: string;
  status: 'pending' | 'in_progress' | 'verified' | 'failed';
}

export interface RelationshipVerificationState {
  proofType: 'marriage_certificate' | 'birth_certificate' | 'power_of_attorney' | 'court_order';
  documentUploaded: boolean;
  documentName?: string;
  confidenceScore: number;
  ocrMatchDetails: {
    applicantName: string;
    vaultOwnerName: string;
    registryAuthority: string;
    issueDate: string;
  };
  verifiedAt?: string;
  status: 'pending' | 'in_progress' | 'verified' | 'failed';
}

export interface EmergencyEventVerificationState {
  eventType: EmergencyEventType;
  deathDetails?: {
    certificateUploaded: boolean;
    certificateFileName?: string;
    registrationNumber: string;
    issuingAuthority: string;
    dateOfDemise: string;
    placeOfDemise: string;
    nameMatched: boolean;
    dobMatched: boolean;
    crsGovApiValidated: boolean;
    qrHashValid: boolean;
  };
  hospitalizationDetails?: {
    admissionLetterUploaded: boolean;
    admissionDocName?: string;
    hospitalName: string;
    attendingPhysician: string;
    physicianRegNumber: string;
    ownerOtpRequested: boolean;
    ownerOtpConfirmed?: boolean;
    icuStatus: boolean;
  };
  missingDetails?: {
    firUploaded: boolean;
    firDocName?: string;
    firNumber: string;
    policeStation: string;
    investigatingOfficer: string;
    reportedDate: string;
    waitingPeriodHoursRemaining: number;
    waitingPeriodTotalHours: number;
  };
  verifiedAt?: string;
  status: 'pending' | 'in_progress' | 'verified' | 'failed';
}

export interface SentinelRiskAnalysisState {
  riskScore: number; // 0 to 100 (lower is safer)
  riskLevel: 'low' | 'medium' | 'high';
  deviceStatus: 'trusted' | 'recognized' | 'new_device' | 'suspicious';
  deviceFingerprint: string;
  ipAddress: string;
  ipLocation: string;
  isp: string;
  vpnOrProxyDetected: boolean;
  failedAttemptsCount: number;
  documentMatchPercentage: number;
  behavioralAnomalyScore: number;
  actionRequired?: string;
  evaluatedAt?: string;
}

export type ProgressiveAccessStage = 'stage1_immediate' | 'stage2_verified_family' | 'stage3_legal_completion';

export interface TransferProcessTracker {
  id: string;
  category: 'insurance' | 'bank' | 'property' | 'investments';
  assetName: string;
  institution: string;
  accountOrPolicyMasked: string;
  nominee: string;
  valuation: number;
  requiredDocuments: string[];
  officialFormName: string;
  claimPortalUrl?: string;
  customerCareContact: string;
  status: 'not_started' | 'documents_prepared' | 'claim_submitted' | 'under_review' | 'settlement_scheduled' | 'completed';
  currentStageNumber: number; // 1 to 5
  stages: Array<{ name: string; date?: string; completed: boolean }>;
  notes: string;
}

export interface RecoveryTimelineTask {
  id: string;
  day: number; // 1, 2, or 3
  timeframe: string;
  title: string;
  description: string;
  category: 'immediate' | 'financial' | 'legal' | 'digital';
  assignedExecutor: string;
  completed: boolean;
  requiredForms?: string[];
  contactPerson?: string;
  contactNumber?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface LifeMapNode {
  id: string;
  label: string;
  category: 'root' | 'category' | 'asset' | 'person' | 'doc';
  value?: number;
  status?: string;
  icon?: string;
  parentId?: string;
  details?: {
    institution?: string;
    beneficiary?: string;
    valuationText?: string;
    verified?: boolean;
    description?: string;
  };
}

export interface LifeMapEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  dashed?: boolean;
}

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'lifemap'
  | 'assets'
  | 'documents'
  | 'trusted-people'
  | 'recovery-guide'
  | 'ai-assistant'
  | 'emergency'
  | 'security'
  | 'settings';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  emergencyContactPhone?: string;
  tier: string;
  avatar: string;
  joinedDate?: string;
  emergencyTriggerDelayHours?: number;
  biometricEnabled?: boolean;
  mfaEnabled?: boolean;
  zeroKnowledgeKeyBackup?: boolean;
  emergencyModeActive?: boolean;
  emergencyCountdownMinutes?: number;
}
