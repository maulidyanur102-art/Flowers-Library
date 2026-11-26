import { Book } from '../types/library';
import { BookCover } from './BookCover';

interface HeroShowcaseProps {
  featuredBook: Book;
  isBorrowed: boolean;
  stats: {
    totalBooks: number;
    borrowedCount: number;
    pagesRead: number;
    notesCount: number;
  };
  onReadBook: (book: Book) => void;
  onBorrowToggle: (book: Book) => void;
  onInspectBook: (book: Book) => void;
  onJumpToShelf: () => void;
  onJumpToNotes: () => void;
}

export function HeroShowcase({
  featuredBook,
  isBorrowed,
  stats,
  onReadBook,
  onBorrowToggle,
  onInspectBook,
  onJumpToShelf,
  onJumpToNotes
}: HeroShowcaseProps) {
  return (
    <section className="border-b border-stone-200 bg-[#FBF9F5]">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Split 2 kolom seimbang */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-[#57534E] uppercase">
                Koleksi Pilihan Minggu Ini · {featuredBook.accessionNumber}
              </p>

              <h1 className="mt-4 font-serif text-4xl leading-[1.12] font-semibold tracking-tight text-[#1C1917] sm:text-5xl">
                {featuredBook.title}
              </h1>

              <p className="mt-3 font-serif text-lg leading-relaxed text-[#57534E] italic">
                {featuredBook.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-stone-200 py-3 text-sm text-[#57534E]">
                <span className="font-medium text-[#1C1917]">{featuredBook.author}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredBook.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{featuredBook.year}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{featuredBook.pages} Halaman</span>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-[1.75] text-[#44403C]">
                {featuredBook.synopsis}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onReadBook(featuredBook)}
                className="min-h-[44px] cursor-pointer rounded-md bg-[#1E3A8A] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1E40AF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                Baca Sekarang
              </button>

              <button
                type="button"
                onClick={() => onBorrowToggle(featuredBook)}
                className="min-h-[44px] cursor-pointer rounded-md border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-[#1C1917] transition-colors duration-150 hover:bg-[#F4F0E8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                {isBorrowed ? 'Kembalikan Buku' : 'Pinjam ke Rak'}
              </button>

              <button
                type="button"
                onClick={() => onInspectBook(featuredBook)}
                className="min-h-[44px] cursor-pointer px-3 py-2.5 text-sm font-medium text-[#57534E] underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#1C1917] whitespace-nowrap shrink-0"
              >
                Rincian Katalog
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => onInspectBook(featuredBook)}
              className="group relative block h-full min-h-[360px] w-full cursor-pointer overflow-hidden rounded-lg bg-[#EBE6DF] p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] lg:min-h-[440px]"
            >
              <div className="mx-auto flex h-full max-w-[300px] items-center justify-center">
                <BookCover
                  book={featuredBook}
                  className="aspect-[3/4] w-full rounded-sm shadow-lg"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Strip utilitas operasional 4 kolom */}
        <div className="mt-12 grid grid-cols-2 border-t border-stone-200 pt-8 md:grid-cols-4 md:divide-x md:divide-stone-200">
          <div className="pb-4 md:pr-6 md:pb-0">
            <p className="text-xs font-medium tracking-wide text-[#57534E] uppercase">
              Koleksi Digital
            </p>
            <p className="mt-1.5 font-mono text-2xl font-medium text-[#1C1917] tabular-nums">
              {stats.totalBooks} Judul
            </p>
          </div>

          <button
            type="button"
            onClick={onJumpToShelf}
            className="cursor-pointer pb-4 text-left transition-colors hover:opacity-80 md:px-6 md:pb-0"
          >
            <p className="text-xs font-medium tracking-wide text-[#57534E] uppercase">
              Sedang Dipinjam
            </p>
            <p className="mt-1.5 font-mono text-2xl font-medium text-[#1C1917] tabular-nums">
              {stats.borrowedCount} Buku
            </p>
          </button>

          <div className="pt-4 md:px-6 md:pt-0">
            <p className="text-xs font-medium tracking-wide text-[#57534E] uppercase">
              Estimasi Halaman Dibaca
            </p>
            <p className="mt-1.5 font-mono text-2xl font-medium text-[#1C1917] tabular-nums">
              {stats.pagesRead} Hlm
            </p>
          </div>

          <button
            type="button"
            onClick={onJumpToNotes}
            className="cursor-pointer pt-4 text-left transition-colors hover:opacity-80 md:pl-6 md:pt-0"
          >
            <p className="text-xs font-medium tracking-wide text-[#57534E] uppercase">
              Catatan & Penanda
            </p>
            <p className="mt-1.5 font-mono text-2xl font-medium text-[#1C1917] tabular-nums">
              {stats.notesCount} Butir
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
