interface AboutSectionProps {
  onJumpToCatalog: () => void;
}

export function AboutSection({ onJumpToCatalog }: AboutSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="border-b border-stone-200 pb-8">
        <p className="font-mono text-xs tracking-[0.16em] text-[#57534E] uppercase">
          Profil Kelembagaan
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
          Tentang Pustaka Aksara
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-[#57534E] italic">
          Ruang baca digital yang dirancang dengan kesabaran tipografi buku cetak, ketertiban arsip
          museum, dan kemudahan akses terbuka.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-6 text-base leading-[1.8] text-[#44403C] lg:col-span-7">
          <p>
            Pustaka Aksara dibangun untuk mengembalikan ketenangan pengalaman membaca di layar.
            Alih-alih memenuhi halaman dengan gangguan visual, setiap terbitan disajikan dengan
            lebar kolom optimal 65 hingga 72 karakter, pilihan kertas hangat maupun mode malam, serta
            ruang catatan tepi untuk berdialog langsung dengan teks.
          </p>
          <p>
            Seluruh koleksi dikurasi dalam enam bidang utama—Arsitektur, Sejarah, Filsafat, Sains,
            Teknologi, dan Sastra—dan dapat dilengkapi dengan naskah digital milik Anda sendiri
            melalui fitur unggah naskah teks maupun Markdown.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onJumpToCatalog}
              className="min-h-[44px] cursor-pointer rounded-md bg-[#1E3A8A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1E40AF]"
            >
              Kembali ke Katalog Koleksi
            </button>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-lg border border-stone-200 bg-[#F4F0E8]/70 p-6">
            <h2 className="text-xs font-semibold tracking-wider text-[#57534E] uppercase">
              Tata Tertib Layanan Digital
            </h2>
            <dl className="mt-4 divide-y divide-stone-200/90 text-sm">
              <div className="py-3">
                <dt className="font-medium text-[#1C1917]">Masa Peminjaman</dt>
                <dd className="mt-1 text-[#57534E]">
                  Setiap koleksi yang dipinjam ke rak pribadi memiliki siklus 14 hari kalender dan
                  dapat dikembalikan sewaktu-waktu.
                </dd>
              </div>
              <div className="py-3">
                <dt className="font-medium text-[#1C1917]">Penyimpanan Lokal</dt>
                <dd className="mt-1 text-[#57534E]">
                  Progres halaman, penanda bab, catatan baca, dan buku tambahan Anda tersimpan
                  otomatis di peramban perangkat ini.
                </dd>
              </div>
              <div className="py-3">
                <dt className="font-medium text-[#1C1917]">Ekspor Marginalia</dt>
                <dd className="mt-1 text-[#57534E]">
                  Seluruh kutipan dan catatan baca dapat diunduh sebagai berkas Markdown (.md)
                  untuk arsip riset pribadi Anda.
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
