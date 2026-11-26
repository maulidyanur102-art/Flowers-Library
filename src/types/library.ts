export type BookCategory =
  | 'Arsitektur'
  | 'Sejarah'
  | 'Filsafat'
  | 'Sains'
  | 'Teknologi'
  | 'Sastra';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pullQuote?: string;
  paragraphs: string[];
}

export interface Book {
  id: string;
  accessionNumber: string;
  title: string;
  subtitle: string;
  author: string;
  authorMeta: string;
  category: BookCategory;
  year: number;
  publisher: string;
  isbn: string;
  language: string;
  pages: number;
  readCount: number;
  coverImage?: string;
  coverTone: 'lapis' | 'forest' | 'charcoal' | 'stone' | 'umber';
  featured?: boolean;
  isUserAdded?: boolean;
  synopsis: string;
  chapters: Chapter[];
}

export interface ReadingProgress {
  bookId: string;
  chapterIndex: number;
  completed: boolean;
  lastReadAt: string;
}

export interface LoanRecord {
  bookId: string;
  borrowedAt: string;
  dueDate: string;
}

export interface ReadingNote {
  id: string;
  bookId: string;
  chapterIndex: number;
  chapterTitle: string;
  quote?: string;
  content: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  chapterIndex: number;
  chapterTitle: string;
  createdAt: string;
}

export interface ReaderSettings {
  theme: 'paper' | 'alabaster' | 'night';
  fontFamily: 'serif' | 'sans';
  fontSize: 'sm' | 'md' | 'lg';
  lineHeight: 'compact' | 'comfortable' | 'airy';
}

export type ActiveView = 'katalog' | 'rak' | 'catatan' | 'tentang';
export type ShelfTab = 'sedang' | 'pinjaman' | 'favorit' | 'selesai';
