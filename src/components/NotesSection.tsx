import { useMemo, useState } from 'react';
import { Download, Search, Trash2 } from 'lucide-react';
import { Book, Bookmark, ReadingNote } from '../types/library';

interface NotesSectionProps {
  books: Book[];
  notes: ReadingNote[];
  bookmarks: Bookmark[];
  onOpenReaderAt: (book: Book, chapterIndex: number) => void;
  onDeleteNote: (noteId: string) => void;
  onRemoveBookmark: (bookmarkId: string) => void;
}

export function NotesSection({
  books,
  notes,
  bookmarks,
  onOpenReaderAt,
  onDeleteNote,
  onRemoveBookmark
}: NotesSectionProps) {
  const [query, setQuery] = useState('');

  const bookMap = useMemo(() => {
    const map: Record<string, Book> = {};
    books.forEach((b) => {
      map[b.id] = b;
    });
    return map;
  }, [books]);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((note) => {
      const book = bookMap[note.bookId];
      return (
        note.content.toLowerCase().includes(q) ||
        (note.quote ?? '').toLowerCase().includes(q) ||
        note.chapterTitle.toLowerCase().includes(q) ||
        (book?.title.toLowerCase().includes(q) ?? false)
      );
    });
  }, [notes, query, bookMap]);

  const handleExportMarkdown = () => {
    const lines: string[] = [
      '# Arsip Catatan Baca — Pustaka Aksara',
      `Diekspor pada ${new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}`,
      ''
    ];

    notes.forEach((n) => {
      const book = bookMap[n.bookId];
      lines.push(`## ${book?.title ?? 'Buku'} — Bab ${n.chapterIndex + 1}: ${n.chapterTitle}`);
      if (n.quote) lines.push(`> "${n.quote}"`);
      lines.push(n.content);
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'catatan-baca-pustaka-aksara.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-[#57534E] uppercase">
            Marginalia & Penanda
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
            Catatan & Penanda Halaman
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#57534E]">
            Semua kutipan, refleksi pribadi, dan penanda bab yang Anda simpan saat membaca tersusun
            rapi di sini untuk ditinjau kembali kapan saja.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#78716C]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari isi catatan..."
              aria-label="Cari catatan baca"
              className="h-10 w-full rounded-md border border-stone-300 bg-white pr-3 pl-9 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          {notes.length > 0 && (
            <button
              type="button"
              onClick={handleExportMarkdown}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:bg-[#F4F0E8] whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Unduh Catatan (.md)</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Daftar Catatan */}
        <div className="lg:col-span-8">
          <h2 className="text-xs font-semibold tracking-wider text-[#57534E] uppercase">
            Catatan Baca ({filteredNotes.length})
          </h2>

          {filteredNotes.length === 0 ? (
            <div className="mt-4 rounded-lg border border-stone-200 bg-[#F4F0E8]/60 p-10 text-center">
              <p className="font-serif text-lg font-medium text-[#1C1917]">
                Belum ada catatan yang tersimpan.
              </p>
              <p className="mt-2 text-sm text-[#57534E]">
                Buka buku mana saja lalu tekan “Daftar & Catatan” di pembaca untuk menuliskan
                kutipan atau gagasan penting.
              </p>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
              {filteredNotes.map((note) => {
                const book = bookMap[note.bookId];
                return (
                  <article key={note.id} className="py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#57534E]">
                          {book?.title ?? 'Koleksi'} · Bab {note.chapterIndex + 1}:{' '}
                          {note.chapterTitle}
                        </p>
                        {note.quote && (
                          <blockquote className="mt-2.5 font-serif text-base text-[#44403C] italic">
                            “{note.quote}”
                          </blockquote>
                        )}
                        <p className="mt-2.5 text-sm leading-relaxed text-[#1C1917]">
                          {note.content}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onDeleteNote(note.id)}
                        aria-label="Hapus catatan"
                        className="cursor-pointer p-1.5 text-[#78716C] transition-colors hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {book && (
                      <div className="mt-3 flex items-center justify-between text-xs text-[#57534E]">
                        <span>
                          {new Date(note.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenReaderAt(book, note.chapterIndex)}
                          className="cursor-pointer font-medium text-[#1E3A8A] underline underline-offset-4 hover:text-[#1E40AF]"
                        >
                          Buka di Pembaca
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Kolom Penanda Bab */}
        <aside className="lg:col-span-4">
          <h2 className="text-xs font-semibold tracking-wider text-[#57534E] uppercase">
            Penanda Halaman ({bookmarks.length})
          </h2>

          {bookmarks.length === 0 ? (
            <p className="mt-4 rounded-lg border border-stone-200 bg-[#F4F0E8]/60 p-6 text-xs leading-relaxed text-[#57534E]">
              Belum ada bab yang ditandai. Tekan tombol “Tandai” saat membaca untuk menyimpan
              posisi baca Anda.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
              {bookmarks.map((bm) => {
                const book = bookMap[bm.bookId];
                return (
                  <li key={bm.id} className="flex items-start justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-serif text-sm font-semibold text-[#1C1917]">
                        {book?.title ?? 'Buku'}
                      </p>
                      <p className="mt-0.5 text-xs text-[#57534E]">
                        Bab {bm.chapterIndex + 1} · {bm.chapterTitle}
                      </p>
                      {book && (
                        <button
                          type="button"
                          onClick={() => onOpenReaderAt(book, bm.chapterIndex)}
                          className="mt-2 cursor-pointer text-xs font-medium text-[#1E3A8A] underline underline-offset-4"
                        >
                          Lanjutkan dari Penanda
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(bm.id)}
                      aria-label="Hapus penanda"
                      className="cursor-pointer p-1 text-[#78716C] hover:text-red-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </div>
    </section>
  );
}
