import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Book } from '../types/library';

interface BookCoverProps {
  book: Book;
  className?: string;
  priority?: boolean;
}

const TONE_CLASSES: Record<Book['coverTone'], { bg: string; border: string; accent: string; text: string }> = {
  lapis: {
    bg: 'bg-[#172554]',
    border: 'border-[#3B82F6]/30',
    accent: 'text-[#DBEAFE]/80',
    text: 'text-[#F8FAFC]'
  },
  forest: {
    bg: 'bg-[#143326]',
    border: 'border-[#6EE7B7]/25',
    accent: 'text-[#D1FAE5]/80',
    text: 'text-[#F8FAF9]'
  },
  charcoal: {
    bg: 'bg-[#1C1917]',
    border: 'border-[#A8A29E]/30',
    accent: 'text-[#D6D3D1]/80',
    text: 'text-[#FAFAF9]'
  },
  stone: {
    bg: 'bg-[#E7E2D8]',
    border: 'border-[#A8A29E]/50',
    accent: 'text-[#57534E]',
    text: 'text-[#1C1917]'
  },
  umber: {
    bg: 'bg-[#3F2A1D]',
    border: 'border-[#D6CEBE]/30',
    accent: 'text-[#F5EFE6]/75',
    text: 'text-[#FBF9F5]'
  }
};

export function BookCover({ book, className = '' }: BookCoverProps) {
  const [imgError, setImgError] = useState(false);
  const tone = TONE_CLASSES[book.coverTone] ?? TONE_CLASSES.charcoal;

  if (book.coverImage && !imgError) {
    return (
      <div
        className={`relative overflow-hidden bg-[#EBE6DF] border border-stone-200/80 ${className}`}
      >
        <img
          src={book.coverImage}
          alt={`Sampul buku ${book.title}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/20 to-transparent"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden border p-5 ${tone.bg} ${tone.border} ${tone.text} ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-black/10 to-transparent"
      />
      <div className={`border-b pb-3 ${tone.border}`}>
        <p className={`font-mono text-[10px] tracking-[0.18em] uppercase ${tone.accent}`}>
          {book.accessionNumber}
        </p>
        <p className={`mt-1 text-xs font-medium ${tone.accent}`}>{book.category}</p>
      </div>

      <div className="my-auto py-4">
        <h4 className="font-serif text-lg leading-snug font-semibold tracking-tight line-clamp-4">
          {book.title}
        </h4>
        <p className={`mt-2 text-xs leading-relaxed line-clamp-2 ${tone.accent}`}>
          {book.subtitle}
        </p>
      </div>

      <div className={`flex items-end justify-between border-t pt-3 ${tone.border}`}>
        <div className="min-w-0 pr-2">
          <p className="truncate text-xs font-medium">{book.author}</p>
          <p className={`font-mono text-[10px] tabular-nums ${tone.accent}`}>
            {book.year} · {book.pages} hlm
          </p>
        </div>
        <BookOpen className={`h-4 w-4 shrink-0 ${tone.accent}`} aria-hidden="true" />
      </div>
    </div>
  );
}
