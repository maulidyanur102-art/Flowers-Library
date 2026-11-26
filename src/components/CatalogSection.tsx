import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Book, BookCategory, LoanRecord, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface CatalogSectionProps {
  books: Book[];
  loans: Record<string, LoanRecord>;
  progressMap: Record<string, ReadingProgress>;
  favorites: string[];
  onInspectBook: (book: Book) => void;
  onReadBook: (book: Book) => void;
}

const CATEGORIES: ('Semua' | BookCategory)[] = [
  'Semua',
  'Arsitektur',
  'Sejarah',
  'Filsafat',
  'Sains',
  'Teknologi',
  'Sastra'
];

type SortOption = 'terbaru' | 'judul' | 'populer';
type AvailabilityFilter = 'semua' | 'tersedia' | 'dipinjam';

export function CatalogSection({
  books,
  loans,
  progressMap,
  onInspectBook,
  onReadBook
}: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | BookCategory>('Semua');
  const [availability, setAvailability] = useState<AvailabilityFilter>('semua');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return books
      .filter((book) => {
        if (selectedCategory !== 'Semua' && book.category !== selectedCategory) {
          return false;
        }
        const isBorrowed = Boolean(loans[book.id]);
        if (availability === 'tersedia' && isBorrowed) return false;
        if (availability === 'dipinjam' && !isBorrowed) return false;

        if (!q) return true;
        return (
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q) ||
          book.isbn.toLowerCase().includes(q) ||
          book.synopsis.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'judul') return a.title.localeCompare(b.title, 'id');
        if (sortBy === 'populer') return b.readCount - a.readCount;
        return b.year - a.year;
      });
  }, [books, loans, searchQuery, selectedCategory, availability, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setAvailability('semua');
    setSortBy('terbaru');
  };

  const hasActiveFilter =
    searchQuery.trim() !== '' || selectedCategory !== 'Semua' || availability !== 'semua';

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917]">
            Katalog Koleksi
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#57534E]">
            Telusuri arsip monografi, risalah ilmiah, dan karya sastra pilihan. Setiap judul
            dapat dibaca langsung maupun dipinjam ke rak pribadi selama 14 hari.
          </p>
        </div>

        {/* Kolom Pencarian */}
        <div className="relative w-full md:w-80">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#78716C]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, penulis, atau ISBN..."
            aria-label="Cari buku dalam katalog"
            className="h-11 w-full rounded-md border border-stone-300 bg-white pr-9 pl-10 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#1E3A8A] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer p-1 text-[#78716C] hover:text-[#1C1917]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bilah Filter & Pengurutan */}
      <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div
          className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0"
          role="tablist"
          aria-label="Filter kategori buku"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[38px] cursor-pointer rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  active
                    ? 'bg-[#1C1917] text-white'
                    : 'bg-transparent text-[#57534E] hover:bg-[#EBE6DF] hover:text-[#1C1917]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 rounded-md border border-stone-200 bg-[#F4F0E8] p-1">
            {(
              [
                { id: 'semua', label: 'Semua' },
                { id: 'tersedia', label: 'Tersedia' },
                { id: 'dipinjam', label: 'Dipinjam' }
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAvailability(opt.id)}
                className={`cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  availability === opt.id
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-[#57534E]">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Urutkan berdasarkan</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-9 cursor-pointer rounded-md border border-stone-300 bg-white px-2.5 text-xs font-medium text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            >
              <option value="terbaru">Terbitan Terbaru</option>
              <option value="judul">Judul A–Z</option>
              <option value="populer">Paling Sering Dibaca</option>
            </select>
          </label>
        </div>
      </div>

      {/* Ringkasan Hasil */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#57534E]">
        <span className="tabular-nums">
          Menampilkan {filteredBooks.length} dari {books.length} judul koleksi
        </span>
        {hasActiveFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="cursor-pointer font-medium text-[#1E3A8A] underline underline-offset-4 hover:text-[#1E40AF]"
          >
            Atur ulang filter
          </button>
        )}
      </div>

      {/* Grid Buku */}
      {filteredBooks.length === 0 ? (
        <div className="mt-10 rounded-lg border border-stone-200 bg-[#F4F0E8]/60 px-6 py-16 text-center">
          <p className="font-serif text-xl font-medium text-[#1C1917]">
            Tidak ada buku yang cocok dengan pencarian Anda.
          </p>
          <p className="mt-2 text-sm text-[#57534E]">
            Coba gunakan kata kunci judul atau nama penulis yang lebih umum, atau bersihkan filter kategori.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 min-h-[42px] cursor-pointer rounded-md bg-[#1E3A8A] px-5 py-2 text-sm font-medium text-white hover:bg-[#1E40AF]"
          >
            Tampilkan Semua Koleksi
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-7 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => {
            const isBorrowed = Boolean(loans[book.id]);
            const progress = progressMap[book.id];
            const totalChapters = book.chapters.length;
            const pct = progress
              ? progress.completed
                ? 100
                : Math.round(((progress.chapterIndex + 1) / Math.max(totalChapters, 1)) * 100)
              : 0;

            return (
              <article key={book.id} className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => onInspectBook(book)}
                  className="relative block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
                >
                  <BookCover
                    book={book}
                    className="aspect-[3/4] w-full rounded-sm shadow-sm transition-shadow duration-200 group-hover:shadow-md"
                  />
                </button>

                <div className="mt-4 flex flex-1 flex-col">
                  {/* Metadata tanpa kapsul/pil */}
                  <div className="flex items-center gap-2 text-xs text-[#57534E]">
                    <span>{book.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{book.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{book.pages} hlm</span>
                  </div>

                  <h3 className="mt-1.5 font-serif text-lg leading-snug font-semibold text-[#1C1917]">
                    <button
                      type="button"
                      onClick={() => onInspectBook(book)}
                      className="cursor-pointer text-left transition-colors hover:text-[#1E3A8A]"
                    >
                      {book.title}
                    </button>
                  </h3>

                  <p className="mt-1 text-sm text-[#57534E]">{book.author}</p>

                  {/* Status pinjaman atau progres baca sebagai teks tenang */}
                  <div className="mt-3 flex items-center justify-between border-t border-stone-200/80 pt-3 text-xs">
                    <span
                      className={
                        isBorrowed ? 'font-medium text-[#1E3A8A]' : 'text-[#57534E]'
                      }
                    >
                      {isBorrowed
                        ? 'Sedang Anda Pinjam'
                        : pct > 0
                        ? `Dibaca ${pct}%`
                        : 'Tersedia untuk Dibaca'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onReadBook(book)}
                      className="cursor-pointer font-medium text-[#1C1917] underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#1E3A8A] hover:decoration-[#1E3A8A] whitespace-nowrap shrink-0"
                    >
                      {pct > 0 && pct < 100 ? 'Lanjutkan' : 'Baca'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
