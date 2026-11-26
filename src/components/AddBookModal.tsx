import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Book, BookCategory, Chapter } from '../types/library';

interface AddBookModalProps {
  isOpen: boolean;
  existingCount: number;
  onClose: () => void;
  onAddBook: (book: Book) => void;
}

const CATEGORIES: BookCategory[] = [
  'Arsitektur',
  'Sejarah',
  'Filsafat',
  'Sains',
  'Teknologi',
  'Sastra'
];

const TONES: { id: Book['coverTone']; label: string }[] = [
  { id: 'lapis', label: 'Biru Lapis' },
  { id: 'forest', label: 'Hijau Hutan' },
  { id: 'charcoal', label: 'Hitam Arang' },
  { id: 'stone', label: 'Batu Kapur' },
  { id: 'umber', label: 'Cokelat Tua' }
];

function parseTextIntoChapters(rawText: string): Chapter[] {
  const normalized = rawText.replace(/\r\n/g, '\n').trim();
  if (!normalized) {
    return [
      {
        id: 'bab-1',
        number: 1,
        title: 'Pendahuluan',
        paragraphs: ['Naskah buku ini siap untuk dibaca.']
      }
    ];
  }

  const lines = normalized.split('\n');
  const chapters: Chapter[] = [];
  let currentTitle = 'Bagian Pembuka';
  let currentParas: string[] = [];
  let buffer: string[] = [];

  const flushParagraph = () => {
    const joined = buffer.join(' ').trim();
    if (joined) currentParas.push(joined);
    buffer = [];
  };

  const flushChapter = () => {
    flushParagraph();
    if (currentParas.length > 0) {
      const idx = chapters.length + 1;
      chapters.push({
        id: `bab-${idx}`,
        number: idx,
        title: currentTitle,
        paragraphs: currentParas
      });
    }
    currentParas = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#{1,2}\s+/.test(trimmed)) {
      flushChapter();
      currentTitle = trimmed.replace(/^#{1,2}\s+/, '').trim();
    } else if (trimmed === '') {
      flushParagraph();
    } else {
      buffer.push(trimmed);
    }
  }
  flushChapter();

  if (chapters.length === 0) {
    return [
      {
        id: 'bab-1',
        number: 1,
        title: 'Naskah Lengkap',
        paragraphs: [normalized]
      }
    ];
  }

  return chapters;
}

export function AddBookModal({
  isOpen,
  existingCount,
  onClose,
  onAddBook
}: AddBookModalProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<BookCategory>('Sastra');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [publisher, setPublisher] = useState('Pustaka Mandiri');
  const [synopsis, setSynopsis] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [coverTone, setCoverTone] = useState<Book['coverTone']>('lapis');
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    if (!title.trim()) {
      const cleanName = file.name.replace(/\.(txt|md)$/i, '').replace(/[-_]+/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBodyText(reader.result);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !bodyText.trim()) {
      setErrorMsg('Judul buku, nama penulis, dan isi naskah wajib diisi.');
      return;
    }

    const chapters = parseTextIntoChapters(bodyText);
    const wordCount = bodyText.trim().split(/\s+/).length;
    const estimatedPages = Math.max(12, Math.round(wordCount / 220) * 10);
    const seq = String(existingCount + 1).padStart(2, '0');

    const newBook: Book = {
      id: `user-${Date.now()}`,
      accessionNumber: `ACC. ${new Date().getFullYear()}.04.${seq}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `Karya Digital oleh ${author.trim()}`,
      author: author.trim(),
      authorMeta: 'Koleksi Unggahan Pribadi',
      category,
      year: Number(year) || new Date().getFullYear(),
      publisher: publisher.trim() || 'Pustaka Mandiri',
      isbn: `978-623-00${seq}-${Math.floor(10 + Math.random() * 89)}-0`,
      language: 'Bahasa Indonesia',
      pages: estimatedPages,
      readCount: 1,
      coverTone,
      isUserAdded: true,
      synopsis:
        synopsis.trim() ||
        `Naskah digital "${title.trim()}" yang ditambahkan ke dalam koleksi perpustakaan pribadi Anda.`,
      chapters
    };

    onAddBook(newBook);
    setTitle('');
    setSubtitle('');
    setAuthor('');
    setSynopsis('');
    setBodyText('');
    setFileName('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-book-heading"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-stone-200 bg-[#FBF9F5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-[#FBF9F5]/95 px-6 py-4 backdrop-blur-xs">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-[#57534E] uppercase">
              Akuisisi Koleksi Baru
            </p>
            <h2 id="add-book-heading" className="font-serif text-xl font-semibold text-[#1C1917]">
              Tambah atau Unggah Buku Digital
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir tambah buku"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#57534E] hover:bg-stone-200/70 hover:text-[#1C1917]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Unggah Berkas Teks/Markdown */}
          <div className="rounded-md border border-dashed border-stone-300 bg-[#F4F0E8]/70 p-4">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Upload className="h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-[#1C1917]">
                    {fileName ? `Berkas dimuat: ${fileName}` : 'Impor naskah dari berkas (.txt / .md)'}
                  </p>
                  <p className="text-xs text-[#57534E]">
                    Gunakan awalan # untuk memisahkan bab secara otomatis.
                  </p>
                </div>
              </div>
              <span className="rounded border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-[#1C1917] whitespace-nowrap shrink-0">
                Pilih Berkas
              </span>
              <input
                type="file"
                accept=".txt,.md,text/plain,text/markdown"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>
          </div>

          {errorMsg && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
              {errorMsg}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#1C1917]">
                Judul Buku <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Catatan Perjalanan Sungai Kapuas"
                className="mt-1.5 h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#1C1917]">Subjudul</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Keterangan singkat di bawah judul"
                className="mt-1.5 h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1C1917]">
                Nama Penulis <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nama lengkap penulis"
                className="mt-1.5 h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1C1917]">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BookCategory)}
                className="mt-1.5 h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1C1917]">Tahun Terbit</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border border-stone-300 bg-white px-3 font-mono text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1C1917]">Warna Sampul Jilid</label>
              <select
                value={coverTone}
                onChange={(e) => setCoverTone(e.target.value as Book['coverTone'])}
                className="mt-1.5 h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              >
                {TONES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1C1917]">Sinopsis Singkat</label>
            <textarea
              rows={2}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Ringkasan singkat isi buku..."
              className="mt-1.5 w-full rounded-md border border-stone-300 bg-white p-3 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1C1917]">
              Isi Naskah Buku <span className="text-red-700">*</span>
            </label>
            <textarea
              rows={6}
              required
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder={
                '# Bab Pertama\nTuliskan isi paragraf pertama di sini.\n\n# Bab Kedua\nParagraf lanjutan...'
              }
              className="mt-1.5 w-full rounded-md border border-stone-300 bg-white p-3 font-mono text-xs leading-relaxed text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-stone-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[42px] cursor-pointer rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-[#1C1917] hover:bg-[#F4F0E8]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="min-h-[42px] cursor-pointer rounded-md bg-[#1E3A8A] px-5 py-2 text-sm font-medium text-white hover:bg-[#1E40AF]"
            >
              Simpan ke Katalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
