import { Book } from '../types/library';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'arsitektur-cahaya-tropis',
    accessionNumber: 'ACC. 2026.01.01',
    title: 'Arsitektur Cahaya di Garis Khatulistiwa',
    subtitle: 'Monografi Ruang, Bayangan, dan Materialitas Bangunan Tropis Modern',
    author: 'Dr. Aris Wibisono',
    authorMeta: 'Arsitek & Peneliti Sejarah Ruang Tropis, lahir 1974',
    category: 'Arsitektur',
    year: 2024,
    publisher: 'Balai Kajian Ruang Nusantara',
    isbn: '978-602-8841-12-9',
    language: 'Bahasa Indonesia',
    pages: 248,
    readCount: 1420,
    coverImage: '/src/assets/images/cover_arsitektur_cahaya_1795676100272.jpg',
    coverTone: 'charcoal',
    featured: true,
    synopsis:
      'Sebuah kajian mendalam tentang bagaimana arsitek modernis Asia Tenggara menaklukkan terik matahari khatulistiwa melalui kisi-kisi kayu jati, pelat beton ekspos, dan orientasi angin silang. Buku ini menyusun ulang hubungan antara ruang teduh, air, dan ketenangan domestik.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Geometri Teduh dan Sunyi',
        pullQuote:
          'Di negeri dengan matahari yang bersinar tegak lurus sepanjang tahun, arsitektur bukanlah seni memamerkan dinding, melainkan seni merancang bayangan.',
        paragraphs: [
          'Ketika cahaya matahari jatuh pada sudut hampir sembilan puluh derajat di tengah hari, setiap tonjolan atap dan celah kisi kayu berubah menjadi instrumen pengukur waktu. Bangunan tropis yang matang tidak berusaha melawan iklim dengan dinding kaca kedap udara, melainkan bernegosiasi dengannya melalui teras dalam, kolam pantul, dan selasar yang bernapas.',
          'Dalam pengamatan atas puluhan rumah tinggal di Jawa Tengah dan Bali sejak dekade 1960-an, terlihat satu benang merah yang konsisten: batas antara ruang dalam dan taman luar sengaja dibuat kabur. Lantai batu andesit yang dingin diinjak mengalir langsung dari beranda menuju ruang keluarga tanpa sekat masif.',
          'Ketebalan dinding beton bukan semata pernyataan estetika modernis, melainkan massa termal yang menyerap panas siang hari dan melepaskannya perlahan setelah senja turun. Ketika dipadukan dengan kisi kayu jati vertikal, cahaya yang menyusup ke dalam ruang tidak lagi menyilaukan, melainkan terurai menjadi garis-garis ritmis yang menenangkan mata.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Napas Kayu Jati dan Batu Alam',
        paragraphs: [
          'Material lokal menyimpan pengetahuan ekologis yang telah teruji ratusan musim hujan. Kayu jati tua tidak sekadar membingkai bukaan jendela; seratnya memuai dan menyusut secara halus mengikuti kelembapan udara, menjaga keseimbangan mikroklimat di balik fasad.',
          'Di sisi lain, penggunaan air sebagai elemen pasif pendingin sering disalahpahami hanya sebagai dekorasi taman. Padahal, kolam dangkal yang ditempatkan di sisi datangnya angin muson menurunkan suhu udara sebelum aliran angin memasuki ruang baca atau ruang kerja.',
          'Kesederhanaan palet material—beton abu-abu, kayu cokelat tua, dan kerikil sungai—menghadirkan kejujuran struktural. Tidak ada cat penutup yang menyembunyikan bekas cetakan papan kayu pada beton; setiap jejak pengerjaan tukang menjadi bagian sah dari riwayat bangunan.'
        ]
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Proporsi Ambang dan Serambi',
        pullQuote:
          'Serambi adalah ruang perantara tempat tamu disambut dan terik matahari diredam sebelum menyentuh inti rumah.',
        paragraphs: [
          'Dalam tradisi arsitektur vernakular Nusantara, serambi atau pendopo berfungsi sebagai ruang transisi sosial sekaligus termal. Adaptasi modernnya muncul dalam bentuk paviliun terbuka yang dinaungi kanopi beton tipis dengan jarak pandang luas ke pekarangan.',
          'Ketinggian langit-langit yang melampaui tiga setengah meter memberi ruang bagi udara hangat untuk naik dan keluar melalui celah ventilasi atas. Dengan demikian, penghuni yang duduk di ketinggian kursi merasakan aliran udara sejuk yang terus berganti tanpa perlu bantuan pendingin mekanis.',
          'Pada akhirnya, keberhasilan arsitektur tropis diukur dari seberapa jarang lampu dinyalakan di siang hari dan seberapa nyaman seseorang membaca buku di tepi selasar saat hujan deras turun.'
        ]
      },
      {
        id: 'bab-4',
        number: 4,
        title: 'Catatan Pelestarian Arsitektur Modern',
        paragraphs: [
          'Banyak karya arsitektur tropis pascakemerdekaan kini menghadapi ancaman pembongkaran atau renovasi yang menutup seluruh bukaan alami demi pemasangan kaca berpenyejuk udara. Dokumentasi gambar ukur dan arsip foto menjadi langkah darurat agar pengetahuan iklim tersebut tidak hilang.',
          'Melestarikan bangunan bukan berarti membekukannya sebagai monumen mati, melainkan merawat prinsip dasarnya: penghormatan terhadap arah angin, keteduhan halaman, dan kesetiaan pada material yang menua dengan bermartabat.'
        ]
      }
    ]
  },
  {
    id: 'peta-nusantara-manuskrip',
    accessionNumber: 'ACC. 2026.01.08',
    title: 'Nusantara dalam Peta dan Manuskrip Laut',
    subtitle: 'Sejarah Kartografi Maritim Kepulauan Rempah Abad XV–XVIII',
    author: 'Prof. Ratna Kusumawati',
    authorMeta: 'Sejarawan Maritim & Kurator Arsip Kartografi',
    category: 'Sejarah',
    year: 2023,
    publisher: 'Penerbit Samudra Arsip',
    isbn: '978-602-7104-33-4',
    language: 'Bahasa Indonesia',
    pages: 312,
    readCount: 1185,
    coverImage: '/src/assets/images/cover_peta_nusantara_1795676100808.jpg',
    coverTone: 'lapis',
    synopsis:
      'Menelusuri bagaimana garis pantai kepulauan Nusantara digambar, dikoreksi, dan diperebutkan dalam catatan pelayaran awal, portolan laut, serta naskah navigasi Bugis dan Melayu sebelum era pemetaan satelit.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Garis Pantai di Atas Perkamen',
        pullQuote:
          'Setiap peta tua bukan sekadar gambar daratan, melainkan catatan ketakutan dan harapan para nakhoda terhadap selat yang belum dikenal.',
        paragraphs: [
          'Sebelum kronometer laut ditemukan, menggambar garis pantai sebuah pulau adalah pekerjaan perkiraan yang memadukan pengamatan bintang, arah angin musim, dan ingatan para pandu lokal. Di atas lembaran perkamen yang menguning, selat-selat sempit di Maluku dan Laut Banda digambar dengan garis tinta biru lapis yang berliku tajam.',
          'Menariknya, peta-peta paling akurat tentang perairan dangkal dan gugusan karang justru lahir dari kolaborasi sunyi antara pembuat peta Eropa dan para juru mudi Nusantara yang menghafal pola arus laut melalui warna air serta terbangnya burung laut.',
          'Garis-garis angin atau rumb lines yang memancar dari mawar kompas bukanlah hiasan artistik semata; garis tersebut merupakan kisi navigasi praktis yang dipakai untuk menarik haluan kapal layar di tengah laut lepas.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Pustaka Pelayaran Bugis dan Melayu',
        paragraphs: [
          'Berbeda dari tradisi peta kertas Barat yang memandang bumi dari atas, tradisi navigasi lisan dan manuskrip Bugis memahami laut sebagai jaringan rute berurutan antar-tanjung, gunung api, dan gosong pasir. Naskah-naskah pelayaran Makassar mencatat nama angin, kedalaman air, serta durasi dayung antarpulau.',
          'Di Pelabuhan Gresik, Banten, dan Banda Neira, pengetahuan arah angin barat dan angin timur menentukan irama seluruh kehidupan niaga. Ketika angin berubah, seluruh pelabuhan berubah menjadi ruang tunggu bagi ratusan perahu pinisi dan jung.',
          'Membaca ulang manuskrip ini mengoreksi pandangan lama bahwa masyarakat kepulauan tidak memiliki sistem kartografi rasional; mereka memiliki peta mental dan tekstual yang sangat presisi untuk perairan dinamis.'
        ]
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Jejak Tinta di Arsip Batavia dan Lisabon',
        paragraphs: [
          'Perbandingan antara lembar peta abad keenam belas di arsip Lisabon dengan peta abad kedelapan belas menunjukkan bagaimana pulau-pulau seperti Sulawesi perlahan menemukan bentuk khasnya setelah puluhan ekspedisi penyusuran teluk.',
          'Nama-nama tempat mengalami pergeseran fonetik dari pelafalan lokal ke ejaan juru tulis asing, namun sering kali masih menyimpan petunjuk ekologis: teluk berpasir putih, muara berhutan bakau, atau tanjung tempat air tawar mudah diambil.',
          'Kini, digitalisasi resolusi tinggi terhadap peta-peta berumur empat abad memungkinkan pembaca masa kini menelusuri setiap goresan pena bulu tanpa harus menyentuh kertas rapuh di ruang penyimpanan suhu terkendali.'
        ]
      }
    ]
  },
  {
    id: 'filsafat-sunyi-perhatian',
    accessionNumber: 'ACC. 2026.01.14',
    title: 'Etika Perhatian di Zaman Bising',
    subtitle: 'Esai-Esai tentang Sunyi, Membaca Lambat, dan Kehidupan Batin',
    author: 'Seno Adhi Prawira',
    authorMeta: 'Esais & Pengajar Filsafat Kebudayaan',
    category: 'Filsafat',
    year: 2025,
    publisher: 'Loka Wacana Press',
    isbn: '978-623-5412-09-1',
    language: 'Bahasa Indonesia',
    pages: 184,
    readCount: 1640,
    coverImage: '/src/assets/images/cover_filsafat_sunyi_1795676101627.jpg',
    coverTone: 'stone',
    synopsis:
      'Kumpulan esai reflektif tentang bagaimana menjaga kedalaman berpikir ketika arus informasi bergerak terlalu cepat. Mengajak pembaca memulihkan kebiasaan membaca lambat, mencatat di tepi halaman, dan berdamai dengan keheningan.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Mengapa Kita Kehilangan Kesabaran Membaca',
        pullQuote:
          'Perhatian manusia adalah mata uang terakhir yang tidak dapat diperbanyak dengan mesin; ke mana ia diarahkan, di situlah hidup kita dibentuk.',
        paragraphs: [
          'Setiap pagi, sebelum pikiran kita sempat menyusun satu kalimat utuh milik sendiri, puluhan kabar pendek telah meminta tanggapan cepat. Kebiasaan memindai judul berita tanpa membaca argumen lengkap melatih otak kita untuk mencari kejutan instan dan menghindari paragraf yang menuntut kesabaran.',
          'Membaca buku panjang bukan sekadar aktivitas mengisi waktu luang. Ia adalah latihan memusatkan perhatian secara sukarela pada satu suara pikiran selama berjam-jam, membiarkan sebuah gagasan mengendap dan bertumbuh sebelum kita terburu-buru menghakiminya.',
          'Di ruang baca yang tenang, waktu tidak diukur per detik notifikasi, melainkan dari kedalaman pemahaman yang perlahan terbentuk di antara satu bab dan bab berikutnya.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Marginalia: Percakapan dengan Penulis',
        paragraphs: [
          'Buku yang paling hidup adalah buku yang di tepi halamannya penuh dengan catatan kecil pembaca: tanda tanya, sanggahan singkat, atau tanggal ketika sebuah kalimat tiba-tiba terasa relevan dengan pengalaman pribadi.',
          'Ketika kita menuliskan catatan baca, kita mengubah tindakan pasif menerima informasi menjadi dialog aktif lintas zaman. Penulis mungkin telah tiada berabad-abad lampau, namun gagasannya hidup kembali setiap kali pembaca baru memberi tanggapan.',
          'Jangan takut mengoreksi argumen yang Anda baca. Perpustakaan terbaik bukanlah ruang pemujaan dogma, melainkan bengkel pemikiran tempat gagasan diuji ulang.'
        ]
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Disiplin Kesunyian Harian',
        paragraphs: [
          'Sunyi tidak harus dicari di puncak gunung yang jauh dari kota. Sunyi dapat dibangun selama tiga puluh menit setiap malam di sudut meja kayu, di bawah cahaya lampu baca yang hangat, dengan satu buku terbuka dan perangkat komunikasi disingkirkan.',
          'Dalam kesunyian yang disengaja itulah ingatan jangka panjang bekerja menyambungkan kepingan pengalaman hari itu menjadi kebijaksanaan yang tenang.'
        ]
      }
    ]
  },
  {
    id: 'ekologi-kanopi-kalimantan',
    accessionNumber: 'ACC. 2026.02.03',
    title: 'Flora Kanopi dan Jaringan Hutan Hujan',
    subtitle: 'Atlas Botani Ilmiah tentang Pakis Epifit, Mikoriza, dan Siklus Air',
    author: 'Dr. Nadia Lestariningrum',
    authorMeta: 'Ahli Ekologi Hutan Tropis & Kurator Herbarium',
    category: 'Sains',
    year: 2024,
    publisher: 'Akademi Sains Khatulistiwa',
    isbn: '978-602-9918-47-6',
    language: 'Bahasa Indonesia',
    pages: 276,
    readCount: 890,
    coverImage: '/src/assets/images/cover_ekologi_hutan_1795676101595.jpg',
    coverTone: 'forest',
    synopsis:
      'Pengantar ilmiah yang memikat mengenai kehidupan tersembunyi empat puluh meter di atas permukaan tanah hutan hujan Kalimantan dan Sumatra—tempat ribuan spesies paku-pakuan, anggrek, dan jaringan jamur menjaga siklus hujan tropis.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Dunia di Atas Empat Puluh Meter',
        pullQuote:
          'Separuh keanekaragaman hayati hutan tropis tidak berjalan di atas tanah berlumpur, melainkan menggantung di antara cabang pohon raksasa yang diselimuti kabut pagi.',
        paragraphs: [
          'Jika seseorang berjalan di dasar hutan primer Dipterokarpa pada siang hari, ia akan merasakan suasana remang yang lembap dan sunyi. Namun tepat di atas kepala, di lapisan kanopi setinggi gedung lima belas lantai, berlangsung ekosistem yang sangat sibuk dan kaya cahaya.',
          'Pakis sarang burung dan puluhan jenis epifit menempel pada lekuk kulit kayu tua tanpa menjadi parasit bagi inangnya. Akar-akarnya membentuk keranjang alami yang menampung guguran daun dan air hujan, menciptakan tanah gantung subur di udara.',
          'Dari mikro-habitat kecil ini, serangga penyerbuk, katak pohon, hingga burung pemakan nektar memperoleh sumber air dan tempat berlindung sepanjang musim kemarau.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Bahasa Kimia di Bawah Lantai Hutan',
        paragraphs: [
          'Jauh di bawah akar pohon meranti dan ulin, benang-benang halus jamur mikoriza menghubungkan ratusan individu pohon yang berbeda spesies. Melalui jaringan simbiosis ini, pohon induk menyalurkan karbon dan nutrisi mineral kepada bibit muda yang tumbuh di tempat teduh.',
          'Hutan hujan bukanlah kumpulan batang kayu yang berdiri sendiri-sendiri, melainkan satu organisme kolektif yang saling menopang melalui pertukaran unsur hara dan sinyal kimia ketika serangan hama terjadi.'
        ]
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Pompa Air Bernama Evapotranspirasi',
        paragraphs: [
          'Setiap pohon dewasa di hutan hujan menguapkan ratusan liter air ke atmosfer setiap hari melalui stomata daunnya. Uap air tersebut membentuk sungai-sungai awan di langit yang kemudian turun kembali sebagai hujan di wilayah pertanian ratusan kilometer jauhnya.',
          'Memahami anatomi daun dan akar hutan tropis berarti memahami bahwa kelangsungan air minum kota-kota besar bergantung langsung pada utuhnya sabuk hijau di hulu sungai.'
        ]
      }
    ]
  },
  {
    id: 'sejarah-komputasi-astrolab',
    accessionNumber: 'ACC. 2026.02.11',
    title: 'Dari Astrolab ke Mesin Logika',
    subtitle: 'Evolusi Alat Hitung Mekanis, Algoritma Klasik, dan Komputasi Modern',
    author: 'Ir. Hendra Pratama, M.Sc.',
    authorMeta: 'Peneliti Sejarah Ilmu Komputer & Sistem Terdistribusi',
    category: 'Teknologi',
    year: 2025,
    publisher: 'Pustaka Rekayasa Informatika',
    isbn: '978-623-4102-88-2',
    language: 'Bahasa Indonesia',
    pages: 340,
    readCount: 1510,
    coverImage: '/src/assets/images/cover_algoritma_kuno_1795676102267.jpg',
    coverTone: 'umber',
    synopsis:
      'Menghubungkan tradisi matematika kuno—mulai dari piringan astrolab kuningan dan risalah aljabar Al-Khwarizmi hingga mesin analitik abad ke-19 dan arsitektur prosesor masa kini—dengan bahasa yang jernih dan terstruktur.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Komputer Analog Pertama dari Kuningan',
        pullQuote:
          'Sebelum listrik mengalir di atas papan silikon, manusia sudah menanamkan rumus trigonometri ke dalam gigi roda kuningan.',
        paragraphs: [
          'Astrolab sering hanya diingat sebagai instrumen astronomi kuno yang indah. Sesungguhnya, lempeng-lempeng kuningan yang dapat diputar itu adalah komputer analog portabel yang mampu memecahkan puluhan persoalan penentuan waktu, ketinggian bintang, dan arah kiblat hanya dalam hitungan detik tanpa satu pun perkalian manual.',
          'Prinsip dasarnya sama dengan perangkat lunak modern: mengabstraksikan perhitungan matematis yang rumit ke dalam antarmuka fisik yang intuitif. Pengguna cukup menyelaraskan garis cakrawala dengan posisi bintang tertentu untuk membaca hasil seketika.',
          'Dari sinilah lahir keyakinan ilmiah bahwa proses berpikir deduktif dapat diterjemahkan menjadi langkah-langkah mekanis yang pasti dan dapat diulang siapa saja.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Lahirnya Konsep Prosedur Langkah Demi Langkah',
        paragraphs: [
          'Kata algoritma berakar dari nama ilmuwan abad kesembilan Muhammad ibn Musa al-Khwarizmi, yang bukunya memperkenalkan sistem angka desimal serta prosedur sistematis untuk menyelesaikan persamaan kuadrat dan pembagian waris.',
          'Kekuatan prosedur langkah demi langkah terletak pada determinisme: jika setiap langkah didefinisikan tanpa ambiguitas, maka manusia maupun mesin dapat mencapai solusi yang identik dengan ketelitian sempurna.'
        ]
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Kartu Berlubang dan Mesin Tenun Jacquard',
        paragraphs: [
          'Ketika Joseph Marie Jacquard merancang alat tenun otomatis berbasis kartu berlubang pada awal abad kesembilan belas, ia secara tidak sengaja menciptakan konsep pemrograman biner: lubang berarti kait terangkat, tidak berlubang berarti diam.',
          'Gagasan sederhana inilah yang kemudian menginspirasi Charles Babbage dan Ada Lovelace untuk membayangkan Mesin Analitik—mesin pertama yang tidak hanya mengolah angka, tetapi juga mampu memanipulasi simbol musik dan bahasa.'
        ]
      },
      {
        id: 'bab-4',
        number: 4,
        title: 'Tanggung Jawab Merancang Sistem Digital',
        paragraphs: [
          'Mempelajari sejarah panjang alat hitung mengingatkan kita bahwa teknologi tidak pernah netral dari nilai kemanusiaan. Setiap generasi perancang sistem memikul tanggung jawab untuk memastikan kejelasan, keterbukaan, dan daya tahan jangka panjang bagi pengetahuan umat manusia.'
        ]
      }
    ]
  },
  {
    id: 'hikayat-kota-pelabuhan',
    accessionNumber: 'ACC. 2026.02.19',
    title: 'Surat-Surat dari Kota Pelabuhan Lama',
    subtitle: 'Novel Sejarah tentang Penerjemah Naskah, Mercusuar, dan Musim Hujan',
    author: 'Laksmi Paramita',
    authorMeta: 'Novelis & Penerjemah Sastra Indonesia',
    category: 'Sastra',
    year: 2023,
    publisher: 'Surya Aksara Sastra',
    isbn: '978-602-4412-55-7',
    language: 'Bahasa Indonesia',
    pages: 296,
    readCount: 1320,
    coverTone: 'lapis',
    synopsis:
      'Berlatar sebuah kota pelabuhan di pesisir utara Jawa pada akhir dekade 1920-an, novel ini mengikuti perjalanan seorang juru arsip muda yang menemukan peti kayu berisi surat-surat tak terkirim di lantai dasar kantor pabean.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Peti Kayu di Gudang Pabean',
        pullQuote:
          'Di kota pelabuhan, semua hal datang dan pergi bersama pasang surut air laut, kecuali kenangan yang tertinggal di dalam arsip.',
        paragraphs: [
          'Hujan bulan November selalu turun miring dari arah laut, membasahi tembok kapur gudang pabean yang catnya mulai mengelupas. Bagus Dharmawan baru bekerja tiga bulan sebagai juru catat dokumen kapal ketika kepala gudang memintanya merapikan ruang bawah tanah yang lembap.',
          'Di sudut ruangan, di balik tumpukan buku bea cukai tahun 1894, berdiri sebuah peti kayu kamper berengsel kuningan. Di dalamnya tidak terdapat barang selundupan, melainkan tiga puluh delapan amplop bersegel lilin merah yang alamat tujuannya telah pudar oleh waktu.',
          'Malam itu, di bawah lampu minyak ruang bacanya, Bagus membuka amplop pertama dan menemukan tulisan tangan rapi berbahasa Melayu tinggi dan Belanda, ditulis oleh seorang penjaga mercusuar di selat timur.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Penjaga Lampu di Karang Terluar',
        paragraphs: [
          'Surat-surat tersebut berkisah tentang hari-hari panjang di menara batu setinggi tiga puluh meter, tempat cahaya lampu minyak harus diputar setiap empat jam agar kapal dagang tidak kandas menabrak gugusan karang.',
          'Dalam setiap lembar kertas, sang penulis mencatat jumlah kapal yang melintas, warna langit sebelum badai, serta kerinduannya pada toko buku kecil di dekat alun-alun kota.'
        ]
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Menyusuri Alamat yang Hilang',
        paragraphs: [
          'Berbekal daftar nama jalan lama, Bagus menghabiskan akhir pekannya berjalan kaki melewati kampung pecinan, dermaga kayu, dan kompleks rumah tua demi mencari ahli waris penerima surat.',
          'Pencarian tersebut membawanya mengenal seorang guru bahasa tua yang menyimpan separuh jawaban dari kisah tiga puluh tahun silam.'
        ]
      }
    ]
  },
  {
    id: 'tipografi-dan-buku',
    accessionNumber: 'ACC. 2026.03.02',
    title: 'Anatomi Halaman dan Seni Huruf Cetak',
    subtitle: 'Panduan Tata Letak Buku, Proporsi Kertas, dan Keterbacaan Klasik',
    author: 'Baskoro Santoso',
    authorMeta: 'Desainer Buku & Pengajar Tipografi Editorial',
    category: 'Arsitektur',
    year: 2024,
    publisher: 'Studio Cetak Merdeka',
    isbn: '978-623-1129-70-3',
    language: 'Bahasa Indonesia',
    pages: 210,
    readCount: 745,
    coverTone: 'stone',
    synopsis:
      'Menguraikan prinsip abadi desain halaman buku—dari rasio margin kanon Renaissance, pemilihan lebar kolom 65 karakter, hingga penyesuaian tipografi untuk pembaca digital masa kini.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Ruang Putih sebagai Bingkai Makna',
        pullQuote:
          'Tipografi yang baik ibarat gelas kristal bening: kita tidak sibuk mengagumi kacanya, melainkan langsung menikmati jernihnya isi di dalamnya.',
        paragraphs: [
          'Pembaca pemula sering mengira halaman yang penuh sesak huruf lebih hemat dan padat isi. Padahal, tanpa ruang putih di margin kiri, kanan, atas, dan bawah, mata pembaca kehilangan titik istirahat dan cepat lelah.',
          'Margin bagian dalam dan luar dirancang bukan sekadar hiasan estetika, melainkan ruang bagi ibu jari untuk memegang buku tanpa menutupi satu huruf pun.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Ritme Baris dan Panjang Kalimat',
        paragraphs: [
          'Penelitian keterbacaan selama lebih dari satu abad menunjukkan bahwa panjang baris ideal berkisar antara enam puluh hingga tujuh puluh lima karakter. Terlalu pendek akan memutus alur pikir; terlalu panjang menyulitkan mata mencari awal baris berikutnya.',
          'Dalam pembaca buku digital modern, memberi kendali ukuran huruf dan jarak baris kepada pembaca adalah bentuk penghormatan terhadap keragaman penglihatan manusia.'
        ]
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Hierarki Judul, Catatan Kaki, dan Indeks',
        paragraphs: [
          'Buku referensi yang matang selalu menyediakan jalan masuk berlapis: daftar isi yang jernih, penomoran bab yang konsisten, serta indeks istilah yang memudahkan peneliti menemukan kembali kutipan penting dalam hitungan detik.'
        ]
      }
    ]
  },
  {
    id: 'antologi-puisi-pesisir',
    accessionNumber: 'ACC. 2026.03.10',
    title: 'Catatan Musim Angin Timur',
    subtitle: 'Antologi Sajak tentang Garam, Perahu Kayu, dan Senja Pelabuhan',
    author: 'Maira Chairunnisa',
    authorMeta: 'Penyair & Esais Kebudayaan Pesisir',
    category: 'Sastra',
    year: 2025,
    publisher: 'Balai Puisi Nusantara',
    isbn: '978-623-8801-21-5',
    language: 'Bahasa Indonesia',
    pages: 136,
    readCount: 980,
    coverTone: 'forest',
    synopsis:
      'Enam puluh sajak lirik yang merayakan kesederhanaan hidup masyarakat pesisir—dari tambak garam di Madura hingga dermaga nelayan di Sulawesi—ditulis dengan citraan bening dan irama yang tenang.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Bagian I: Pagi di Tambak Garam',
        pullQuote:
          'Laut tidak pernah menyimpan dendam pada perahu kecil; ia hanya menguji kesabaran layar dan keteguhan tali.',
        paragraphs: [
          'Di atas petak tanah liat yang retak oleh kemarau, kristal-kristal putih tumbuh perlahan dari air laut yang menguap. Para petani garam bekerja sebelum matahari meninggi, membalik papan kayu dengan langkah terukur seperti membaca doa lama.',
          'Angin timur membawa aroma yodium dan kayu bakar dari dapur pesisir, menyatukan suara ombak kecil dengan percakapan singkat para ibu yang menyortir ikan hasil tangkapan semalam.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Bagian II: Menunggu Perahu Pulang',
        paragraphs: [
          'Senja di bibir pantai selalu berwarna tembaga pucat sebelum berubah menjadi biru tua. Anak-anak duduk di ujung pemecah gelombang, mengenali bentuk layar ayah mereka jauh sebelum lambung perahu terlihat utuh.',
          'Ketika tali tambat akhirnya diikatkan pada tonggak kayu ulin, seluruh desa menghela napas lega; malam ini lampu teras akan menyala sedikit lebih lama.'
        ]
      }
    ]
  },
  {
    id: 'fisika-cahaya-optik',
    accessionNumber: 'ACC. 2026.03.17',
    title: 'Pengantar Optik dan Sifat Gelombang Cahaya',
    subtitle: 'Dari Eksperimen Prisma Klasik hingga Serat Optik Komunikasi Modern',
    author: 'Dr. Teguh Budiman',
    authorMeta: 'Fisikawan Eksperimental & Dosen Optik Terapan',
    category: 'Sains',
    year: 2024,
    publisher: 'Penerbit Ilmu Dasar',
    isbn: '978-602-3390-64-1',
    language: 'Bahasa Indonesia',
    pages: 264,
    readCount: 670,
    coverTone: 'charcoal',
    synopsis:
      'Penjelasan jernih tentang bagaimana cahaya merambat, membiaskan diri melewati lensa kaca, dan menjadi tulang punggung jaringan internet global melalui kabel serat optik di dasar samudra.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Perdebatan Partikel dan Gelombang',
        pullQuote:
          'Memahami cahaya berarti menerima bahwa alam semesta tidak selalu tunduk pada kategori sempit akal sehat manusia sehari-hari.',
        paragraphs: [
          'Selama berabad-abad, para ilmuwan terbelah antara pandangan bahwa cahaya terdiri dari butiran halus yang melesat lurus dan keyakinan bahwa cahaya adalah riak gelombang di dalam medium tak kasatmata.',
          'Eksperimen celah ganda Thomas Young pada awal abad kesembilan belas memperlihatkan pola interferensi terang-gelap yang tidak terbantahkan: dua berkas cahaya dapat saling menguatkan atau meniadakan persis seperti riak air di permukaan kolam.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Pemantulan Sempurna dalam Serat Kaca',
        paragraphs: [
          'Prinsip fisika sederhana berupa pemantulan internal total memungkinkan seberkas laser terkurung di dalam inti kaca sehalus rambut manusia dan menempuh jarak ribuan kilometer di dasar laut dengan kehilangan sinyal minimal.',
          'Setiap halaman buku digital yang Anda baca hari ini kemungkinan besar melintasi benua sebagai pulsa cahaya terenkripsi sebelum diterjemahkan kembali menjadi aksara di layar.'
        ]
      }
    ]
  },
  {
    id: 'sejarah-rempah-jalur-sutra',
    accessionNumber: 'ACC. 2026.03.25',
    title: 'Jaringan Niaga Samudra Hindia',
    subtitle: 'Perdagangan Kapur Barus, Cengkih, dan Pertukaran Pengetahuan Abad X–XVI',
    author: 'Dr. Farhan Al-Khatib',
    authorMeta: 'Peneliti Sejarah Ekonomi & Perdagangan Lintas Samudra',
    category: 'Sejarah',
    year: 2025,
    publisher: 'Pustaka Maritim Nusantara',
    isbn: '978-623-7021-44-0',
    language: 'Bahasa Indonesia',
    pages: 328,
    readCount: 1090,
    coverTone: 'umber',
    synopsis:
      'Mengkaji peran bandar Barus, Sriwijaya, Majapahit, dan Malaka sebagai simpul kosmopolitan tempat rempah, tekstil, porselen, dan gagasan ilmiah saling bertukar jauh sebelum kedatangan armada kolonial Eropa.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Kapur Barus dan Aroma Dunia Kuno',
        pullQuote:
          'Jauh sebelum cengkih dikenal di pasar Eropa, getah harum dari hutan Sumatra telah menempuh perjalanan ribuan mil menuju istana Tiongkok dan Persia.',
        paragraphs: [
          'Di pantai barat Sumatra, kota pelabuhan kuno Barus dikenal para pelaut Arab, India, dan Tiongkok sebagai sumber kamper terbaik di dunia. Komoditas hutan ini digunakan untuk upacara pengobatan, wewangian kerajaan, hingga pengawetan naskah.',
          'Bukti arkeologis berupa pecahan keramik Dinasti Tang, manik-manik kaca Timur Tengah, dan prasasti berbahasa Tamil menunjukkan betapa multikulturalnya bandar-bandar niaga Nusantara sejak abad kesembilan.'
        ]
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Bahasa Melayu sebagai Lingua Franca Niaga',
        paragraphs: [
          'Ketika pedagang dari Gujarat, Fujian, dan Makassar bertemu di selat yang sama, mereka membutuhkan satu bahasa bersama untuk menimbang barang, mencatat utang piutang, dan menyepakati hukum laut.',
          'Bahasa Melayu pasar tumbuh secara organik menjadi bahasa pergaulan maritim dari pesisir Sumatra hingga Maluku, membawa serta kosakata serapan yang memperkaya khazanah sastra dan hukum dagang Nusantara.'
        ]
      }
    ]
  }
];
