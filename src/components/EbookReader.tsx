import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Bookmark as BookmarkIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  List,
  MessageSquarePlus,
  Settings2,
  Trash2,
  X
} from 'lucide-react';
import { Book, Bookmark, ReaderSettings, ReadingNote } from '../types/library';

interface EbookReaderProps {
  book: Book;
  initialChapterIndex: number;
  isCompleted: boolean;
  bookmarks: Bookmark[];
  notes: ReadingNote[];
  settings: ReaderSettings;
  onUpdateSettings: (next: ReaderSettings) => void;
  onChapterChange: (chapterIndex: number) => void;
  onToggleComplete: (completed: boolean) => void;
  onToggleBookmark: (chapterIndex: number, chapterTitle: string) => void;
  onAddNote: (chapterIndex: number, chapterTitle: string, content: string, quote?: string) => void;
  onDeleteNote: (noteId: string) => void;
  onClose: () => void;
}

export function EbookReader({
  book,
  initialChapterIndex,
  isCompleted,
  bookmarks,
  notes,
  settings,
  onUpdateSettings,
  onChapterChange,
  onToggleComplete,
  onToggleBookmark,
  onAddNote,
  onDeleteNote,
  onClose
}: EbookReaderProps) {
  const safeInitial = Math.min(Math.max(initialChapterIndex, 0), book.chapters.length - 1);
  const [chapterIndex, setChapterIndex] = useState(safeInitial);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'daftar' | 'catatan'>('daftar');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [quoteInput, setQuoteInput] = useState('');
  const [scrollDepth, setScrollDepth] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentChapter = book.chapters[chapterIndex] ?? book.chapters[0];
  const isBookmarked = bookmarks.some(
    (b) => b.bookId === book.id && b.chapterIndex === chapterIndex
  );
  const chapterNotes = notes.filter(
    (n) => n.bookId === book.id && n.chapterIndex === chapterIndex
  );
  const bookNotes = notes.filter((n) => n.bookId === book.id);

  useEffect(() => {
    setChapterIndex(Math.min(Math.max(initialChapterIndex, 0), book.chapters.length - 1));
  }, [book.id, initialChapterIndex, book.chapters.length]);

  const goToChapter = (idx: number) => {
    if (idx < 0 || idx >= book.chapters.length) return;
    setChapterIndex(idx);
    onChapterChange(idx);
    setScrollDepth(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      ) {
        return;
      }
      if (e.key === 'Escape') {
        if (settingsOpen) {
          setSettingsOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        if (chapterIndex < book.chapters.length - 1) {
          goToChapter(chapterIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (chapterIndex > 0) {
          goToChapter(chapterIndex - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [chapterIndex, book.chapters.length, settingsOpen]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollDepth(100);
      return;
    }
    setScrollDepth(Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)));
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    onAddNote(
      chapterIndex,
      currentChapter.title,
      noteInput.trim(),
      quoteInput.trim() || undefined
    );
    setNoteInput('');
    setQuoteInput('');
  };

  const themeClasses = {
    paper: {
      bg: 'bg-[#FBF9F5]',
      header: 'bg-[#FBF9F5]/95 border-stone-200 text-[#1C1917]',
      prose: 'text-[#292524]',
      muted: 'text-[#57534E]',
      surface: 'bg-[#F4F0E8] border-stone-200',
      border: 'border-stone-200'
    },
    alabaster: {
      bg: 'bg-white',
      header: 'bg-white/95 border-neutral-200 text-[#0A0A0A]',
      prose: 'text-[#171717]',
      muted: 'text-[#525252]',
      surface: 'bg-neutral-50 border-neutral-200',
      border: 'border-neutral-200'
    },
    night: {
      bg: 'bg-[#141413]',
      header: 'bg-[#141413]/95 border-stone-800 text-[#F5F5F4]',
      prose: 'text-[#E7E5E4]',
      muted: 'text-[#A8A29E]',
      surface: 'bg-[#1C1917] border-stone-800',
      border: 'border-stone-800'
    }
  }[settings.theme];

  const fontSizeClass = {
    sm: 'text-[16px]',
    md: 'text-[18px]',
    lg: 'text-[20px]'
  }[settings.fontSize];

  const lineHeightClass = {
    compact: 'leading-[1.65]',
    comfortable: 'leading-[1.85]',
    airy: 'leading-[2.05]'
  }[settings.lineHeight];

  const overallProgress = Math.round(
    ((chapterIndex + scrollDepth / 100) / Math.max(book.chapters.length, 1)) * 100
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col ${themeClasses.bg} transition-colors duration-200`}
      role="dialog"
      aria-modal="true"
      aria-label={`Pembaca buku ${book.title}`}
    >
      {/* Bilah Atas Pembaca */}
      <header
        className={`relative z-20 flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-6 ${themeClasses.header}`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10 whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Tutup Pembaca</span>
          </button>

          <div className={`hidden h-5 w-px sm:block ${themeClasses.border} border-r`} />

          <div className="min-w-0">
            <p className="truncate font-serif text-sm font-semibold sm:text-base">{book.title}</p>
            <p className={`truncate text-xs ${themeClasses.muted}`}>
              Bab {currentChapter.number} dari {book.chapters.length} · {currentChapter.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onToggleBookmark(chapterIndex, currentChapter.title)}
            aria-pressed={isBookmarked}
            title={isBookmarked ? 'Hapus penanda bab ini' : 'Tandai bab ini'}
            className={`inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              isBookmarked
                ? 'bg-[#1E3A8A] text-white'
                : 'hover:bg-black/5'
            }`}
          >
            <BookmarkIcon
              className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
              aria-hidden="true"
            />
            <span className="hidden md:inline">{isBookmarked ? 'Ditandai' : 'Tandai'}</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              aria-expanded={settingsOpen}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-black/5 whitespace-nowrap shrink-0"
            >
              <Settings2 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden md:inline">Tampilan</span>
            </button>

            {settingsOpen && (
              <div
                className={`absolute right-0 mt-2 w-72 rounded-lg border p-4 shadow-xl ${themeClasses.surface} ${
                  settings.theme === 'night' ? 'text-[#F5F5F4]' : 'text-[#1C1917]'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-current/10">
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    Pengaturan Baca
                  </span>
                  <button
                    type="button"
                    onClick={() => setSettingsOpen(false)}
                    aria-label="Tutup pengaturan"
                    className="cursor-pointer p-1 opacity-70 hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-4 text-xs">
                  <div>
                    <p className="mb-1.5 font-medium opacity-80">Tema Kertas</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: 'paper', label: 'Hangat' },
                          { id: 'alabaster', label: 'Putih' },
                          { id: 'night', label: 'Malam' }
                        ] as const
                      ).map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => onUpdateSettings({ ...settings, theme: t.id })}
                          className={`min-h-[34px] cursor-pointer rounded border px-2 py-1 font-medium transition-colors ${
                            settings.theme === t.id
                              ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                              : 'border-current/20 hover:bg-black/5'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 font-medium opacity-80">Jenis Huruf</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(
                        [
                          { id: 'serif', label: 'Serif Klasik' },
                          { id: 'sans', label: 'Sans Modern' }
                        ] as const
                      ).map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => onUpdateSettings({ ...settings, fontFamily: f.id })}
                          className={`min-h-[34px] cursor-pointer rounded border px-2 py-1 font-medium ${
                            settings.fontFamily === f.id
                              ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                              : 'border-current/20 hover:bg-black/5'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 font-medium opacity-80">Ukuran Huruf</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: 'sm', label: 'Kecil' },
                          { id: 'md', label: 'Sedang' },
                          { id: 'lg', label: 'Besar' }
                        ] as const
                      ).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => onUpdateSettings({ ...settings, fontSize: s.id })}
                          className={`min-h-[34px] cursor-pointer rounded border px-2 py-1 font-medium ${
                            settings.fontSize === s.id
                              ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                              : 'border-current/20 hover:bg-black/5'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 font-medium opacity-80">Spasi Baris</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: 'compact', label: 'Rapat' },
                          { id: 'comfortable', label: 'Nyaman' },
                          { id: 'airy', label: 'Lega' }
                        ] as const
                      ).map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => onUpdateSettings({ ...settings, lineHeight: l.id })}
                          className={`min-h-[34px] cursor-pointer rounded border px-2 py-1 font-medium ${
                            settings.lineHeight === l.id
                              ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                              : 'border-current/20 hover:bg-black/5'
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-expanded={sidebarOpen}
            className={`inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              sidebarOpen ? 'bg-[#1E3A8A] text-white' : 'hover:bg-black/5'
            }`}
          >
            <List className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">Daftar & Catatan</span>
          </button>
        </div>

        {/* Garis Progres Tipis */}
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 left-0 h-[2px] bg-stone-200/40"
        >
          <div
            className="h-full bg-[#1E3A8A] transition-all duration-150"
            style={{ width: `${Math.max(4, overallProgress)}%` }}
          />
        </div>
      </header>

      {/* Area Konten Utama + Sidebar Margin */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-12 sm:px-10 lg:py-16"
        >
          <article className="mx-auto max-w-[68ch]">
            <header className={`border-b pb-8 ${themeClasses.border}`}>
              <p className={`font-mono text-xs tracking-[0.18em] uppercase ${themeClasses.muted}`}>
                Bab {String(currentChapter.number).padStart(2, '0')} · {book.author}
              </p>
              <h1
                className={`mt-3 font-serif text-3xl leading-tight font-semibold sm:text-4xl ${
                  settings.theme === 'night' ? 'text-[#FAF8F5]' : 'text-[#1C1917]'
                }`}
              >
                {currentChapter.title}
              </h1>
            </header>

            {currentChapter.pullQuote && (
              <blockquote
                className={`my-10 border-y py-6 text-center font-serif text-xl leading-relaxed italic sm:text-2xl ${themeClasses.border} ${
                  settings.theme === 'night' ? 'text-[#D6D3D1]' : 'text-[#44403C]'
                }`}
              >
                “{currentChapter.pullQuote}”
              </blockquote>
            )}

            <div
              className={`mt-8 space-y-6 ${
                settings.fontFamily === 'serif' ? 'font-serif' : 'font-sans'
              } ${fontSizeClass} ${lineHeightClass} ${themeClasses.prose}`}
            >
              {currentChapter.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className={
                    pIdx === 0
                      ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:leading-none first-letter:font-semibold'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Catatan Pribadi di Bawah Bab */}
            {chapterNotes.length > 0 && (
              <aside className={`mt-14 border-t pt-8 ${themeClasses.border}`}>
                <h2 className={`text-xs font-semibold tracking-wider uppercase ${themeClasses.muted}`}>
                  Catatan Anda untuk Bab Ini ({chapterNotes.length})
                </h2>
                <div className="mt-4 space-y-4">
                  {chapterNotes.map((note) => (
                    <div
                      key={note.id}
                      className={`rounded-md border p-4 text-sm ${themeClasses.surface}`}
                    >
                      {note.quote && (
                        <p className={`mb-2 font-serif text-xs italic ${themeClasses.muted}`}>
                          “{note.quote}”
                        </p>
                      )}
                      <p className={themeClasses.prose}>{note.content}</p>
                    </div>
                  ))}
                </div>
              </aside>
            )}

            {/* Navigasi Bab Bawah */}
            <footer
              className={`mt-16 flex flex-col items-stretch justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center ${themeClasses.border}`}
            >
              <button
                type="button"
                disabled={chapterIndex === 0}
                onClick={() => goToChapter(chapterIndex - 1)}
                className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${themeClasses.border} ${
                  chapterIndex === 0
                    ? 'cursor-not-allowed opacity-40'
                    : 'cursor-pointer hover:bg-black/5'
                } ${settings.theme === 'night' ? 'text-[#F5F5F4]' : 'text-[#1C1917]'}`}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Bab Sebelumnya</span>
              </button>

              <div className="flex items-center justify-center gap-3">
                {chapterIndex === book.chapters.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => onToggleComplete(!isCompleted)}
                    className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md px-5 py-2 text-sm font-medium transition-colors ${
                      isCompleted
                        ? 'bg-[#14532D] text-white'
                        : 'bg-[#1E3A8A] text-white hover:bg-[#1E40AF]'
                    }`}
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>{isCompleted ? 'Selesai Dibaca' : 'Tandai Selesai Dibaca'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => goToChapter(chapterIndex + 1)}
                    className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1E40AF]"
                  >
                    <span>Bab Berikutnya</span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </footer>
          </article>
        </div>

        {/* Sidebar Margin: Daftar Isi & Catatan */}
        {sidebarOpen && (
          <aside
            className={`w-full max-w-sm shrink-0 overflow-y-auto border-l p-5 sm:w-88 ${themeClasses.surface} ${
              settings.theme === 'night' ? 'text-[#F5F5F4]' : 'text-[#1C1917]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/10 pb-3">
              <div className="flex items-center gap-1 rounded-md bg-black/5 p-1">
                <button
                  type="button"
                  onClick={() => setSidebarTab('daftar')}
                  className={`cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors ${
                    sidebarTab === 'daftar' ? 'bg-white text-[#1C1917] shadow-xs' : 'opacity-70'
                  }`}
                >
                  Daftar Isi
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarTab('catatan')}
                  className={`cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors ${
                    sidebarTab === 'catatan' ? 'bg-white text-[#1C1917] shadow-xs' : 'opacity-70'
                  }`}
                >
                  Catatan ({bookNotes.length})
                </button>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup panel samping"
                className="cursor-pointer p-1.5 opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {sidebarTab === 'daftar' ? (
              <div className="mt-4">
                <p className={`text-xs font-medium ${themeClasses.muted}`}>
                  Pilih bab untuk melompat langsung:
                </p>
                <ol className="mt-3 space-y-1.5">
                  {book.chapters.map((ch, idx) => {
                    const active = idx === chapterIndex;
                    const marked = bookmarks.some(
                      (b) => b.bookId === book.id && b.chapterIndex === idx
                    );
                    return (
                      <li key={ch.id}>
                        <button
                          type="button"
                          onClick={() => goToChapter(idx)}
                          className={`flex w-full cursor-pointer items-start justify-between gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                            active
                              ? 'bg-[#1E3A8A] text-white'
                              : 'hover:bg-black/5'
                          }`}
                        >
                          <span className="flex items-baseline gap-2.5">
                            <span className="font-mono text-xs opacity-70 tabular-nums">
                              {String(ch.number).padStart(2, '0')}
                            </span>
                            <span className="font-medium">{ch.title}</span>
                          </span>
                          {marked && (
                            <BookmarkIcon
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-current"
                              aria-label="Ditandai"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              <div className="mt-4 space-y-5">
                <form onSubmit={handleSaveNote} className="space-y-2.5">
                  <label className="block text-xs font-semibold tracking-wider uppercase opacity-80">
                    Tambah Catatan di Bab {currentChapter.number}
                  </label>
                  <input
                    type="text"
                    value={quoteInput}
                    onChange={(e) => setQuoteInput(e.target.value)}
                    placeholder="Kutipan opsional dari teks..."
                    className="w-full rounded-md border border-current/20 bg-transparent px-3 py-2 text-xs focus:border-[#1E3A8A] focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Tulis refleksi atau ringkasan Anda..."
                    className="w-full rounded-md border border-current/20 bg-transparent px-3 py-2 text-xs leading-relaxed focus:border-[#1E3A8A] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!noteInput.trim()}
                    className="inline-flex min-h-[38px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-md bg-[#1E3A8A] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Simpan Catatan</span>
                  </button>
                </form>

                <div className="border-t border-current/10 pt-4">
                  <p className="text-xs font-semibold tracking-wider uppercase opacity-75">
                    Semua Catatan Buku Ini
                  </p>
                  {bookNotes.length === 0 ? (
                    <p className={`mt-3 text-xs leading-relaxed ${themeClasses.muted}`}>
                      Belum ada catatan untuk buku ini. Gunakan formulir di atas untuk menyimpan gagasan penting.
                    </p>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {bookNotes.map((note) => (
                        <div
                          key={note.id}
                          className="rounded-md border border-current/15 p-3 text-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => goToChapter(note.chapterIndex)}
                              className="cursor-pointer font-medium text-[#1E3A8A] hover:underline dark:text-blue-300"
                            >
                              Bab {note.chapterIndex + 1} · {note.chapterTitle}
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteNote(note.id)}
                              aria-label="Hapus catatan"
                              className="cursor-pointer p-1 opacity-60 hover:text-red-600 hover:opacity-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          {note.quote && (
                            <p className="mt-1.5 font-serif italic opacity-75">“{note.quote}”</p>
                          )}
                          <p className="mt-1.5 leading-relaxed">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
