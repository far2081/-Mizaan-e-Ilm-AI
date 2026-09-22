export type IslamicTradition = 'deobandi' | 'barelvi' | 'ahle_hadith' | 'shia' | 'primary_sources' | 'all';

export interface IslamicSourceRecord {
  id: string;
  bookTitle: string;
  bookTitleUrdu: string;
  author: string;
  authorUrdu: string;
  tradition: 'deobandi' | 'barelvi' | 'ahle_hadith' | 'shia' | 'quran' | 'hadith' | 'classical_fiqh';
  traditionNameUrdu: string;
  originalLanguage: string;
  publisher: string;
  edition: string;
  volume?: number | string;
  page?: number | string;
  chapterUrdu?: string;
  sectionUrdu?: string;
  hadithNumber?: number | string;
  surahNumber?: number;
  ayahNumber?: number;
  digitalSourceId: string;
  verificationStatus: 'verified' | 'pending_review' | 'flagged';
  verifiedBy: string;
  verificationDate: string;
  sourceUrl?: string;
  originalArabicText?: string;
  originalUrduText: string;
  keywords: string[];
  topicCategory: 'taharah' | 'salah' | 'zakah' | 'sawm' | 'hajj' | 'nikah_talaq' | 'buyu_finance' | 'inheritance' | 'aqeedah' | 'contemporary' | 'bioethics' | 'general';
  topicCategoryUrdu: string;
  isHighRisk?: boolean;
}

export interface HadithGrading {
  scholar: string;
  grading: 'Sahih' | 'Hasan' | 'Daif' | 'Mawdu';
  notesUrdu?: string;
}

export interface VerseReference {
  surah: number;
  surahNameUrdu: string;
  ayah: number;
  arabicText: string;
  translations: {
    translator: string;
    urduText: string;
  }[];
  tafsirReference?: string;
  asbabAlNuzul?: string;
}

export interface HadithReference {
  collection: string;
  collectionUrdu: string;
  book: string;
  chapter: string;
  hadithNumber: string | number;
  arabicText: string;
  urduTranslation: string;
  translator: string;
  gradings: HadithGrading[];
  edition: string;
}

export interface TraditionPosition {
  tradition: 'deobandi' | 'barelvi' | 'ahle_hadith' | 'shia';
  traditionNameUrdu: string;
  positionSummaryUrdu: string;
  originalSourcePassages: {
    bookTitleUrdu: string;
    authorUrdu: string;
    volume?: string | number;
    page?: string | number;
    chapterUrdu?: string;
    publisher?: string;
    edition?: string;
    originalQuoteUrdu: string;
    originalArabicQuote?: string;
    digitalSourceId: string;
  }[];
  aiExplanationUrdu: string;
  rulingLabelUrdu: string;
}

export interface FatwaQueryResponse {
  queryId: string;
  timestamp: string;
  userQuestion: string;
  topicCategory: string;
  topicCategoryUrdu: string;
  isHighRisk: boolean;
  requiresScholarReview: boolean;
  status: 'source_verified' | 'unverified_refused' | 'pending_review' | 'conflict_detected';
  refusalMessageUrdu?: string;
  
  // Pipeline Stage Results
  pipelineTrace: {
    stage: string;
    status: 'success' | 'warning' | 'error';
    detailsUrdu: string;
  }[];

  // Standard Output Format
  bismillah: string;
  salam: string;
  shortAnswerUrdu: string;
  hasDisagreement: boolean;
  disagreementReasonUrdu?: string;
  
  quranicEvidence: VerseReference[];
  hadithEvidence: HadithReference[];
  
  traditionPositions: TraditionPosition[];
  
  fullCitations: {
    book: string;
    author: string;
    tradition: string;
    volume?: string | number;
    page?: string | number;
    chapter?: string;
    publisher?: string;
    edition?: string;
    digitalId: string;
    verificationDate: string;
  }[];
  
  auditId: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  userQuestion: string;
  topic: string;
  sourcesRetrievedCount: number;
  sourcesUsed: {
    book: string;
    tradition: string;
    volumePage: string;
    digitalId: string;
  }[];
  validationResult: 'PASSED' | 'REFUSED_NO_SOURCE' | 'FLAGGED_HIGH_RISK';
  modelExplanationUsed: boolean;
  reviewerDecision?: 'PENDING' | 'APPROVED' | 'MODIFIED' | 'REJECTED';
  reviewerName?: string;
  reviewerNotes?: string;
}
