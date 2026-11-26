import { useState } from 'react';
import { Book, LoanRecord, ReadingProgress, ShelfTab } from '../types/library';
import { BookCover } from './BookCover';

interface MyShelfSectionProps {
  books: Book[];
  loans: Record<string, LoanRecord>;
  progressMap: Record<string, ReadingProgress>;
  favorites: string[];
  onReadBook: (book: Book, chapterIndex?: number) => void;
  onInspectBook: (book: Book) => void;
  onBorrowToggle: (book: Book) => void;
  onJumpToCatalog: () => void;
}

const TABS: { id: ShelfTab; label: string }[] = [
  { id: 'sedang', label: 'Sedang Dibaca' },
  { id: 'pinjaman', label: 'Pinjaman Aktif' },
  { id: 'favorit', label: 'Favorit' },
  { id: 'selesai', label: 'Selesai Dibaca' }
];

export function MyShelfSection({
  books,
  loans,
  progressMap,
  favorites,
  onReadBook,
  onInspectBook,
  onBorrowToggle,
  onJumpToCatalog
}: MyShelfSectionProps) {
  const [activeTab, setActiveTab] = useState<ShelfTab>('sedang');

  const booksByTab = {
    sedang: books.filter((b) => {
      const p = progressMap[b.id];
      return p && !p.completed;
    }),
    pinjaman: books.filter((b) => Boolean(loans[b.id])),
    favorit: books.filter((b) => favorites.includes(b.id)),
    selesai: books.filter((b) => Boolean(progressMap[b.id]?.completed))
  };

  const displayedBooks = booksByTab[activeTab];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="border-b border-stone-200 pb-8">
        <p className="font-mono text-xs tracking-[0.16em] text-[#57534E] uppercase">
          Ruang Baca Pribadi
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
          Rak Koleksi Saya
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#57534E]">
          Kelola buku yang sedang Anda baca, pantau masa pinjaman aktif berdurasi 14 hari, serta
          akses judul favorit dan daftar bacaan yang telah rampung.
        </p>

        {/* Tab Rak */}
        <div
          className="mt-8 flex items-center gap-1 overflow-x-auto"
          role="tablist"
          aria-label="Kategori rak pribadi"
        >
          {TABS.map((tab) => {
            const count = booksByTab[tab.id].length;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[40px] cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#1C1917] text-white'
                    : 'text-[#57534E] hover:bg-[#EBE6DF] hover:text-[#1C1917]'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {displayedBooks.length === 0 ? (
        <div className="mt-10 rounded-lg border border-stone-200 bg-[#F4F0E8]/60 px-6 py-16 text-center">
          <p className="font-serif text-xl font-medium text-[#1C1917]">
            Belum ada buku pada daftar ini.
          </p>
          <p className="mt-2 text-sm text-[#57534E]">
            Jelajahi katalog untuk mulai membaca, meminjam buku ke rak, atau menandai koleksi favorit Anda.
          </p>
          <button
            type="button"
            onClick={onJumpToCatalog}
            className="mt-6 min-h-[44px] cursor-pointer rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1E40AF]"
          >
            Buka Katalog Koleksi
          </button>
        </div>
      ) : (
        <div className="mt-8 divide-y divide-stone-200 border-b border-stone-200">
          {displayedBooks.map((book) => {
            const progress = progressMap[book.id];
            const loan = loans[book.id];
            const pct = progress
              ? progress.completed
                ? 100
                : Math.round(((progress.chapterIndex + 1) / Math.max(book.chapters.length, 1)) * 100)
              : 0;

            return (
              <article
                key={book.id}
                className="flex flex-col justify-between gap-6 py-6 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-5">
                  <button
                    type="button"
                    onClick={() => onInspectBook(book)}
                    className="w-20 shrink-0 cursor-pointer text-left"
                  >
                    <BookCover book={book} className="aspect-[3/4] w-full rounded-sm shadow-xs" />
                  </button>

                  <div>
                    <p className="text-xs text-[#57534E]">
                      {book.category} · {book.accessionNumber}
                    </p>
                    <h2 className="mt-1 font-serif text-xl font-semibold text-[#1C1917]">
                      <button
                        type="button"
                        onClick={() => onInspectBook(book)}
                        className="cursor-pointer text-left hover:text-[#1E3A8A]"
                      >
                        {book.title}
                      </button>
                    </h2>
                    <p className="mt-0.5 text-sm text-[#57534E]">{book.author}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#57534E]">
                      {progress && (
                        <span className="font-mono tabular-nums">
                          Progres: {pct}% (Bab {progress.chapterIndex + 1}/{book.chapters.length})
                        </span>
                      )}
                      {loan && (
                        <span className="font-medium text-[#1E3A8A]">
                          Jatuh tempo:{' '}
                          {new Date(loan.dueDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {loan && (
                    <button
                      type="button"
                      onClick={() => onBorrowToggle(book)}
                      className="min-h-[40px] cursor-pointer rounded-md border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:bg-[#F4F0E8] whitespace-nowrap shrink-0"
                    >
                      Kembalikan
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onReadBook(book, progress?.chapterIndex ?? 0)}
                    className="min-h-[40px] cursor-pointer rounded-md bg-[#1E3A8A] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF] whitespace-nowrap shrink-0"
                  >
                    {progress && !progress.completed ? 'Lanjutkan Baca' : 'Baca Buku'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
