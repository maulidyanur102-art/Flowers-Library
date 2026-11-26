import { useEffect, useMemo, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AddBookModal } from './components/AddBookModal';
import { BookDetailModal } from './components/BookDetailModal';
import { CatalogSection } from './components/CatalogSection';
import { EbookReader } from './components/EbookReader';
import { HeroShowcase } from './components/HeroShowcase';
import { MyShelfSection } from './components/MyShelfSection';
import { NotesSection } from './components/NotesSection';
import { TopBar } from './components/TopBar';
import { INITIAL_BOOKS } from './data/books';
import {
  ActiveView,
  Book,
  Bookmark,
  LoanRecord,
  ReaderSettings,
  ReadingNote,
  ReadingProgress
} from './types/library';

const STORAGE_KEYS = {
  userBooks: 'pustaka_aksara_user_books_v1',
  loans: 'pustaka_aksara_loans_v1',
  progress: 'pustaka_aksara_progress_v1',
  notes: 'pustaka_aksara_notes_v1',
  bookmarks: 'pustaka_aksara_bookmarks_v1',
  favorites: 'pustaka_aksara_favorites_v1',
  settings: 'pustaka_aksara_reader_settings_v1'
};

const DEFAULT_SETTINGS: ReaderSettings = {
  theme: 'paper',
  fontFamily: 'serif',
  fontSize: 'md',
  lineHeight: 'comfortable'
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('katalog');
  const [userBooks, setUserBooks] = useState<Book[]>(() =>
    loadFromStorage<Book[]>(STORAGE_KEYS.userBooks, [])
  );
  const [loans, setLoans] = useState<Record<string, LoanRecord>>(() =>
    loadFromStorage<Record<string, LoanRecord>>(STORAGE_KEYS.loans, {})
  );
  const [progressMap, setProgressMap] = useState<Record<string, ReadingProgress>>(() =>
    loadFromStorage<Record<string, ReadingProgress>>(STORAGE_KEYS.progress, {})
  );
  const [notes, setNotes] = useState<ReadingNote[]>(() =>
    loadFromStorage<ReadingNote[]>(STORAGE_KEYS.notes, [])
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    loadFromStorage<Bookmark[]>(STORAGE_KEYS.bookmarks, [])
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    loadFromStorage<string[]>(STORAGE_KEYS.favorites, ['arsitektur-cahaya-tropis'])
  );
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() =>
    loadFromStorage<ReaderSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );

  const [inspectedBook, setInspectedBook] = useState<Book | null>(null);
  const [readerTarget, setReaderTarget] = useState<{ book: Book; chapterIndex: number } | null>(
    null
  );
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.userBooks, JSON.stringify(userBooks));
  }, [userBooks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.loans, JSON.stringify(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progressMap));
  }, [progressMap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(readerSettings));
  }, [readerSettings]);

  const allBooks = useMemo(() => [...userBooks, ...INITIAL_BOOKS], [userBooks]);

  const featuredBook = useMemo(
    () => allBooks.find((b) => b.featured) ?? allBooks[0],
    [allBooks]
  );

  const stats = useMemo(() => {
    const pagesRead = Object.values(progressMap).reduce((sum, p) => {
      const book = allBooks.find((b) => b.id === p.bookId);
      if (!book) return sum;
      if (p.completed) return sum + book.pages;
      const ratio = (p.chapterIndex + 1) / Math.max(book.chapters.length, 1);
      return sum + Math.round(book.pages * ratio);
    }, 0);

    return {
      totalBooks: allBooks.length,
      borrowedCount: Object.keys(loans).length,
      pagesRead,
      notesCount: notes.length + bookmarks.length
    };
  }, [allBooks, loans, progressMap, notes.length, bookmarks.length]);

  const handleOpenReader = (book: Book, chapterIndex?: number) => {
    const saved = progressMap[book.id];
    const targetIdx = chapterIndex ?? saved?.chapterIndex ?? 0;
    setInspectedBook(null);
    setReaderTarget({ book, chapterIndex: targetIdx });
    setProgressMap((prev) => ({
      ...prev,
      [book.id]: {
        bookId: book.id,
        chapterIndex: targetIdx,
        completed: prev[book.id]?.completed ?? false,
        lastReadAt: new Date().toISOString()
      }
    }));
  };

  const handleBorrowToggle = (book: Book) => {
    setLoans((prev) => {
      const next = { ...prev };
      if (next[book.id]) {
        delete next[book.id];
      } else {
        const now = new Date();
        const due = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        next[book.id] = {
          bookId: book.id,
          borrowedAt: now.toISOString(),
          dueDate: due.toISOString()
        };
      }
      return next;
    });
  };

  const handleFavoriteToggle = (bookId: string) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleAddBook = (newBook: Book) => {
    setUserBooks((prev) => [newBook, ...prev]);
    setActiveView('katalog');
  };

  const handleDeleteUserBook = (bookId: string) => {
    setUserBooks((prev) => prev.filter((b) => b.id !== bookId));
    setLoans((prev) => {
      const next = { ...prev };
      delete next[bookId];
      return next;
    });
    setFavorites((prev) => prev.filter((id) => id !== bookId));
  };

  const handleChapterChange = (bookId: string, chapterIndex: number) => {
    setProgressMap((prev) => ({
      ...prev,
      [bookId]: {
        bookId,
        chapterIndex,
        completed: prev[bookId]?.completed ?? false,
        lastReadAt: new Date().toISOString()
      }
    }));
  };

  const handleToggleComplete = (bookId: string, completed: boolean) => {
    const book = allBooks.find((b) => b.id === bookId);
    const lastIdx = Math.max((book?.chapters.length ?? 1) - 1, 0);
    setProgressMap((prev) => ({
      ...prev,
      [bookId]: {
        bookId,
        chapterIndex: prev[bookId]?.chapterIndex ?? lastIdx,
        completed,
        lastReadAt: new Date().toISOString()
      }
    }));
  };

  const handleToggleBookmark = (bookId: string, chapterIndex: number, chapterTitle: string) => {
    setBookmarks((prev) => {
      const existing = prev.find(
        (b) => b.bookId === bookId && b.chapterIndex === chapterIndex
      );
      if (existing) {
        return prev.filter((b) => b.id !== existing.id);
      }
      return [
        {
          id: `bm-${Date.now()}`,
          bookId,
          chapterIndex,
          chapterTitle,
          createdAt: new Date().toISOString()
        },
        ...prev
      ];
    });
  };

  const handleAddNote = (
    bookId: string,
    chapterIndex: number,
    chapterTitle: string,
    content: string,
    quote?: string
  ) => {
    setNotes((prev) => [
      {
        id: `note-${Date.now()}`,
        bookId,
        chapterIndex,
        chapterTitle,
        quote,
        content,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const handleRemoveBookmark = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
  };

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#1C1917]">
      <TopBar
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenAddModal={() => setAddModalOpen(true)}
      />

      <main className="flex-1">
        {activeView === 'katalog' && (
          <>
            <HeroShowcase
              featuredBook={featuredBook}
              isBorrowed={Boolean(loans[featuredBook.id])}
              stats={stats}
              onReadBook={(book) => handleOpenReader(book)}
              onBorrowToggle={handleBorrowToggle}
              onInspectBook={(book) => setInspectedBook(book)}
              onJumpToShelf={() => handleNavigate('rak')}
              onJumpToNotes={() => handleNavigate('catatan')}
            />

            <CatalogSection
              books={allBooks}
              loans={loans}
              progressMap={progressMap}
              favorites={favorites}
              onInspectBook={(book) => setInspectedBook(book)}
              onReadBook={(book) => handleOpenReader(book)}
            />
          </>
        )}

        {activeView === 'rak' && (
          <MyShelfSection
            books={allBooks}
            loans={loans}
            progressMap={progressMap}
            favorites={favorites}
            onReadBook={handleOpenReader}
            onInspectBook={(book) => setInspectedBook(book)}
            onBorrowToggle={handleBorrowToggle}
            onJumpToCatalog={() => handleNavigate('katalog')}
          />
        )}

        {activeView === 'catatan' && (
          <NotesSection
            books={allBooks}
            notes={notes}
            bookmarks={bookmarks}
            onOpenReaderAt={handleOpenReader}
            onDeleteNote={handleDeleteNote}
            onRemoveBookmark={handleRemoveBookmark}
          />
        )}

        {activeView === 'tentang' && (
          <AboutSection onJumpToCatalog={() => handleNavigate('katalog')} />
        )}
      </main>

      <footer className="border-t border-stone-200 bg-[#F4F0E8]/50">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-xs text-[#57534E] sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm font-semibold text-[#1C1917]">
              Pustaka Aksara
            </span>
            <span aria-hidden="true">·</span>
            <span>Perpustakaan Digital & Ruang Baca Terbuka</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleNavigate('katalog')}
              className="cursor-pointer hover:text-[#1C1917]"
            >
              Katalog
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('rak')}
              className="cursor-pointer hover:text-[#1C1917]"
            >
              Rak Saya
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('catatan')}
              className="cursor-pointer hover:text-[#1C1917]"
            >
              Catatan
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('tentang')}
              className="cursor-pointer hover:text-[#1C1917]"
            >
              Tentang
            </button>
          </div>
        </div>
      </footer>

      <BookDetailModal
        book={inspectedBook}
        loan={inspectedBook ? loans[inspectedBook.id] : undefined}
        progress={inspectedBook ? progressMap[inspectedBook.id] : undefined}
        isFavorite={inspectedBook ? favorites.includes(inspectedBook.id) : false}
        onClose={() => setInspectedBook(null)}
        onReadBook={handleOpenReader}
        onBorrowToggle={handleBorrowToggle}
        onFavoriteToggle={handleFavoriteToggle}
        onDeleteBook={handleDeleteUserBook}
      />

      {readerTarget && (
        <EbookReader
          book={readerTarget.book}
          initialChapterIndex={readerTarget.chapterIndex}
          isCompleted={Boolean(progressMap[readerTarget.book.id]?.completed)}
          bookmarks={bookmarks}
          notes={notes}
          settings={readerSettings}
          onUpdateSettings={setReaderSettings}
          onChapterChange={(idx) => handleChapterChange(readerTarget.book.id, idx)}
          onToggleComplete={(done) => handleToggleComplete(readerTarget.book.id, done)}
          onToggleBookmark={(idx, title) =>
            handleToggleBookmark(readerTarget.book.id, idx, title)
          }
          onAddNote={(idx, title, content, quote) =>
            handleAddNote(readerTarget.book.id, idx, title, content, quote)
          }
          onDeleteNote={handleDeleteNote}
          onClose={() => setReaderTarget(null)}
        />
      )}

      <AddBookModal
        isOpen={addModalOpen}
        existingCount={allBooks.length}
        onClose={() => setAddModalOpen(false)}
        onAddBook={handleAddBook}
      />
    </div>
  );
}
