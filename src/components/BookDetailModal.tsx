import { useEffect } from 'react';
import { Bookmark as BookmarkIcon, BookOpen, Heart, Trash2, X } from 'lucide-react';
import { Book, LoanRecord, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  loan?: LoanRecord;
  progress?: ReadingProgress;
  isFavorite: boolean;
  onClose: () => void;
  onReadBook: (book: Book, chapterIndex?: number) => void;
  onBorrowToggle: (book: Book) => void;
  onFavoriteToggle: (bookId: string) => void;
  onDeleteBook?: (bookId: string) => void;
}

export function BookDetailModal({
  book,
  loan,
  progress,
  isFavorite,
  onClose,
  onReadBook,
  onBorrowToggle,
  onFavoriteToggle,
  onDeleteBook
}: BookDetailModalProps) {
  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const formattedDue = loan
    ? new Date(loan.dueDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-book-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-stone-200 bg-[#FBF9F5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-[#FBF9F5]/95 px-6 py-4 backdrop-blur-xs">
          <p className="font-mono text-xs tracking-[0.14em] text-[#57534E] uppercase">
            Rincian Katalog · {book.accessionNumber}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup rincian buku"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#57534E] transition-colors hover:bg-stone-200/70 hover:text-[#1C1917]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12">
          {/* Kolom Sampul */}
          <div className="lg:col-span-4">
            <div className="rounded-md bg-[#EBE6DF] p-5">
              <BookCover
                book={book}
                className="mx-auto aspect-[3/4] w-full max-w-[240px] rounded-sm shadow-md"
              />
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onReadBook(book, progress?.chapterIndex ?? 0)}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1E40AF]"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>
                  {progress && !progress.completed
                    ? `Lanjutkan Bab ${progress.chapterIndex + 1}`
                    : 'Baca Buku Sekarang'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onBorrowToggle(book)}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-[#1C1917] transition-colors hover:bg-[#F4F0E8]"
              >
                <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
                <span>{loan ? 'Kembalikan Pinjaman' : 'Pinjam ke Rak (14 Hari)'}</span>
              </button>

              <button
                type="button"
                onClick={() => onFavoriteToggle(book.id)}
                className={`flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                  isFavorite
                    ? 'border-[#1E3A8A]/30 bg-[#1E3A8A]/5 text-[#1E3A8A]'
                    : 'border-stone-200 bg-transparent text-[#57534E] hover:bg-[#F4F0E8] hover:text-[#1C1917]'
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? 'fill-[#1E3A8A]' : ''}`}
                  aria-hidden="true"
                />
                <span>{isFavorite ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}</span>
              </button>

              {book.isUserAdded && onDeleteBook && (
                <button
                  type="button"
                  onClick={() => {
                    onDeleteBook(book.id);
                    onClose();
                  }}
                  className="mt-1 flex min-h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Hapus Buku Tambahan</span>
                </button>
              )}
            </div>
          </div>

          {/* Kolom Informasi & Metadata */}
          <div className="lg:col-span-8">
            <p className="text-xs font-medium tracking-wider text-[#57534E] uppercase">
              {book.category} · {book.language}
            </p>
            <h2
              id="detail-book-title"
              className="mt-2 font-serif text-3xl leading-tight font-semibold text-[#1C1917]"
            >
              {book.title}
            </h2>
            <p className="mt-2 font-serif text-base text-[#57534E] italic">{book.subtitle}</p>

            {formattedDue && (
              <div className="mt-4 border-y border-[#1E3A8A]/20 bg-[#1E3A8A]/5 px-4 py-2.5 text-xs text-[#1E3A8A]">
                Buku ini sedang berada di rak pinjaman Anda. Batas pengembalian:{' '}
                <strong className="font-semibold">{formattedDue}</strong>.
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-xs font-semibold tracking-wider text-[#57534E] uppercase">
                Sinopsis Kuratorial
              </h3>
              <p className="mt-2.5 text-sm leading-[1.75] text-[#44403C]">{book.synopsis}</p>
            </div>

            {/* Tabel Metadata Aksesi */}
            <div className="mt-8 border-t border-stone-200 pt-6">
              <h3 className="text-xs font-semibold tracking-wider text-[#57534E] uppercase">
                Data Bibliografi
              </h3>
              <dl className="mt-3 divide-y divide-stone-200/80 border-y border-stone-200/80 text-sm">
                <div className="grid grid-cols-3 gap-4 py-2.5">
                  <dt className="text-[#57534E]">Penulis</dt>
                  <dd className="col-span-2 font-medium text-[#1C1917]">
                    {book.author}
                    {book.authorMeta && (
                      <span className="mt-0.5 block text-xs font-normal text-[#57534E]">
                        {book.authorMeta}
                      </span>
                    )}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2.5">
                  <dt className="text-[#57534E]">Penerbit</dt>
                  <dd className="col-span-2 text-[#1C1917]">{book.publisher}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2.5">
                  <dt className="text-[#57534E]">Tahun Terbit</dt>
                  <dd className="col-span-2 font-mono tabular-nums text-[#1C1917]">{book.year}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2.5">
                  <dt className="text-[#57534E]">ISBN</dt>
                  <dd className="col-span-2 font-mono tabular-nums text-[#1C1917]">{book.isbn}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-2.5">
                  <dt className="text-[#57534E]">Tebal & Pembaca</dt>
                  <dd className="col-span-2 font-mono tabular-nums text-[#1C1917]">
                    {book.pages} Halaman · {book.readCount.toLocaleString('id-ID')} Kali Dibaca
                  </dd>
                </div>
              </dl>
            </div>

            {/* Daftar Isi Interaktif */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold tracking-wider text-[#57534E] uppercase">
                Daftar Isi ({book.chapters.length} Bab)
              </h3>
              <ol className="mt-3 divide-y divide-stone-200/80 border-y border-stone-200/80">
                {book.chapters.map((chapter, idx) => (
                  <li key={chapter.id}>
                    <button
                      type="button"
                      onClick={() => onReadBook(book, idx)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-left text-sm transition-colors hover:bg-[#F4F0E8]/70 hover:px-2"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-[#78716C] tabular-nums">
                          {String(chapter.number).padStart(2, '0')}
                        </span>
                        <span className="font-medium text-[#1C1917]">{chapter.title}</span>
                      </span>
                      <span className="text-xs font-medium text-[#1E3A8A] whitespace-nowrap shrink-0">
                        Baca Bab
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
