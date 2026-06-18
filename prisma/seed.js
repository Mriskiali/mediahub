// require("dotenv/config");
// const { PrismaClient } = require("@prisma/client");
// const { PrismaPg } = require("@prisma/adapter-pg");

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// const prisma = new PrismaClient({ adapter });

// function slugify(text) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// }

// const seedPosts = [
//   {
//     title: "Misteri Bitrate: Kenapa Video YouTube Buram Saat Ada Confetti?",
//     slug: slugify(
//       "Misteri Bitrate Kenapa Video YouTube Buram Saat Ada Confetti",
//     ),
//     excerpt:
//       "Membahas konsep representasi data video dan efek kompresi lossy pada platform streaming, lengkap dengan studi kasus algoritma bitrate.",
//     content: `Pernahkah kamu menonton video di YouTube, lalu tiba-tiba kualitas gambarnya hancur kotak-kotak saat ada adegan salju turun atau *confetti* berhamburan? Coba perhatikan penjelasan teknis pada video Tom Scott yang tersemat di bawah ini.

// Fenomena ini adalah contoh nyata dari cara kerja **Representasi dan Kompresi Data Video**. Platform *streaming* tidak mengirimkan setiap piksel gambar secara utuh (karena butuh *bandwidth* raksasa). Mereka menggunakan teknik *lossy compression* seperti H.264 atau HEVC.

// ### Cara Kerja Kompresi Video
// Algoritma kompresi video umumnya bekerja dengan membandingkan satu *frame* dengan *frame* berikutnya. Jika kamu merekam orang berbicara dengan latar belakang tembok diam, algoritma hanya akan menyimpan data pergerakan mulut dan mata orang tersebut. Temboknya? Cukup di- *copy-paste* secara digital.

// Namun, ketika *confetti* berhamburan, setiap piksel di layar berubah arah dan warnanya. Algoritma kompresi menjadi "panik" karena tidak ada data yang bisa di- *copy-paste*. Akibatnya, alokasi *bitrate* (jumlah data per detik) tidak cukup untuk menutupi semua perubahan tersebut, sehingga muncul blok-blok piksel kasar yang disebut *macroblocking*.

// *Pada mata kuliah Sistem Multimedia, memahami efisiensi bitrate ini sangat penting agar kita bisa memilih format container (seperti MP4 atau MKV) dan codec yang tepat sesuai kebutuhan project.*`,
//     mediaType: "VIDEO",
//     mediaUrl: "https://www.youtube.com/watch?v=r6Rp-uo6HmI",
//     thumbnailUrl: "https://img.youtube.com/vi/r6Rp-uo6HmI/maxresdefault.jpg",
//     tags: ["video", "kompresi", "bitrate", "codec"],
//     published: true,
//   },
//   {
//     title: "Di Balik Layar Animasi 3D: Dari Wireframe Hingga Rendering",
//     slug: slugify("Di Balik Layar Animasi 3D Dari Wireframe Hingga Rendering"),
//     excerpt:
//       "Mengupas tuntas tahapan representasi data animasi 3D, membedakannya dengan animasi 2D, menggunakan studi kasus film pendek Blender.",
//     content: `Video animasi di atas adalah film pendek berjudul "Spring" yang diproduksi sepenuhnya menggunakan *software* open-source Blender. Hasil visualisasi yang luar biasa tersebut bermula dari representasi matematis titik-titik kordinat (X, Y, Z) dalam ruang digital.

// ### Perbedaan Representasi 2D dan 3D
// Berbeda dengan animasi 2D tradisional di mana animator menggambar setiap *frame* (atau menggunakan teknik *tweening* antar titik 2D), **representasi data animasi 3D** jauh lebih kompleks. Animasi 3D tidak menyimpan "gambar", melainkan menyimpan **data instruksi** geometri.

// Proses pembuatan *(pipeline)* mencakup beberapa tahap krusial:
// 1. **Modeling:** Membentuk *mesh* karakter menggunakan poligon. Semakin banyak poligon (*high-poly*), semakin halus lengkungan karakter, tapi semakin berat ukuran datanya.
// 2. **Rigging & Skinning:** Membangun "tulang" digital di dalam model agar karakter bisa digerakkan.
// 3. **Texturing:** Membungkus *mesh* 3D dengan citra statis 2D (seperti memberi kulit pada tulang).
// 4. **Rendering:** Proses kalkulasi matematis yang dilakukan oleh kartu grafis (GPU) untuk menghitung pantulan cahaya, bayangan, dan fisika material menjadi output video.

// Bagi mahasiswa IT yang minat masuk industri *game development*, pemahaman soal *polygon count* dan efisiensi *rendering* adalah harga mati.`,
//     mediaType: "VIDEO",
//     mediaUrl: "https://www.youtube.com/watch?v=WhWc3b3KhnY",
//     thumbnailUrl: "https://img.youtube.com/vi/WhWc3b3KhnY/maxresdefault.jpg",
//     tags: ["animasi", "3d", "blender", "rendering"],
//     published: true,
//   },
//   {
//     title:
//       "Mengapa Resolusi Netflix Bisa Naik Turun Sendiri? Mengenal Adaptive Bitrate Streaming",
//     slug: slugify(
//       "Mengapa Resolusi Netflix Bisa Naik Turun Sendiri Mengenal Adaptive Bitrate Streaming",
//     ),
//     excerpt:
//       "Penjelasan mengenai protokol HLS dan DASH yang memungkinkan video streaming menyesuaikan kualitas dengan kecepatan internet pengguna.",
//     content: `Lagi asik-asiknya nonton serial favorit di Netflix atau YouTube, tiba-tiba gambar jadi buram selama beberapa detik, lalu perlahan kembali jernih. Kok bisa server tahu internet kita lagi lemot dan otomatis nurunin kualitas videonya tanpa bikin putus-putus (*buffering*)?

// Sebagai referensi visual, video di atas adalah *Big Buck Bunny*. Buat kamu yang belum tahu, ini adalah film *open-source* yang sering banget dipake sama *Software Engineer* Netflix atau YouTube untuk ngetes sistem *streaming* mereka karena adegannya punya kompleksitas warna dan gerak yang tinggi.

// Jawabannya ada di teknologi multimedia yang bernama **Adaptive Bitrate Streaming (ABR)**. Protokol populer yang sering dipakai adalah HLS (HTTP Live Streaming) dari Apple dan MPEG-DASH.

// ### Cara Kerjanya Gimana?
// Saat tim Netflix mengunggah satu film ke server, sistem mereka tidak hanya menyimpan satu file video raksasa. Mesin *encoder* akan "mencacah" video tersebut menjadi potongan-potongan kecil berdurasi 2 sampai 10 detik (disebut *chunks*). Ajaibnya, setiap potongan ini dibuat dalam berbagai varian resolusi dan ukuran: dari 144p yang super burik, sampai 4K HDR yang super tajam.

// Ketika kamu memutar videonya, *video player* di aplikasimu secara terus-menerus memantau kecepatan *bandwidth* internetmu.
// - Detik ke 0-10: Internet ngebut? Minta *chunk* resolusi 1080p.
// - Detik ke 11-20: Tiba-tiba ada yang nyalain *download* IDM di rumah? *Player* bakal otomatis *request chunk* resolusi 480p ke server untuk potongan video selanjutnya biar tontonanmu gak nge- *freeze*.

// *Teknologi inilah yang bikin arsitektur sistem multimedia modern sangat dinamis dan memanjakan user experience.*`,
//     mediaType: "VIDEO",
//     mediaUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
//     thumbnailUrl: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
//     tags: ["video", "streaming", "hls", "dash", "netflix"],
//     published: true,
//   },
//   {
//     title:
//       "Frame Rate vs Refresh Rate: Mitos Mata Manusia Cuma Bisa Lihat 30 FPS",
//     slug: slugify(
//       "Frame Rate vs Refresh Rate Mitos Mata Manusia Cuma Bisa Lihat 30 FPS",
//     ),
//     excerpt:
//       "Meluruskan kesalahpahaman umum tentang Frame Per Second pada video dan Refresh Rate pada monitor dalam sistem multimedia.",
//     content: `Dulu banget, ada mitos yang sering beredar di kalangan *gamer* dan penikmat film: "Mata manusia cuma bisa memproses gambar sampai 30 FPS (Frame Per Second), jadi lebih dari itu nggak ada gunanya". Padahal, secara anatomis, mata dan otak kita sanggup mendeteksi kedipan layar hingga di atas 200 Hz!

// Video yang tersemat di atas adalah "Sintel", salah satu proyek ambisius dari Blender yang sering disajikan dalam format 60 FPS untuk menguji seberapa *smooth* layar kamu bisa nampilin transisi *frame*. Di dalam pengolahan media digital, kita harus bisa membedakan dua istilah penting ini:

// ### 1. Frame Rate (FPS) - Urusan Dapur si Media
// Ini adalah jumlah gambar statis (*frame*) yang digenerate oleh *software* atau dimainkan oleh file videomu dalam satu detik. Film bioskop standarnya pakai 24 FPS biar ada efek *motion blur* yang sinematik. Sedangkan *game* FPS (*First Person Shooter*) butuh minimal 60 FPS biar gerakannya nggak patah-patah pas karaktermu lari.

// ### 2. Refresh Rate (Hz) - Urusan Hardware si Monitor
// Ini adalah seberapa sering monitor laptop atau HP-mu sanggup menggambar ulang piksel layar dalam satu detik. Monitor standar kantoran biasanya cuma 60Hz. HP *flagship* sekarang rata-rata 120Hz.

// **Masalahnya muncul pas dua hal ini nggak sinkron.**
// Percuma kamu *render* video animasi 120 FPS dan di-*play* di laptop biasa, karena monitornya cuma sanggup nampilin 60 gambar per detiknya (60Hz). Hasil sisanya? Kebuang sia-sia atau malah bikin efek robek di layar yang disebut *Screen Tearing*. Makanya, integrasi *software* dan *hardware* di sistem multimedia itu nggak bisa dipisahin.`,
//     mediaType: "VIDEO",
//     mediaUrl: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
//     thumbnailUrl: "https://img.youtube.com/vi/YE7VzlLtp-4/maxresdefault.jpg",
//     tags: ["video", "fps", "hz", "hardware", "refresh-rate"],
//     published: true,
//   },
//   {
//     title:
//       "Revolusi Codec: Rahasia Dibalik Video 4K yang Gak Bikin Penuh Hardisk",
//     slug: slugify(
//       "Revolusi Codec Rahasia Dibalik Video 4K yang Gak Bikin Penuh Hardisk",
//     ),
//     excerpt:
//       "Penjelasan sistematis mengenai transisi format H.264 ke H.265 (HEVC) dan bagaimana algoritma ini menyelamatkan industri video streaming.",
//     content: `Coba bayangin, resolusi video 4K itu ukurannya empat kali lipat lebih besar dari layar Full HD (1080p). Logikanya, ukuran file videonya pasti bakal meledak empat kali lipat juga kan? Tapi kok sekarang kita bisa nyaman ngerekam video 4K berjam-jam di iPhone atau Android tanpa takut *storage* langsung abis?

// Semua ini berkat pahlawan tanpa tanda jasa di dunia multimedia: **Video Codec (Coder-Decoder)**. Dan bintang utamanya saat ini adalah transisi dari H.264 (AVC) ke **H.265 (HEVC - High Efficiency Video Coding)**.

// Video di atas (*Tears of Steel*) adalah proyek *visual effect* yang sering banget dipake akademisi buat ngebandingin kualitas kompresi berbagai jenis *codec* ini.

// ### Kenapa H.265 Jauh Lebih Sakti?
// Kalau H.264 membagi layar video menjadi kotak-kotak kecil statis berukuran 16x16 piksel (disebut *macroblocks*) buat nyari data warna yang sama buat di-*compress*. Nah, H.265 (HEVC) jauh lebih pinter. Dia pakai struktur blok dinamis yang ukurannya bisa melar sampai 64x64 piksel, tergantung seberapa ribet gambar di area itu.

// Area langit biru yang luas dan gak ada pergerakan? Langsung dibabat pakai 1 blok raksasa 64x64 (ngirit data ekstrim). Area wajah yang banyak detail? Dipecah jadi blok-blok super kecil.

// Hasilnya, file video bisa **50% lebih kecil** dari H.264 dengan kualitas gambar yang sama persis di mata kita. Kekurangannya cuma satu: *hardware* (prosesor) kamu bakal disuruh kerja rodi lebih keras buat nge-*decode* algoritma matematika ini pas videonya di-*play*. Itulah kenapa PC jadul kadang nge- *lag* kalau muter video HEVC.`,
//     mediaType: "VIDEO",
//     mediaUrl: "https://www.youtube.com/watch?v=OH_T_F41Mv0",
//     thumbnailUrl: "https://img.youtube.com/vi/OH_T_F41Mv0/maxresdefault.jpg",
//     tags: ["video", "codec", "hevc", "h265", "kompresi"],
//     published: true,
//   },

//   {
//     title:
//       "Membedah Format Audio: MP3 vs FLAC, Apakah Telinga Kita Tahu Bedanya?",
//     slug: slugify(
//       "Membedah Format Audio MP3 vs FLAC Apakah Telinga Kita Tahu Bedanya",
//     ),
//     excerpt:
//       "Penjelasan teknis mengenai kompresi suara Lossless dan Lossy, serta dampaknya pada kualitas produksi multimedia.",
//     content: `Coba dengarkan pemutar audio interaktif di halaman ini. Itu adalah sampel audio dengan kompresi standar (MP3). Pertanyaannya, apakah kamu bisa membedakan suaranya dengan format *mastering* studio yang ukurannya 10 kali lebih besar?

// ### Representasi Audio Digital
// Suara sejatinya adalah gelombang analog kontinu. Agar bisa disimpan di komputer, gelombang ini harus "dicacah" menjadi data digital melalui proses *sampling* dan *quantization*. Standar CD audio menggunakan *sample rate* 44.1 kHz (mengambil 44.100 sampel suara per detik) dengan bit-depth 16-bit.

// ### Perang Kompresi: Lossless vs Lossy
// - **Lossless (Contoh: FLAC, WAV):** Memampatkan ukuran file tanpa membuang satu pun data frekuensi suara aslinya. Ibarat me-ZIP sebuah dokumen, saat dibuka isinya 100% sama. Cocok untuk arsip studio.
// - **Lossy (Contoh: MP3, AAC):** Format ini sangat pintar. Algoritmanya memanfaatkan *psychoacoustic* (batasan pendengaran manusia). Frekuensi yang tertutup oleh suara alat musik dominan atau di luar batas pendengaran kita (di atas 20kHz) akan "dibuang" permanen.

// Hasilnya? File MP3 bisa berukuran 5 MB saja sementara versi FLAC-nya 40 MB. Walaupun datanya ada yang hilang, telinga orang awam yang mendengarkan melalui *earphone* standar tidak akan sadar ada instrumen mikro yang dihilangkan.`,
//     mediaType: "AUDIO",
//     mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=1200&q=80",
//     tags: ["audio", "kompresi", "mp3", "flac"],
//     published: true,
//   },
//   {
//     title: "Nyemplung ke Dunia Podcast? Pahami Dulu Sample Rate dan Bit Depth",
//     slug: slugify(
//       "Nyemplung ke Dunia Podcast Pahami Dulu Sample Rate dan Bit Depth",
//     ),
//     excerpt:
//       "Panduan dasar pengolahan audio digital untuk kreator konten: Memilih spesifikasi rekaman yang tepat tanpa bikin hardisk jebol.",
//     content: `Semenjak tren *podcast* merajalela, banyak mahasiswa multimedia yang mulai iseng bikin *setup* rekaman sendiri di kamar. Tapi sayangnya, pas nge- *export* hasil rekaman dari Adobe Audition atau Audacity, masih banyak yang bingung ngisi angka di kolom "Sample Rate" dan "Bit Depth". Alhasil, suaranya kadang cempreng, atau ukuran file-nya jadi bengkak nggak karuan.

// ### Konsep Dasarnya Gini
// Komputer kan nggak paham suara, dia cuma paham angka 0 dan 1. Biar suara vokal kamu bisa masuk PC, *Soundcard* atau *Audio Interface* bakal melakukan konversi analog ke digital.

// 1. **Sample Rate:** Ibarat *frame rate* pada video. Ini adalah seberapa sering komputer "memfoto" gelombang suaramu dalam satu detik. Standarnya adalah **44.100 Hz (44.1 kHz)**. Kenapa segitu? Karena menurut Teorema Nyquist-Shannon, buat merekam batas maksimal pendengaran manusia (20 kHz), kita butuh alat perekam dengan kecepatan minimal dua kali lipatnya (sekitar 40 kHz).
// 2. **Bit Depth:** Ini soal resolusi dinamis suara (seberapa senyap sampai seberapa keras). Makin tinggi *bit depth*, makin kecil *noise* atau suara desis statis pas kamu lagi diem. Standar CD itu **16-bit**, tapi buat rekaman mentah (biar aman pas di- *edit*), teknisi audio lebih milih **24-bit**.

// Jadi kesimpulannya, kalau kamu cuma mau *upload* tugas kuliah berupa rekaman *voiceover* biasa, nge-set di 44.1kHz dan 16-bit mp3 (192 kbps) udah lebih dari cukup, kok! Dengarkan contoh audio terlampir untuk membuktikan kualitasnya.`,
//     mediaType: "AUDIO",
//     mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1200&q=80",
//     tags: ["audio", "podcast", "sample-rate", "rekaman"],
//     published: true,
//   },
//   {
//     title: "Spatial Audio: Rahasia Suara Tembakan di Game FPS Terasa Nyata",
//     slug: slugify(
//       "Spatial Audio Rahasia Suara Tembakan di Game FPS Terasa Nyata",
//     ),
//     excerpt:
//       "Bagaimana sistem komputasi memanipulasi frekuensi audio untuk mengecoh otak kita agar bisa menebak arah suara dalam ruang 3 dimensi.",
//     content: `Main Valorant, PUBG, atau CS2 tanpa *headset* itu ibarat main bola sambil tutup mata—pasti gampang mati konyol gara-gara disergap musuh dari belakang. Pertanyaannya, *headset* kita kan cuma punya dua *speaker* (kiri dan kanan), tapi kok bisa kita nebak musuhnya jalan dari arah serong kanan belakang?

// Itu karena *engine* game mengimplementasikan representasi data suara berbasis ruang, atau yang kerennya disebut **Spatial Audio** / 3D Audio.

// ### Mengecoh Otak Manusia
// Sistem multimedia pada game menggunakan perhitungan matematis rumit yang dinamakan **HRTF (Head-Related Transfer Function)**. Algoritma ini meniru cara gelombang suara memantul di daun telinga, kepala, dan bahu kita sebelum masuk ke gendang telinga.

// Kalau ada ledakan dari sebelah kanan:
// 1. Suara pasti masuk ke telinga kanan lebih cepat beberapa milidetik.
// 2. Telinga kiri tetap dengar, tapi frekuensi tinggi (*treble*)-nya udah banyak yang redam karena terhalang oleh tengkorak kepala kita sendiri (*Head Shadowing*).

// Nah, *software* pengolah audio di dalam game akan memanipulasi sampel suara tembakan biasa, menambahkan jeda waktu super kecil, dan memotong frekuensi tertentunya secara *real-time* sesuai posisi karaktermu. Hasilnya? Otak kita tertipu dan meyakini kalau suaranya beneran berasal dari dunia nyata! Silakan play *track* audio di atas dengan menggunakan earphone untuk merasakan sensasi suara *stereo* yang kaya.`,
//     mediaType: "AUDIO",
//     mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=80",
//     tags: ["audio", "spatial", "gaming", "hrtf"],
//     published: true,
//   },
//   {
//     title: "Ilmu Fisika di Balik Fitur ANC (Active Noise Cancelling) pada TWS",
//     slug: slugify(
//       "Ilmu Fisika di Balik Fitur ANC Active Noise Cancelling pada TWS",
//     ),
//     excerpt:
//       "Membedah konsep pengolahan sinyal digital (DSP) dan inversi gelombang yang memungkinkan TWS memblokir suara bising lingkungan.",
//     content: `Zaman sekarang, hampir semua orang pakai TWS (*True Wireless Stereo*) atau AirPods pas lagi *commute* di KRL biar nggak keganggu berisiknya mesin kereta. Fitur andalan yang dijual mahal sama pabrikan adalah **ANC (Active Noise Cancelling)**.

// Banyak yang ngira ini semacam sihir kedap suara. Padahal, ini adalah murni aplikasi ilmu pengolahan sinyal multimedia digital (Digital Signal Processing). Coba dengerin sampel instrumen audio di atas pakai TWS lu, dan rasain bedanya pas ANC dinyalain sama dimatiin.

// ### Inversi Fase: Melawan Api dengan Api
// Secara teknis, suara lingkungan (bising mesin) itu bentuk fisiknya adalah gelombang udara. Nah, TWS yang ada fitur ANC-nya punya *microphone* kecil yang ngarah ke luar.
// Kerja *mic* ini spesifik banget:
// 1. Merekam pola gelombang kebisingan secara *real-time*.
// 2. Mengirim data ke *chip* prosesor kecil di dalam *earphone*.
// 3. Prosesor ini akan men- *generate* gelombang audio balasan secara instan, namun dengan **fase yang persis berlawanan 180 derajat** (di- *invert*).

// Ilmu fisikanya: Jika gelombang positif (puncak) bertemu gelombang negatif (lembah) dengan amplitudo yang sama persis, mereka akan saling membatalkan satu sama lain menjadi angka 0 (suara senyap). Gila, kan? Teknologi ini nge-*process* matematika kompleks tersebut ribuan kali dalam satu detik!`,
//     mediaType: "AUDIO",
//     mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
//     tags: ["audio", "anc", "noise-cancelling", "dsp", "tws"],
//     published: true,
//   },
//   {
//     title: "Format MIDI: Bukti Kalau Audio Nggak Melulu Berupa Gelombang Suara",
//     slug: slugify(
//       "Format MIDI Bukti Kalau Audio Nggak Melulu Berupa Gelombang Suara",
//     ),
//     excerpt:
//       "Mempelajari perbedaan fundamental antara data audio digital (Waveform) dengan standar instrumen digital (MIDI).",
//     content: `Kalau kamu buka *software* pembuat musik kayak FL Studio atau Ableton, kamu bakal sering bersinggungan sama data bernama MIDI (*Musical Instrument Digital Interface*). Format ini unik banget dalam sistem multimedia, karena secara teknis **MIDI bukanlah file suara**. Lho kok bisa?

// Coba *play* sampel audio yang ada di artikel ini. Suara synth dan drum itu direkam dalam bentuk MP3 (data gelombang suara). Kalau *file* MP3 ini ibarat "hasil rekaman video" orang lagi masak, maka MIDI itu ibarat "buku resep"-nya.

// ### Data Instruksi, Bukan Waveform
// File MIDI ukurannya super duper kecil (cuma beberapa Kilobyte) karena dia nggak nyimpen sampel gelombang sama sekali. Isinya cuma baris-baris instruksi digital buat alat musik elektronik atau *software synthesizer*, isinya kira-kira begini:
// * "Pencet tuts piano nada C4 di detik ke-1."
// * "Tekan sekuat 80% (*velocity*)."
// * "Tahan selama 2 detik, lalu lepas."

// Karena sifatnya cuma instruksi teks/data, file MIDI yang sama bisa di-*play* bunyinya jadi suara piano klasik, bisa diganti bunyinya jadi gitar distorsi metal, atau bahkan jadi suara drum sintesis 8-bit ala game Mario Bros.

// Representasi data semacam ini ngajarin *programmer* kalau kita kadang nggak perlu nyimpen data hasil akhirnya (*output*), cukup simpan *logic* dan parameter pembuatannya aja untuk menekan beban *storage* secara drastis!`,
//     mediaType: "AUDIO",
//     mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1598508659103-6056b4618e7e?auto=format&fit=crop&w=1200&q=80",
//     tags: ["audio", "midi", "sintesis", "fl-studio"],
//     published: true,
//   },

//   {
//     title: "JPEG vs PNG: Kesalahan Desainer Pemula dalam Representasi Citra",
//     slug: slugify(
//       "JPEG vs PNG Kesalahan Desainer Pemula dalam Representasi Citra",
//     ),
//     excerpt:
//       "Panduan teknis memilih format gambar yang tepat untuk website agar menjaga keseimbangan antara kualitas resolusi dan kecepatan muat halaman.",
//     content: `Perhatikan foto tajam pada sampul artikel ini. Menyimpan dan mendistribusikan gambar digital di era *web modern* menuntut kita untuk paham cara komputer merepresentasikan warna.

// Citra statis digital umumnya direpresentasikan dalam format *bitmap/raster*, yaitu kumpulan matriks piksel di mana setiap piksel memiliki nilai warna RGB (Red, Green, Blue). Jika foto menggunakan resolusi 4K (3840 x 2160), bayangkan ada jutaan piksel yang harus disimpan datanya. Di sinilah pentingnya **kompresi citra**.

// ### Kapan Pakai JPEG dan Kapan Pakai PNG?
// Masih banyak *developer* web atau desainer yang asal *Export As* tanpa paham teknis di baliknya:

// 1. **JPEG (Joint Photographic Experts Group):** Gunakan untuk **fotografi** atau gambar dengan banyak gradasi warna natural. JPEG menggunakan metode *lossy*, membuang detail pixel warna yang mirip dan meratakannya. Ini sangat efisien untuk memperkecil ukuran file foto katalog, namun buruk jika digunakan untuk logo karena akan membuat pinggiran teks menjadi buram (efek *artifact*).

// 2. **PNG (Portable Network Graphics):**
//    Gunakan untuk **logo, vektor, ikon, atau gambar dengan latar belakang transparan**. PNG menggunakan kompresi *lossless* (menggunakan algoritma mirip kompresi teks LZW). PNG sangat tajam untuk warna solid dan batas garis yang tegas, tapi ukurannya akan bengkak luar biasa jika dipaksa menyimpan gambar pemandangan yang kompleks.

// Sebagai mahasiswa sistem multimedia, *best practice* saat ini bahkan sudah mulai bergeser menggunakan format **WebP** atau **AVIF** yang menggabungkan keunggulan kompresi dari keduanya.`,
//     mediaType: "IMAGE",
//     mediaUrl:
//       "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
//     tags: ["citra", "gambar", "jpeg", "png", "desain"],
//     published: true,
//   },
//   {
//     title:
//       "Tragedi Desain Meleset: Memahami Perbedaan Ruang Warna RGB dan CMYK",
//     slug: slugify(
//       "Tragedi Desain Meleset Memahami Perbedaan Ruang Warna RGB dan CMYK",
//     ),
//     excerpt:
//       "Mengapa poster yang terlihat cerah di layar monitor tiba-tiba menjadi gelap dan kusam saat dibawa ke tempat percetakan?",
//     content: `Kasus klasik mahasiswa tingkat awal: Udah capek-capek bikin poster *event* himpunan pakai gradasi warna neon ngejreng di Adobe Illustrator, eh pas di- *print* di tukang fotokopian warnanya malah jadi butek dan gelap. Kesalahannya ada di mana? Jawabannya ada pada ketidakpahaman soal **Color Space** (Ruang Warna) dalam sistem representasi citra.

// Dalam multimedia grafis, ada dua kutub utama representasi warna yang cara kerjanya sangat bertolak belakang:

// ### 1. Sistem RGB (Red, Green, Blue) - Additive Color
// Ini adalah ruang warna untuk layar monitor, HP, dan TV. Layar monitor memancarkan cahaya (emit light). Kalau kamu mencampur cahaya merah, hijau, dan biru dengan intensitas penuh (100%), yang kamu dapatkan adalah **warna putih terang**. Konsep ini dipakai buat segala produk digital (Web, Video, Game).

// ### 2. Sistem CMYK (Cyan, Magenta, Yellow, Key/Black) - Subtractive Color
// Ini adalah format warna wajib untuk **tinta percetakan**. Tinta tidak memancarkan cahaya, melainkan menyerap cahaya lampu ruangan. Kalau kamu menumpuk cat basah warna Cyan, Magenta, dan Yellow di atas kertas, hasilnya malah akan jadi kotor kehitaman (warna gelap).

// Nah, spektrum *gamut* (batas kemampuan nampilin warna) RGB itu jauh lebih luas dari CMYK. Jadi, warna hijau fosfor di layar laptopmu memang secara fisik nggak bisa direproduksi oleh tabung tinta printer biasa. *Lesson learned*: Kalau bikin karya visual yang *output*-nya mau dicetak fisik, setting kanvas kamu ke *mode* CMYK dari awal bikin *project*!`,
//     mediaType: "IMAGE",
//     mediaUrl:
//       "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
//     tags: ["citra", "warna", "rgb", "cmyk", "grafis"],
//     published: true,
//   },
//   {
//     title: "Awas Doxxing! Bahaya Tersembunyi di Balik Metadata EXIF Foto",
//     slug: slugify(
//       "Awas Doxxing Bahaya Tersembunyi di Balik Metadata EXIF Foto",
//     ),
//     excerpt:
//       "Mempelajari cara sistem menyimpan data tersembunyi non-visual di dalam sebuah file gambar dan implikasinya terhadap keamanan privasi data.",
//     content: `Sebuah file foto berformat JPG itu nggak cuma isinya warna-warni piksel gambar lho. Di dalam strukturnya, ada sebuah "buku catatan" tak kasat mata yang menyimpan segudang rahasia. Buku catatan inilah yang kita sebut dengan **Metadata EXIF (Exchangeable Image File Format)**.

// Dalam dunia sistem multimedia, metadata sangat berguna untuk manajemen aset digital. Aplikasi seperti Google Photos bisa mengelompokkan fotomu berdasarkan tempat liburan karena mereka membaca data ini. Tapi di sisi lain, ini bisa jadi celah privasi yang menyeramkan.

// ### Apa Saja yang Disimpan EXIF?
// Kapanpun kamu menjepret pakai kamera HP, file JPG yang tersimpan biasanya akan "membungkus" data-data berikut:
// - **Tipe Perangkat:** Merek dan model HP (misal: iPhone 15 Pro, Samsung S24).
// - **Parameter Lensa:** *Aperture*, ISO, *Shutter Speed*, dan apakah kamu pakai *flash* atau nggak.
// - **Waktu & Tanggal:** Jam, menit, dan detik akurat kapan tombol *shutter* ditekan.
// - **Lokasi GPS (Geotagging):** Koordinat *Latitude* dan *Longitude* super presisi tempat kamu berdiri saat moto!

// Bayangkan kalau kamu iseng *upload* foto mentah di sekitar rumahmu ke forum publik. Seseorang dengan niat jahat tinggal men- *download* gambarnya, ngecek atribut *properties* di PC, dan ketahuan deh lokasi persis rumahmu. Untungnya, platform modern kayak WhatsApp atau Instagram sudah otomatis men- *strip* (menghapus) metadata ini saat kita nge- *upload* untuk alasan keamanan.`,
//     mediaType: "IMAGE",
//     mediaUrl:
//       "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=1200&q=80",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=600&q=80",
//     tags: ["citra", "metadata", "exif", "privasi"],
//     published: true,
//   },
//   {
//     title:
//       "Grafis Vektor vs Bitmap: Mengapa Logo Perusahaan Bisa Di-zoom Tanpa Pecah?",
//     slug: slugify(
//       "Grafis Vektor vs Bitmap Mengapa Logo Perusahaan Bisa Di zoom Tanpa Pecah",
//     ),
//     excerpt:
//       "Mengenal perbedaan arsitektur gambar berbasis matematika (Vektor) dengan gambar berbasis titik piksel (Bitmap/Raster).",
//     content: `Coba tes ini di HP-mu: ambil sebuah foto hasil kamera, terus lakuin *zoom in* pakai dua jari sampai *mentok*. Gambar yang tadinya kelihatan tajam pasti ujung-ujungnya hancur dan kelihatan bentuk kotak-kotak kecilnya. Tapi kalau kamu buka gambar logo Google atau ikon di dalam *website*, kamu *zoom* sedekat apapun pinggirannya tetep mulus. Kenapa bisa beda?

// Ini adalah studi kasus paling mendasar dari representasi citra: **Vektor versus Bitmap**.

// ### Bitmap (Raster) = Kumpulan Lego
// Foto JPG atau PNG (gambar *thumbnail* artikel ini) menggunakan format Bitmap. Cara kerjanya persis kayak nyusun mainan Lego di atas papan. Satu foto butuh ribuan kotak kecil (piksel) yang masing-masing punya warna sendiri. Kelemahannya jelas, karena informasinya *fixed*, kalau gambarnya ditarik jadi ukuran baliho, pikselnya akan melar dan pecah (blur).

// ### Vektor (SVG/EPS) = Rumus Matematika
// Format Vektor (biasa dibikin pakai Adobe Illustrator atau CorelDraw) sama sekali nggak pakai piksel. Gambar ini menyimpan **koordinat dan rumus matematika**. Misalnya kamu gambar lingkaran merah, komputer cuma nyimpen data: "Buat lingkaran di titik koordinat X,Y dengan jari-jari R dan warna isi #FF0000".

// Mau gambarnya di-*zoom* setara ukuran layar HP atau ditaruh di spanduk stadion bola, komputer tinggal ngekalkulasi ulang rumusnya secara *real-time*. Hasilnya? Kualitasnya *infinite* alias gak akan pernah burik atau pecah. *Developer Front-End* seneng banget pakai file format \`.svg\` buat ikon web karena *size*-nya super kecil tapi kualitasnya abadi.`,
//     mediaType: "IMAGE",
//     mediaUrl:
//       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
//     tags: ["citra", "vektor", "bitmap", "svg", "desain"],
//     published: true,
//   },
//   {
//     title:
//       "Masa Depan Format Web: Selamat Tinggal JPEG, Selamat Datang WebP & AVIF",
//     slug: slugify(
//       "Masa Depan Format Web Selamat Tinggal JPEG Selamat Datang WebP dan AVIF",
//     ),
//     excerpt:
//       "Menyelidiki inovasi codec gambar generasi baru yang mulai menggeser dominasi JPEG dan PNG di jagat pengembangan web modern.",
//     content: `Selama lebih dari 20 tahun, jagat internet cuma bergantung sama trio mematikan ini buat urusan gambar: JPEG (buat foto), PNG (buat *transparent background*), dan GIF (buat meme gerak-gerak yang sering garing).

// Tapi seiring berkembangnya web modern dan tuntutan *loading page* yang secepat kilat dari Google (metrik *Core Web Vitals*), trio jadul ini udah mulai kewalahan. Ukuran file mereka dianggap terlalu gendut. Maka lahirlah generasi baru format citra multimedia: **WebP** dan **AVIF**.

// ### WebP si Anak Emas Google
// Google ngembangin WebP buat ngebungkus kemampuan JPEG, PNG, sama GIF dalam satu ekstensi aja. WebP mendukung transparansi kayak PNG, bisa gerak kayak GIF, tapi punya kompresi foto *lossy* yang jauh lebih sadis dari JPEG. Hasilnya? File yang ukurannya bisa **25% sampai 35% lebih kecil** dari JPEG dengan kualitas mata telanjang yang sama percis. Pantesan sekarang semua gambar *thumbnail* di YouTube kalau lu *Save As...* formatnya pasti WebP.

// ### AVIF: Sang Penantang Baru Berbasis Video
// Yang lebih sinting lagi format AVIF (AV1 Image File Format). AVIF ini aslinya turunan dari kompresi video Netflix (*codec* AV1). Jadi cara dia nge- *compress* gambar statis ngikutin logika kompresi video *ultra-high-definition*. Secara statistik, ukuran file AVIF bisa sampai **50% lebih kecil dibanding JPEG** standar.

// Hambatan mereka saat ini cuma di masalah kompatibilitas (belum semua *browser* atau HP jadul *support* ngebuka gambarnya). Tapi secara teknis, format-format ini adalah masa depan sistem distribusi media.`,
//     mediaType: "IMAGE",
//     mediaUrl:
//       "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
//     tags: ["citra", "webp", "avif", "jpeg", "kompresi"],
//     published: true,
//   },

//   {
//     title: "Algoritma Huffman: Mengapa File Teks ZIP Bisa Sangat Kecil?",
//     slug: slugify("Algoritma Huffman Mengapa File Teks ZIP Bisa Sangat Kecil"),
//     excerpt:
//       "Penjelasan teori di balik kompresi data teks yang lossless, memastikan efisiensi penyimpanan database tanpa hilangnya sebuah karakter.",
//     content: `Dibandingkan video resolusi tinggi atau grafis 3D, data teks mungkin terlihat sepele. Representasi data teks di komputer biasanya menggunakan standar *encoding* seperti ASCII (1 karakter = 8 bit) atau UTF-8.

// Namun bayangkan skenario *database* pemerintahan, data *log* server raksasa, atau arsip rekam medis rumah sakit yang menyimpan milyaran baris catatan teks. Penyimpanan hariannya saja bisa mencapai puluhan Gigabyte. Di sinilah metode kompresi teks beraksi.

// ### Logika Sederhana Kompresi Teks
// Berbeda dengan media audio/video yang bisa di- *compress* secara *lossy* (dibuang sebagian datanya), kompresi teks **wajib bersifat Lossless**. Kamu tidak boleh menghilangkan satu huruf pun dari dokumen perjanjian hukum atau *source code* aplikasi saat dikompresi menjadi file \`.zip\`.

// Salah satu algoritma paling legendaris yang diajarkan di matkul sistem multimedia adalah **Huffman Coding**.
// Cara kerjanya cerdik: daripada menyimpan setiap karakter dengan ukuran bit yang seragam, Huffman membuat semacam "kamus dinamis". Huruf yang sering muncul dalam kalimat (misalnya huruf vokal 'A' atau karakter spasi) direpresentasikan dengan kode biner yang sangat pendek (misal: \`10\`), sedangkan huruf langka seperti 'Z' atau 'X' diberi kode biner agak panjang (misal: \`110101\`).

// Dengan manipulasi frekuensi probabilitas karakter ini, ukuran *file log* atau dokumen buku teks bisa menyusut hingga lebih dari 60% tanpa kehilangan sepeserpun informasi ketika diekstrak kembali.`,
//     mediaType: "ARTICLE",
//     mediaUrl: null,
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
//     tags: ["teks", "kompresi", "algoritma", "huffman"],
//     published: true,
//   },
//   {
//     title:
//       "Multimedia Interaktif: Mengapa UI/UX Menentukan Kesuksesan Sebuah Aplikasi?",
//     slug: slugify(
//       "Multimedia Interaktif Mengapa UI UX Menentukan Kesuksesan Sebuah Aplikasi",
//     ),
//     excerpt:
//       'Pentingnya Human-Computer Interaction dalam mengemas elemen multimedia agar pengguna tidak bingung atau merasa "overwhelmed".',
//     content: `Punya sistem multimedia *backend* yang canggih dengan kecepatan *streaming* video dewa nggak akan ada artinya kalau tampilan antarmuka (UI) aplikasimu bikin *user* pusing tujuh keliling.

// Sering nemu website portal pemerintah zaman *old*? Teks berjalan (*marquee*), warna *background* yang bikin sakit mata, plus *auto-play* musik *midi* di latar belakang? Itu adalah contoh terburuk dari kegagalan menyajikan elemen multimedia secara interaktif.

// ### Prinsip Beban Kognitif (Cognitive Load)
// Dalam merancang produk digital (web, *mobile app*, atau *game interface*), seorang developer harus memperhatikan batas daya serap informasi otak manusia. Kalau kita menumpuk teks panjang, galeri foto, animasi *flashy*, dan suara notifikasi dalam satu layar secara bersamaan, *user* akan mengalami *cognitive overload*. Mereka malah nggak akan baca beritamu dan langsung pencet tombol *Close*.

// ### Aturan Emas Penyajian Media:
// 1. **Visual Hierarchy:** Arahkan mata *user* dari yang paling penting (misal: Thumbnail Video) ke yang sekunder (teks deskripsi).
// 2. **Kontrol User itu Mutlak:** Jangan pernah pasang video/audio yang nge- *play* sendiri dengan suara kencang (kecuali *muted autoplay* kayak di TikTok). Beri *user* tombol *Play/Pause* yang jelas.
// 3. **White Space:** Jangan takut sama ruang kosong. Celah kosong antar paragraf dan gambar bukan berarti "desain yang belum selesai", tapi itu ruang bernafas buat mata *user*.`,
//     mediaType: "ARTICLE",
//     mediaUrl: null,
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
//     tags: ["ui", "ux", "desain", "interaktif", "teks"],
//     published: true,
//   },
//   {
//     title:
//       "Digital Rights Management (DRM): Cara Spotify dan Netflix Melindungi Aset Mereka",
//     slug: slugify(
//       "Digital Rights Management DRM Cara Spotify dan Netflix Melindungi Aset Mereka",
//     ),
//     excerpt:
//       "Memahami teknologi perlindungan hak cipta digital yang mencegah pembajakan aset multimedia.",
//     content: `Pernah iseng coba ngebuka folder instalasi Spotify di PC buat nyari file MP3 hasil *download offline*, tapi yang ketemu malah rentetan *file* aneh tanpa ekstensi yang gak bisa diputar di Winamp atau media player lain? Atau pernah mau *screenshot* adegan drakor keren di Netflix lewat HP, tapi hasilnya cuma dapet layar hitam pekat?

// Selamat, kamu baru saja berhadapan dengan tembok pertahanan aset multimedia bernama **DRM (Digital Rights Management)**.

// ### Gimana Cara Kerja DRM?
// DRM adalah teknologi sistem enkripsi (*cryptography*) yang ditanamkan ke dalam alur distribusi konten media digital. Tujuannya simpel: mastiin cuma *user* yang bayar langganan berbayar (dan pakai aplikasi resmi) yang bisa nikmatin kontennya, mencegah pembajakan *copy-paste* sembarangan.

// Cara kerjanya secara awam:
// 1. Sebelum lagu atau video dikirim dari server, filenya akan **dienkripsi** (diacak) menggunakan *Key* (kunci) khusus.
// 2. Ketika *streaming* masuk ke HP/Laptop, *player* Netflix/Spotify akan ngecek status akun kamu, lalu secara diam-diam me- *request* *Decryption Key* ke server DRM.
// 3. Proses dekripsi terjadi di *level hardware/memory* tertutup (seperti Widevine DRM buatan Google), bukan disimpan di hardisk lokal.

// Makanya, buat mahasiswa IT, kalau mau bikin *platform streaming* komersial, ilmu soal kompresi video saja gak cukup. Kamu wajib tahu cara masang arsitektur DRM biar konten kreator di platformmu aman dari *screencast* bajakan!`,
//     mediaType: "ARTICLE",
//     mediaUrl: null,
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80",
//     tags: ["drm", "keamanan", "enkripsi", "hak-cipta"],
//     published: true,
//   },
//   {
//     title: "Augmented Reality vs Virtual Reality: Beda Tipis Tapi Signifikan",
//     slug: slugify(
//       "Augmented Reality vs Virtual Reality Beda Tipis Tapi Signifikan",
//     ),
//     excerpt:
//       "Mempelajari perbedaan mendasar interaksi spasial antara AR dan VR sebagai evolusi platform konten multimedia.",
//     content: `Teknologi multimedia interaktif udah makin gila, nggak sekadar klik *mouse* layar datar aja. Sekarang kita sering banget disuguhi dua istilah yang kedengarannya mirip tapi cara nge-*handle* dunianya beda banget: **Virtual Reality (VR)** sama **Augmented Reality (AR)**.

// Sering ketuker? Santai, ini cara paling gampang ngebedainnya pakai logika *software*.

// ### 1. Virtual Reality (VR): Ganti Realitas 100%
// Kalau lu pake *headset* kayak Meta Quest 3, mata lu beneran ketutup layar. *Software* bakal nge- *render* ulang 100% dunia yang ada di sekitar lu. Ruang tamu lu tiba-tiba ilang berubah jadi arena *rollercoaster* fiktif.
// Tantangan multimedianya di sini adalah nge-*render* grafik 3D secara super cepat (FPS tinggi) untuk dua sudut pandang mata yang beda (*stereoskopik*) biar penggunanya gak mual (*motion sickness*).

// ### 2. Augmented Reality (AR): Nambahin Elemen Digital ke Dunia Nyata
// Kebalikan dari VR, AR itu nggak nutupin pandangan asli lu. Contoh paling *legend* itu *game* Pokemon GO atau filter Instagram. *Software* nangkep tangkapan kamera HP lu, terus nyelipin animasi 3D Pikachu seolah-olah dia lagi berdiri di meja makan rumah lu.
// Tantangannya beda lagi: AR butuh kecerdasan buatan (*Computer Vision*) buat memetakan kedalaman ruangan dan ngebaca batas tembok/lantai (*Spatial Mapping*) secara akurat dan *real-time*.

// Keduanya adalah puncak evolusi sistem representasi data, di mana grafis, suara *spatial*, dan sensor giroskop digabung buat ngibulin indra manusia.`,
//     mediaType: "ARTICLE",
//     mediaUrl: null,
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
//     tags: ["ar", "vr", "realitas", "interaktif", "3d"],
//     published: true,
//   },
//   {
//     title:
//       "CDN (Content Delivery Network): Kurir Paket Rahasia di Dunia Streaming",
//     slug: slugify(
//       "CDN Content Delivery Network Kurir Paket Rahasia di Dunia Streaming",
//     ),
//     excerpt:
//       "Arsitektur jaringan distribusi konten yang memungkinkan file raksasa multimedia diakses jutaan pengguna tanpa buffering.",
//     content: `Pernah mikir nggak, markas besar server Netflix atau YouTube itu kan ada di Amerika Serikat, ukurannya bergiga-giga. Tapi kok pas kita *play* videonya di kamar kosan di Jakarta Selatan, *buffering*-nya cuma hitungan milidetik doang? Kok bisa data jalan lewatin kabel laut benua secepat itu?

// Rahasia kecepatan multimedia modern itu nggak cuma di kompresinya aja, tapi ada di infrastruktur pengirimannya yang disebut **CDN (Content Delivery Network)**.

// ### Konsep Gudang Cabang (Edge Servers)
// Ibaratnya lu lagi mesen paket Shopee dari toko pusat di luar negeri, pasti sampainya sebulan kan? Tapi kalau tuh toko punya "Gudang Cabang" di Jakarta, paket lu besoknya langsung nyampe. Nah, CDN kerjanya percis kayak gitu.

// YouTube dan platform web besar nggak naruh file video tunggal mereka di satu server pusat buat diserbu satu dunia (bisa *down* servernya). Mereka mendistribusikan salinan *file* video lu ke ratusan komputer server kecil (*Edge Server*) yang tersebar di berbagai negara.

// Jadi, pas lu nge-klik video di Indonesia, lu secara otomatis narik paket data videonya dari server CDN YouTube terdekat (mungkin servernya ada di Jakarta atau Singapura). Jarak fisiknya pendek, latensi ping-nya kecil, otomatis *bandwidth* transfernya maksimal dan video lu langsung muter mulus tanpa putus-putus. Keren, kan?`,
//     mediaType: "ARTICLE",
//     mediaUrl: null,
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
//     tags: ["cdn", "streaming", "jaringan", "infrastruktur"],
//     published: true,
//   },
// ];

// async function main() {
//   console.log("🌱 Menyiapkan database CMS Multimedia (Bulk Mode)...");

//   // Bersihkan data lama
//   await prisma.post.deleteMany();
//   console.log("🗑️  Data lama berhasil dihapus");

//   // Input data dummy baru (Total 20)
//   for (let i = 0; i < seedPosts.length; i++) {
//     await prisma.post.create({ data: seedPosts[i] });
//     console.log(`[${i + 1}/20] Sukses inject: "${seedPosts[i].title}"`);
//   }

//   console.log(
//     `\nBerhasil menyematkan total ${seedPosts.length} artikel dari 4 tipe multimedia!`,
//   );
// }

// main()
//   .catch((e) => {
//     console.error("Terjadi kesalahan saat proses seed:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// MARK

require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
const basePosts = [
  {
    title: "Misteri Bitrate: Kenapa Video YouTube Buram Saat Ada Confetti?",
    excerpt:
      "Membahas konsep representasi data video dan efek kompresi lossy pada platform streaming, lengkap dengan studi kasus algoritma bitrate.",
    content: `Pernahkah kamu menonton video di YouTube, lalu tiba-tiba kualitas gambarnya hancur kotak-kotak saat ada adegan salju turun atau *confetti* berhamburan? Coba perhatikan penjelasan teknis pada video Tom Scott yang tersemat di bawah ini.

Fenomena ini adalah contoh nyata dari cara kerja **Representasi dan Kompresi Data Video**. Platform *streaming* tidak mengirimkan setiap piksel gambar secara utuh (karena butuh *bandwidth* raksasa). Mereka menggunakan teknik *lossy compression* seperti H.264 atau HEVC.

### Cara Kerja Kompresi Video
Algoritma kompresi video umumnya bekerja dengan membandingkan satu *frame* dengan *frame* berikutnya. Jika kamu merekam orang berbicara dengan latar belakang tembok diam, algoritma hanya akan menyimpan data pergerakan mulut dan mata orang tersebut. Temboknya? Cukup di- *copy-paste* secara digital.

Namun, ketika *confetti* berhamburan, setiap piksel di layar berubah arah dan warnanya. Algoritma kompresi menjadi "panik" karena tidak ada data yang bisa di- *copy-paste*. Akibatnya, alokasi *bitrate* (jumlah data per detik) tidak cukup untuk menutupi semua perubahan tersebut, sehingga muncul blok-blok piksel kasar yang disebut *macroblocking*.

*Pada mata kuliah Sistem Multimedia, memahami efisiensi bitrate ini sangat penting agar kita bisa memilih format container (seperti MP4 atau MKV) dan codec yang tepat sesuai kebutuhan project.*`,
    mediaType: "VIDEO",
    mediaUrl: "https://www.youtube.com/watch?v=r6Rp-uo6HmI",
    thumbnailUrl: "https://img.youtube.com/vi/r6Rp-uo6HmI/maxresdefault.jpg",
    tags: ["video", "kompresi", "bitrate", "codec"],
    published: true,
  },
  {
    title: "Di Balik Layar Animasi 3D: Dari Wireframe Hingga Rendering",
    excerpt:
      "Mengupas tuntas tahapan representasi data animasi 3D, membedakannya dengan animasi 2D, menggunakan studi kasus film pendek Blender.",
    content: `Video animasi di atas adalah film pendek berjudul "Spring" yang diproduksi sepenuhnya menggunakan *software* open-source Blender. Hasil visualisasi yang luar biasa tersebut bermula dari representasi matematis titik-titik kordinat (X, Y, Z) dalam ruang digital.

### Perbedaan Representasi 2D dan 3D
Berbeda dengan animasi 2D tradisional di mana animator menggambar setiap *frame* (atau menggunakan teknik *tweening* antar titik 2D), **representasi data animasi 3D** jauh lebih kompleks. Animasi 3D tidak menyimpan "gambar", melainkan menyimpan **data instruksi** geometri.

Proses pembuatan *(pipeline)* mencakup beberapa tahap krusial:
1. **Modeling:** Membentuk *mesh* karakter menggunakan poligon. Semakin banyak poligon (*high-poly*), semakin halus lengkungan karakter, tapi semakin berat ukuran datanya.
2. **Rigging & Skinning:** Membangun "tulang" digital di dalam model agar karakter bisa digerakkan.
3. **Texturing:** Membungkus *mesh* 3D dengan citra statis 2D (seperti memberi kulit pada tulang).
4. **Rendering:** Proses kalkulasi matematis yang dilakukan oleh kartu grafis (GPU) untuk menghitung pantulan cahaya, bayangan, dan fisika material menjadi output video.

Bagi mahasiswa IT yang minat masuk industri *game development*, pemahaman soal *polygon count* dan efisiensi *rendering* adalah harga mati.`,
    mediaType: "VIDEO",
    mediaUrl: "https://www.youtube.com/watch?v=WhWc3b3KhnY",
    thumbnailUrl: "https://img.youtube.com/vi/WhWc3b3KhnY/maxresdefault.jpg",
    tags: ["animasi", "3d", "blender", "rendering"],
    published: true,
  },
  {
    title:
      "Mengapa Resolusi Netflix Bisa Naik Turun Sendiri? Mengenal Adaptive Bitrate Streaming",
    excerpt:
      "Penjelasan mengenai protokol HLS dan DASH yang memungkinkan video streaming menyesuaikan kualitas dengan kecepatan internet pengguna.",
    content: `Lagi asik-asiknya nonton serial favorit di Netflix atau YouTube, tiba-tiba gambar jadi buram selama beberapa detik, lalu perlahan kembali jernih. Kok bisa server tahu internet kita lagi lemot dan otomatis nurunin kualitas videonya tanpa bikin putus-putus (*buffering*)?

Sebagai referensi visual, video di atas adalah *Big Buck Bunny*. Buat kamu yang belum tahu, ini adalah film *open-source* yang sering banget dipake sama *Software Engineer* Netflix atau YouTube untuk ngetes sistem *streaming* mereka karena adegannya punya kompleksitas warna dan gerak yang tinggi.

Jawabannya ada di teknologi multimedia yang bernama **Adaptive Bitrate Streaming (ABR)**. Protokol populer yang sering dipakai adalah HLS (HTTP Live Streaming) dari Apple dan MPEG-DASH.

### Cara Kerjanya Gimana?
Saat tim Netflix mengunggah satu film ke server, sistem mereka tidak hanya menyimpan satu file video raksasa. Mesin *encoder* akan "mencacah" video tersebut menjadi potongan-potongan kecil berdurasi 2 sampai 10 detik (disebut *chunks*). Ajaibnya, setiap potongan ini dibuat dalam berbagai varian resolusi dan ukuran: dari 144p yang super burik, sampai 4K HDR yang super tajam.

Ketika kamu memutar videonya, *video player* di aplikasimu secara terus-menerus memantau kecepatan *bandwidth* internetmu. 
- Detik ke 0-10: Internet ngebut? Minta *chunk* resolusi 1080p.
- Detik ke 11-20: Tiba-tiba ada yang nyalain *download* IDM di rumah? *Player* bakal otomatis *request chunk* resolusi 480p ke server untuk potongan video selanjutnya biar tontonanmu gak nge- *freeze*.

*Teknologi inilah yang bikin arsitektur sistem multimedia modern sangat dinamis dan memanjakan user experience.*`,
    mediaType: "VIDEO",
    mediaUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    thumbnailUrl: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    tags: ["video", "streaming", "hls", "dash", "netflix"],
    published: true,
  },
  {
    title:
      "Frame Rate vs Refresh Rate: Mitos Mata Manusia Cuma Bisa Lihat 30 FPS",
    excerpt:
      "Meluruskan kesalahpahaman umum tentang Frame Per Second pada video dan Refresh Rate pada monitor dalam sistem multimedia.",
    content: `Dulu banget, ada mitos yang sering beredar di kalangan *gamer* dan penikmat film: "Mata manusia cuma bisa memproses gambar sampai 30 FPS (Frame Per Second), jadi lebih dari itu nggak ada gunanya". Padahal, secara anatomis, mata dan otak kita sanggup mendeteksi kedipan layar hingga di atas 200 Hz!

Video yang tersemat di atas adalah "Sintel", salah satu proyek ambisius dari Blender yang sering disajikan dalam format 60 FPS untuk menguji seberapa *smooth* layar kamu bisa nampilin transisi *frame*. Di dalam pengolahan media digital, kita harus bisa membedakan dua istilah penting ini:

### 1. Frame Rate (FPS) - Urusan Dapur si Media
Ini adalah jumlah gambar statis (*frame*) yang digenerate oleh *software* atau dimainkan oleh file videomu dalam satu detik. Film bioskop standarnya pakai 24 FPS biar ada efek *motion blur* yang sinematik. Sedangkan *game* FPS (*First Person Shooter*) butuh minimal 60 FPS biar gerakannya nggak patah-patah pas karaktermu lari.

### 2. Refresh Rate (Hz) - Urusan Hardware si Monitor
Ini adalah seberapa sering monitor laptop atau HP-mu sanggup menggambar ulang piksel layar dalam satu detik. Monitor standar kantoran biasanya cuma 60Hz. HP *flagship* sekarang rata-rata 120Hz.

**Masalahnya muncul pas dua hal ini nggak sinkron.**
Percuma kamu *render* video animasi 120 FPS dan di-*play* di laptop biasa, karena monitornya cuma sanggup nampilin 60 gambar per detiknya (60Hz). Hasil sisanya? Kebuang sia-sia atau malah bikin efek robek di layar yang disebut *Screen Tearing*. Makanya, integrasi *software* dan *hardware* di sistem multimedia itu nggak bisa dipisahin.`,
    mediaType: "VIDEO",
    mediaUrl: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
    thumbnailUrl: "https://img.youtube.com/vi/YE7VzlLtp-4/maxresdefault.jpg",
    tags: ["video", "fps", "hz", "hardware", "refresh-rate"],
    published: true,
  },
  {
    title:
      "Revolusi Codec: Rahasia Dibalik Video 4K yang Gak Bikin Penuh Hardisk",
    excerpt:
      "Penjelasan sistematis mengenai transisi format H.264 ke H.265 (HEVC) dan bagaimana algoritma ini menyelamatkan industri video streaming.",
    content: `Coba bayangin, resolusi video 4K itu ukurannya empat kali lipat lebih besar dari layar Full HD (1080p). Logikanya, ukuran file videonya pasti bakal meledak empat kali lipat juga kan? Tapi kok sekarang kita bisa nyaman ngerekam video 4K berjam-jam di iPhone atau Android tanpa takut *storage* langsung abis?

Semua ini berkat pahlawan tanpa tanda jasa di dunia multimedia: **Video Codec (Coder-Decoder)**. Dan bintang utamanya saat ini adalah transisi dari H.264 (AVC) ke **H.265 (HEVC - High Efficiency Video Coding)**.

Video di atas (*Tears of Steel*) adalah proyek *visual effect* yang sering banget dipake akademisi buat ngebandingin kualitas kompresi berbagai jenis *codec* ini. 

### Kenapa H.265 Jauh Lebih Sakti?
Kalau H.264 membagi layar video menjadi kotak-kotak kecil statis berukuran 16x16 piksel (disebut *macroblocks*) buat nyari data warna yang sama buat di-*compress*. Nah, H.265 (HEVC) jauh lebih pinter. Dia pakai struktur blok dinamis yang ukurannya bisa melar sampai 64x64 piksel, tergantung seberapa ribet gambar di area itu.

Area langit biru yang luas dan gak ada pergerakan? Langsung dibabat pakai 1 blok raksasa 64x64 (ngirit data ekstrim). Area wajah yang banyak detail? Dipecah jadi blok-blok super kecil.

Hasilnya, file video bisa **50% lebih kecil** dari H.264 dengan kualitas gambar yang sama persis di mata kita. Kekurangannya cuma satu: *hardware* (prosesor) kamu bakal disuruh kerja rodi lebih keras buat nge-*decode* algoritma matematika ini pas videonya di-*play*. Itulah kenapa PC jadul kadang nge- *lag* kalau muter video HEVC.`,
    mediaType: "VIDEO",
    mediaUrl: "https://www.youtube.com/watch?v=OH_T_F41Mv0",
    thumbnailUrl: "https://img.youtube.com/vi/OH_T_F41Mv0/maxresdefault.jpg",
    tags: ["video", "codec", "hevc", "h265", "kompresi"],
    published: true,
  },

  {
    title:
      "Membedah Format Audio: MP3 vs FLAC, Apakah Telinga Kita Tahu Bedanya?",
    excerpt:
      "Penjelasan teknis mengenai kompresi suara Lossless dan Lossy, serta dampaknya pada kualitas produksi multimedia.",
    content: `Coba dengarkan pemutar audio interaktif di halaman ini. Itu adalah sampel audio dengan kompresi standar (MP3). Pertanyaannya, apakah kamu bisa membedakan suaranya dengan format *mastering* studio yang ukurannya 10 kali lebih besar?

### Representasi Audio Digital
Suara sejatinya adalah gelombang analog kontinu. Agar bisa disimpan di komputer, gelombang ini harus "dicacah" menjadi data digital melalui proses *sampling* dan *quantization*. Standar CD audio menggunakan *sample rate* 44.1 kHz (mengambil 44.100 sampel suara per detik) dengan bit-depth 16-bit.

### Perang Kompresi: Lossless vs Lossy
- **Lossless (Contoh: FLAC, WAV):** Memampatkan ukuran file tanpa membuang satu pun data frekuensi suara aslinya. Ibarat me-ZIP sebuah dokumen, saat dibuka isinya 100% sama. Cocok untuk arsip studio.
- **Lossy (Contoh: MP3, AAC):** Format ini sangat pintar. Algoritmanya memanfaatkan *psychoacoustic* (batasan pendengaran manusia). Frekuensi yang tertutup oleh suara alat musik dominan atau di luar batas pendengaran kita (di atas 20kHz) akan "dibuang" permanen. 

Hasilnya? File MP3 bisa berukuran 5 MB saja sementara versi FLAC-nya 40 MB. Walaupun datanya ada yang hilang, telinga orang awam yang mendengarkan melalui *earphone* standar tidak akan sadar ada instrumen mikro yang dihilangkan.`,
    mediaType: "AUDIO",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=1200&q=80",
    tags: ["audio", "kompresi", "mp3", "flac"],
    published: true,
  },
  {
    title: "Nyemplung ke Dunia Podcast? Pahami Dulu Sample Rate dan Bit Depth",
    excerpt:
      "Panduan dasar pengolahan audio digital untuk kreator konten: Memilih spesifikasi rekaman yang tepat tanpa bikin hardisk jebol.",
    content: `Semenjak tren *podcast* merajalela, banyak mahasiswa multimedia yang mulai iseng bikin *setup* rekaman sendiri di kamar. Tapi sayangnya, pas nge- *export* hasil rekaman dari Adobe Audition atau Audacity, masih banyak yang bingung ngisi angka di kolom "Sample Rate" dan "Bit Depth". Alhasil, suaranya kadang cempreng, atau ukuran file-nya jadi bengkak nggak karuan.

### Konsep Dasarnya Gini
Komputer kan nggak paham suara, dia cuma paham angka 0 dan 1. Biar suara vokal kamu bisa masuk PC, *Soundcard* atau *Audio Interface* bakal melakukan konversi analog ke digital.

1. **Sample Rate:** Ibarat *frame rate* pada video. Ini adalah seberapa sering komputer "memfoto" gelombang suaramu dalam satu detik. Standarnya adalah **44.100 Hz (44.1 kHz)**. Kenapa segitu? Karena menurut Teorema Nyquist-Shannon, buat merekam batas maksimal pendengaran manusia (20 kHz), kita butuh alat perekam dengan kecepatan minimal dua kali lipatnya (sekitar 40 kHz).
2. **Bit Depth:** Ini soal resolusi dinamis suara (seberapa senyap sampai seberapa keras). Makin tinggi *bit depth*, makin kecil *noise* atau suara desis statis pas kamu lagi diem. Standar CD itu **16-bit**, tapi buat rekaman mentah (biar aman pas di- *edit*), teknisi audio lebih milih **24-bit**.

Jadi kesimpulannya, kalau kamu cuma mau *upload* tugas kuliah berupa rekaman *voiceover* biasa, nge-set di 44.1kHz dan 16-bit mp3 (192 kbps) udah lebih dari cukup, kok! Dengarkan contoh audio terlampir untuk membuktikan kualitasnya.`,
    mediaType: "AUDIO",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1200&q=80",
    tags: ["audio", "podcast", "sample-rate", "rekaman"],
    published: true,
  },
  {
    title: "Spatial Audio: Rahasia Suara Tembakan di Game FPS Terasa Nyata",
    excerpt:
      "Bagaimana sistem komputasi memanipulasi frekuensi audio untuk mengecoh otak kita agar bisa menebak arah suara dalam ruang 3 dimensi.",
    content: `Main Valorant, PUBG, atau CS2 tanpa *headset* itu ibarat main bola sambil tutup mata—pasti gampang mati konyol gara-gara disergap musuh dari belakang. Pertanyaannya, *headset* kita kan cuma punya dua *speaker* (kiri dan kanan), tapi kok bisa kita nebak musuhnya jalan dari arah serong kanan belakang?

Itu karena *engine* game mengimplementasikan representasi data suara berbasis ruang, atau yang kerennya disebut **Spatial Audio** / 3D Audio.

### Mengecoh Otak Manusia
Sistem multimedia pada game menggunakan perhitungan matematis rumit yang dinamakan **HRTF (Head-Related Transfer Function)**. Algoritma ini meniru cara gelombang suara memantul di daun telinga, kepala, dan bahu kita sebelum masuk ke gendang telinga.

Kalau ada ledakan dari sebelah kanan:
1. Suara pasti masuk ke telinga kanan lebih cepat beberapa milidetik.
2. Telinga kiri tetap dengar, tapi frekuensi tinggi (*treble*)-nya udah banyak yang redam karena terhalang oleh tengkorak kepala kita sendiri (*Head Shadowing*).

Nah, *software* pengolah audio di dalam game akan memanipulasi sampel suara tembakan biasa, menambahkan jeda waktu super kecil, dan memotong frekuensi tertentunya secara *real-time* sesuai posisi karaktermu. Hasilnya? Otak kita tertipu dan meyakini kalau suaranya beneran berasal dari dunia nyata! Silakan play *track* audio di atas dengan menggunakan earphone untuk merasakan sensasi suara *stereo* yang kaya.`,
    mediaType: "AUDIO",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=80",
    tags: ["audio", "spatial", "gaming", "hrtf"],
    published: true,
  },
  {
    title: "Ilmu Fisika di Balik Fitur ANC (Active Noise Cancelling) pada TWS",
    excerpt:
      "Membedah konsep pengolahan sinyal digital (DSP) dan inversi gelombang yang memungkinkan TWS memblokir suara bising lingkungan.",
    content: `Zaman sekarang, hampir semua orang pakai TWS (*True Wireless Stereo*) atau AirPods pas lagi *commute* di KRL biar nggak keganggu berisiknya mesin kereta. Fitur andalan yang dijual mahal sama pabrikan adalah **ANC (Active Noise Cancelling)**. 

Banyak yang ngira ini semacam sihir kedap suara. Padahal, ini adalah murni aplikasi ilmu pengolahan sinyal multimedia digital (Digital Signal Processing). Coba dengerin sampel instrumen audio di atas pakai TWS lu, dan rasain bedanya pas ANC dinyalain sama dimatiin.

### Inversi Fase: Melawan Api dengan Api
Secara teknis, suara lingkungan (bising mesin) itu bentuk fisiknya adalah gelombang udara. Nah, TWS yang ada fitur ANC-nya punya *microphone* kecil yang ngarah ke luar. 
Kerja *mic* ini spesifik banget:
1. Merekam pola gelombang kebisingan secara *real-time*.
2. Mengirim data ke *chip* prosesor kecil di dalam *earphone*.
3. Prosesor ini akan men- *generate* gelombang audio balasan secara instan, namun dengan **fase yang persis berlawanan 180 derajat** (di- *invert*).

Ilmu fisikanya: Jika gelombang positif (puncak) bertemu gelombang negatif (lembah) dengan amplitudo yang sama persis, mereka akan saling membatalkan satu sama lain menjadi angka 0 (suara senyap). Gila, kan? Teknologi ini nge-*process* matematika kompleks tersebut ribuan kali dalam satu detik!`,
    mediaType: "AUDIO",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    tags: ["audio", "anc", "noise-cancelling", "dsp", "tws"],
    published: true,
  },
  {
    title: "Format MIDI: Bukti Kalau Audio Nggak Melulu Berupa Gelombang Suara",
    excerpt:
      "Mempelajari perbedaan fundamental antara data audio digital (Waveform) dengan standar instrumen digital (MIDI).",
    content: `Kalau kamu buka *software* pembuat musik kayak FL Studio atau Ableton, kamu bakal sering bersinggungan sama data bernama MIDI (*Musical Instrument Digital Interface*). Format ini unik banget dalam sistem multimedia, karena secara teknis **MIDI bukanlah file suara**. Lho kok bisa?

Coba *play* sampel audio yang ada di artikel ini. Suara synth dan drum itu direkam dalam bentuk MP3 (data gelombang suara). Kalau *file* MP3 ini ibarat "hasil rekaman video" orang lagi masak, maka MIDI itu ibarat "buku resep"-nya.

### Data Instruksi, Bukan Waveform
File MIDI ukurannya super duper kecil (cuma beberapa Kilobyte) karena dia nggak nyimpen sampel gelombang sama sekali. Isinya cuma baris-baris instruksi digital buat alat musik elektronik atau *software synthesizer*, isinya kira-kira begini:
* "Pencet tuts piano nada C4 di detik ke-1."
* "Tekan sekuat 80% (*velocity*)."
* "Tahan selama 2 detik, lalu lepas."

Karena sifatnya cuma instruksi teks/data, file MIDI yang sama bisa di-*play* bunyinya jadi suara piano klasik, bisa diganti bunyinya jadi gitar distorsi metal, atau bahkan jadi suara drum sintesis 8-bit ala game Mario Bros. 

Representasi data semacam ini ngajarin *programmer* kalau kita kadang nggak perlu nyimpen data hasil akhirnya (*output*), cukup simpan *logic* dan parameter pembuatannya aja untuk menekan beban *storage* secara drastis!`,
    mediaType: "AUDIO",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1598508659103-6056b4618e7e?auto=format&fit=crop&w=1200&q=80",
    tags: ["audio", "midi", "sintesis", "fl-studio"],
    published: true,
  },
  {
    title: "JPEG vs PNG: Kesalahan Desainer Pemula dalam Representasi Citra",
    excerpt:
      "Panduan teknis memilih format gambar yang tepat untuk website agar menjaga keseimbangan antara kualitas resolusi dan kecepatan muat halaman.",
    content: `Perhatikan foto tajam pada sampul artikel ini. Menyimpan dan mendistribusikan gambar digital di era *web modern* menuntut kita untuk paham cara komputer merepresentasikan warna.

Citra statis digital umumnya direpresentasikan dalam format *bitmap/raster*, yaitu kumpulan matriks piksel di mana setiap piksel memiliki nilai warna RGB (Red, Green, Blue). Jika foto menggunakan resolusi 4K (3840 x 2160), bayangkan ada jutaan piksel yang harus disimpan datanya. Di sinilah pentingnya **kompresi citra**.

### Kapan Pakai JPEG dan Kapan Pakai PNG?
Masih banyak *developer* web atau desainer yang asal *Export As* tanpa paham teknis di baliknya:

1. **JPEG (Joint Photographic Experts Group):** Gunakan untuk **fotografi** atau gambar dengan banyak gradasi warna natural. JPEG menggunakan metode *lossy*, membuang detail pixel warna yang mirip dan meratakannya. Ini sangat efisien untuk memperkecil ukuran file foto katalog, namun buruk jika digunakan untuk logo karena akan membuat pinggiran teks menjadi buram (efek *artifact*).

2. **PNG (Portable Network Graphics):**
   Gunakan untuk **logo, vektor, ikon, atau gambar dengan latar belakang transparan**. PNG menggunakan kompresi *lossless* (menggunakan algoritma mirip kompresi teks LZW). PNG sangat tajam untuk warna solid dan batas garis yang tegas, tapi ukurannya akan bengkak luar biasa jika dipaksa menyimpan gambar pemandangan yang kompleks.

Sebagai mahasiswa sistem multimedia, *best practice* saat ini bahkan sudah mulai bergeser menggunakan format **WebP** atau **AVIF** yang menggabungkan keunggulan kompresi dari keduanya.`,
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
    tags: ["citra", "gambar", "jpeg", "png", "desain"],
    published: true,
  },
  {
    title:
      "Tragedi Desain Meleset: Memahami Perbedaan Ruang Warna RGB dan CMYK",
    excerpt:
      "Mengapa poster yang terlihat cerah di layar monitor tiba-tiba menjadi gelap dan kusam saat dibawa ke tempat percetakan?",
    content: `Kasus klasik mahasiswa tingkat awal: Udah capek-capek bikin poster *event* himpunan pakai gradasi warna neon ngejreng di Adobe Illustrator, eh pas di- *print* di tukang fotokopian warnanya malah jadi butek dan gelap. Kesalahannya ada di mana? Jawabannya ada pada ketidakpahaman soal **Color Space** (Ruang Warna) dalam sistem representasi citra.

Dalam multimedia grafis, ada dua kutub utama representasi warna yang cara kerjanya sangat bertolak belakang:

### 1. Sistem RGB (Red, Green, Blue) - Additive Color
Ini adalah ruang warna untuk layar monitor, HP, dan TV. Layar monitor memancarkan cahaya (emit light). Kalau kamu mencampur cahaya merah, hijau, dan biru dengan intensitas penuh (100%), yang kamu dapatkan adalah **warna putih terang**. Konsep ini dipakai buat segala produk digital (Web, Video, Game).

### 2. Sistem CMYK (Cyan, Magenta, Yellow, Key/Black) - Subtractive Color
Ini adalah format warna wajib untuk **tinta percetakan**. Tinta tidak memancarkan cahaya, melainkan menyerap cahaya lampu ruangan. Kalau kamu menumpuk cat basah warna Cyan, Magenta, dan Yellow di atas kertas, hasilnya malah akan jadi kotor kehitaman (warna gelap). 

Nah, spektrum *gamut* (batas kemampuan nampilin warna) RGB itu jauh lebih luas dari CMYK. Jadi, warna hijau fosfor di layar laptopmu memang secara fisik nggak bisa direproduksi oleh tabung tinta printer biasa. *Lesson learned*: Kalau bikin karya visual yang *output*-nya mau dicetak fisik, setting kanvas kamu ke *mode* CMYK dari awal bikin *project*!`,
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
    tags: ["citra", "warna", "rgb", "cmyk", "grafis"],
    published: true,
  },
  {
    title: "Awas Doxxing! Bahaya Tersembunyi di Balik Metadata EXIF Foto",
    excerpt:
      "Mempelajari cara sistem menyimpan data tersembunyi non-visual di dalam sebuah file gambar dan implikasinya terhadap keamanan privasi data.",
    content: `Sebuah file foto berformat JPG itu nggak cuma isinya warna-warni piksel gambar lho. Di dalam strukturnya, ada sebuah "buku catatan" tak kasat mata yang menyimpan segudang rahasia. Buku catatan inilah yang kita sebut dengan **Metadata EXIF (Exchangeable Image File Format)**.

Dalam dunia sistem multimedia, metadata sangat berguna untuk manajemen aset digital. Aplikasi seperti Google Photos bisa mengelompokkan fotomu berdasarkan tempat liburan karena mereka membaca data ini. Tapi di sisi lain, ini bisa jadi celah privasi yang menyeramkan.

### Apa Saja yang Disimpan EXIF?
Kapanpun kamu menjepret pakai kamera HP, file JPG yang tersimpan biasanya akan "membungkus" data-data berikut:
- **Tipe Perangkat:** Merek dan model HP (misal: iPhone 15 Pro, Samsung S24).
- **Parameter Lensa:** *Aperture*, ISO, *Shutter Speed*, dan apakah kamu pakai *flash* atau nggak.
- **Waktu & Tanggal:** Jam, menit, dan detik akurat kapan tombol *shutter* ditekan.
- **Lokasi GPS (Geotagging):** Koordinat *Latitude* dan *Longitude* super presisi tempat kamu berdiri saat moto!

Bayangkan kalau kamu iseng *upload* foto mentah di sekitar rumahmu ke forum publik. Seseorang dengan niat jahat tinggal men- *download* gambarnya, ngecek atribut *properties* di PC, dan ketahuan deh lokasi persis rumahmu. Untungnya, platform modern kayak WhatsApp atau Instagram sudah otomatis men- *strip* (menghapus) metadata ini saat kita nge- *upload* untuk alasan keamanan.`,
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=1200&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=600&q=80",
    tags: ["citra", "metadata", "exif", "privasi"],
    published: true,
  },
  {
    title:
      "Grafis Vektor vs Bitmap: Mengapa Logo Perusahaan Bisa Di-zoom Tanpa Pecah?",
    excerpt:
      "Mengenal perbedaan arsitektur gambar berbasis matematika (Vektor) dengan gambar berbasis titik piksel (Bitmap/Raster).",
    content: `Coba tes ini di HP-mu: ambil sebuah foto hasil kamera, terus lakuin *zoom in* pakai dua jari sampai *mentok*. Gambar yang tadinya kelihatan tajam pasti ujung-ujungnya hancur dan kelihatan bentuk kotak-kotak kecilnya. Tapi kalau kamu buka gambar logo Google atau ikon di dalam *website*, kamu *zoom* sedekat apapun pinggirannya tetep mulus. Kenapa bisa beda?

Ini adalah studi kasus paling mendasar dari representasi citra: **Vektor versus Bitmap**.

### Bitmap (Raster) = Kumpulan Lego
Foto JPG atau PNG (gambar *thumbnail* artikel ini) menggunakan format Bitmap. Cara kerjanya persis kayak nyusun mainan Lego di atas papan. Satu foto butuh ribuan kotak kecil (piksel) yang masing-masing punya warna sendiri. Kelemahannya jelas, karena informasinya *fixed*, kalau gambarnya ditarik jadi ukuran baliho, pikselnya akan melar dan pecah (blur).

### Vektor (SVG/EPS) = Rumus Matematika
Format Vektor (biasa dibikin pakai Adobe Illustrator atau CorelDraw) sama sekali nggak pakai piksel. Gambar ini menyimpan **koordinat dan rumus matematika**. Misalnya kamu gambar lingkaran merah, komputer cuma nyimpen data: "Buat lingkaran di titik koordinat X,Y dengan jari-jari R dan warna isi #FF0000". 

Mau gambarnya di-*zoom* setara ukuran layar HP atau ditaruh di spanduk stadion bola, komputer tinggal ngekalkulasi ulang rumusnya secara *real-time*. Hasilnya? Kualitasnya *infinite* alias gak akan pernah burik atau pecah. *Developer Front-End* seneng banget pakai file format \`.svg\` buat ikon web karena *size*-nya super kecil tapi kualitasnya abadi.`,
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    tags: ["citra", "vektor", "bitmap", "svg", "desain"],
    published: true,
  },
  {
    title:
      "Masa Depan Format Web: Selamat Tinggal JPEG, Selamat Datang WebP & AVIF",
    excerpt:
      "Menyelidiki inovasi codec gambar generasi baru yang mulai menggeser dominasi JPEG dan PNG di jagat pengembangan web modern.",
    content: `Selama lebih dari 20 tahun, jagat internet cuma bergantung sama trio mematikan ini buat urusan gambar: JPEG (buat foto), PNG (buat *transparent background*), dan GIF (buat meme gerak-gerak yang sering garing). 

Tapi seiring berkembangnya web modern dan tuntutan *loading page* yang secepat kilat dari Google (metrik *Core Web Vitals*), trio jadul ini udah mulai kewalahan. Ukuran file mereka dianggap terlalu gendut. Maka lahirlah generasi baru format citra multimedia: **WebP** dan **AVIF**.

### WebP si Anak Emas Google
Google ngembangin WebP buat ngebungkus kemampuan JPEG, PNG, sama GIF dalam satu ekstensi aja. WebP mendukung transparansi kayak PNG, bisa gerak kayak GIF, tapi punya kompresi foto *lossy* yang jauh lebih sadis dari JPEG. Hasilnya? File yang ukurannya bisa **25% sampai 35% lebih kecil** dari JPEG dengan kualitas mata telanjang yang sama percis. Pantesan sekarang semua gambar *thumbnail* di YouTube kalau lu *Save As...* formatnya pasti WebP.

### AVIF: Sang Penantang Baru Berbasis Video
Yang lebih sinting lagi format AVIF (AV1 Image File Format). AVIF ini aslinya turunan dari kompresi video Netflix (*codec* AV1). Jadi cara dia nge- *compress* gambar statis ngikutin logika kompresi video *ultra-high-definition*. Secara statistik, ukuran file AVIF bisa sampai **50% lebih kecil dibanding JPEG** standar.

Hambatan mereka saat ini cuma di masalah kompatibilitas (belum semua *browser* atau HP jadul *support* ngebuka gambarnya). Tapi secara teknis, format-format ini adalah masa depan sistem distribusi media.`,
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    tags: ["citra", "webp", "avif", "jpeg", "kompresi"],
    published: true,
  },
  {
    title: "Algoritma Huffman: Mengapa File Teks ZIP Bisa Sangat Kecil?",
    excerpt:
      "Penjelasan teori di balik kompresi data teks yang lossless, memastikan efisiensi penyimpanan database tanpa hilangnya sebuah karakter.",
    content: `Dibandingkan video resolusi tinggi atau grafis 3D, data teks mungkin terlihat sepele. Representasi data teks di komputer biasanya menggunakan standar *encoding* seperti ASCII (1 karakter = 8 bit) atau UTF-8. 

Namun bayangkan skenario *database* pemerintahan, data *log* server raksasa, atau arsip rekam medis rumah sakit yang menyimpan milyaran baris catatan teks. Penyimpanan hariannya saja bisa mencapai puluhan Gigabyte. Di sinilah metode kompresi teks beraksi.

### Logika Sederhana Kompresi Teks
Berbeda dengan media audio/video yang bisa di- *compress* secara *lossy* (dibuang sebagian datanya), kompresi teks **wajib bersifat Lossless**. Kamu tidak boleh menghilangkan satu huruf pun dari dokumen perjanjian hukum atau *source code* aplikasi saat dikompresi menjadi file \`.zip\`.

Salah satu algoritma paling legendaris yang diajarkan di matkul sistem multimedia adalah **Huffman Coding**. 
Cara kerjanya cerdik: daripada menyimpan setiap karakter dengan ukuran bit yang seragam, Huffman membuat semacam "kamus dinamis". Huruf yang sering muncul dalam kalimat (misalnya huruf vokal 'A' atau karakter spasi) direpresentasikan dengan kode biner yang sangat pendek (misal: \`10\`), sedangkan huruf langka seperti 'Z' atau 'X' diberi kode biner agak panjang (misal: \`110101\`). 

Dengan manipulasi frekuensi probabilitas karakter ini, ukuran *file log* atau dokumen buku teks bisa menyusut hingga lebih dari 60% tanpa kehilangan sepeserpun informasi ketika diekstrak kembali.`,
    mediaType: "ARTICLE",
    mediaUrl: null,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    tags: ["teks", "kompresi", "algoritma", "huffman"],
    published: true,
  },
  {
    title:
      "Multimedia Interaktif: Mengapa UI/UX Menentukan Kesuksesan Sebuah Aplikasi?",
    excerpt:
      'Pentingnya Human-Computer Interaction dalam mengemas elemen multimedia agar pengguna tidak bingung atau merasa "overwhelmed".',
    content: `Punya sistem multimedia *backend* yang canggih dengan kecepatan *streaming* video dewa nggak akan ada artinya kalau tampilan antarmuka (UI) aplikasimu bikin *user* pusing tujuh keliling.

Sering nemu website portal pemerintah zaman *old*? Teks berjalan (*marquee*), warna *background* yang bikin sakit mata, plus *auto-play* musik *midi* di latar belakang? Itu adalah contoh terburuk dari kegagalan menyajikan elemen multimedia secara interaktif.

### Prinsip Beban Kognitif (Cognitive Load)
Dalam merancang produk digital (web, *mobile app*, atau *game interface*), seorang developer harus memperhatikan batas daya serap informasi otak manusia. Kalau kita menumpuk teks panjang, galeri foto, animasi *flashy*, dan suara notifikasi dalam satu layar secara bersamaan, *user* akan mengalami *cognitive overload*. Mereka malah nggak akan baca beritamu dan langsung pencet tombol *Close*.

### Aturan Emas Penyajian Media:
1. **Visual Hierarchy:** Arahkan mata *user* dari yang paling penting (misal: Thumbnail Video) ke yang sekunder (teks deskripsi).
2. **Kontrol User itu Mutlak:** Jangan pernah pasang video/audio yang nge- *play* sendiri dengan suara kencang (kecuali *muted autoplay* kayak di TikTok). Beri *user* tombol *Play/Pause* yang jelas.
3. **White Space:** Jangan takut sama ruang kosong. Celah kosong antar paragraf dan gambar bukan berarti "desain yang belum selesai", tapi itu ruang bernafas buat mata *user*.`,
    mediaType: "ARTICLE",
    mediaUrl: null,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    tags: ["ui", "ux", "desain", "interaktif", "teks"],
    published: true,
  },
  {
    title:
      "Digital Rights Management (DRM): Cara Spotify dan Netflix Melindungi Aset Mereka",
    excerpt:
      "Memahami teknologi perlindungan hak cipta digital yang mencegah pembajakan aset multimedia.",
    content: `Pernah iseng coba ngebuka folder instalasi Spotify di PC buat nyari file MP3 hasil *download offline*, tapi yang ketemu malah rentetan *file* aneh tanpa ekstensi yang gak bisa diputar di Winamp atau media player lain? Atau pernah mau *screenshot* adegan drakor keren di Netflix lewat HP, tapi hasilnya cuma dapet layar hitam pekat?

Selamat, kamu baru saja berhadapan dengan tembok pertahanan aset multimedia bernama **DRM (Digital Rights Management)**.

### Gimana Cara Kerja DRM?
DRM adalah teknologi sistem enkripsi (*cryptography*) yang ditanamkan ke dalam alur distribusi konten media digital. Tujuannya simpel: mastiin cuma *user* yang bayar langganan berbayar (dan pakai aplikasi resmi) yang bisa nikmatin kontennya, mencegah pembajakan *copy-paste* sembarangan.

Cara kerjanya secara awam:
1. Sebelum lagu atau video dikirim dari server, filenya akan **dienkripsi** (diacak) menggunakan *Key* (kunci) khusus.
2. Ketika *streaming* masuk ke HP/Laptop, *player* Netflix/Spotify akan ngecek status akun kamu, lalu secara diam-diam me- *request* *Decryption Key* ke server DRM.
3. Proses dekripsi terjadi di *level hardware/memory* tertutup (seperti Widevine DRM buatan Google), bukan disimpan di hardisk lokal.

Makanya, buat mahasiswa IT, kalau mau bikin *platform streaming* komersial, ilmu soal kompresi video saja gak cukup. Kamu wajib tahu cara masang arsitektur DRM biar konten kreator di platformmu aman dari *screencast* bajakan!`,
    mediaType: "ARTICLE",
    mediaUrl: null,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80",
    tags: ["drm", "keamanan", "enkripsi", "hak-cipta"],
    published: true,
  },
  {
    title: "Augmented Reality vs Virtual Reality: Beda Tipis Tapi Signifikan",
    excerpt:
      "Mempelajari perbedaan mendasar interaksi spasial antara AR dan VR sebagai evolusi platform konten multimedia.",
    content: `Teknologi multimedia interaktif udah makin gila, nggak sekadar klik *mouse* layar datar aja. Sekarang kita sering banget disuguhi dua istilah yang kedengarannya mirip tapi cara nge-*handle* dunianya beda banget: **Virtual Reality (VR)** sama **Augmented Reality (AR)**.

Sering ketuker? Santai, ini cara paling gampang ngebedainnya pakai logika *software*.

### 1. Virtual Reality (VR): Ganti Realitas 100%
Kalau lu pake *headset* kayak Meta Quest 3, mata lu beneran ketutup layar. *Software* bakal nge- *render* ulang 100% dunia yang ada di sekitar lu. Ruang tamu lu tiba-tiba ilang berubah jadi arena *rollercoaster* fiktif. 
Tantangan multimedianya di sini adalah nge-*render* grafik 3D secara super cepat (FPS tinggi) untuk dua sudut pandang mata yang beda (*stereoskopik*) biar penggunanya gak mual (*motion sickness*).

### 2. Augmented Reality (AR): Nambahin Elemen Digital ke Dunia Nyata
Kebalikan dari VR, AR itu nggak nutupin pandangan asli lu. Contoh paling *legend* itu *game* Pokemon GO atau filter Instagram. *Software* nangkep tangkapan kamera HP lu, terus nyelipin animasi 3D Pikachu seolah-olah dia lagi berdiri di meja makan rumah lu. 
Tantangannya beda lagi: AR butuh kecerdasan buatan (*Computer Vision*) buat memetakan kedalaman ruangan dan ngebaca batas tembok/lantai (*Spatial Mapping*) secara akurat dan *real-time*.

Keduanya adalah puncak evolusi sistem representasi data, di mana grafis, suara *spatial*, dan sensor giroskop digabung buat ngibulin indra manusia.`,
    mediaType: "ARTICLE",
    mediaUrl: null,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
    tags: ["ar", "vr", "realitas", "interaktif", "3d"],
    published: true,
  },
  {
    title:
      "CDN (Content Delivery Network): Kurir Paket Rahasia di Dunia Streaming",
    excerpt:
      "Arsitektur jaringan distribusi konten yang memungkinkan file raksasa multimedia diakses jutaan pengguna tanpa buffering.",
    content: `Pernah mikir nggak, markas besar server Netflix atau YouTube itu kan ada di Amerika Serikat, ukurannya bergiga-giga. Tapi kok pas kita *play* videonya di kamar kosan di Jakarta Selatan, *buffering*-nya cuma hitungan milidetik doang? Kok bisa data jalan lewatin kabel laut benua secepat itu?

Rahasia kecepatan multimedia modern itu nggak cuma di kompresinya aja, tapi ada di infrastruktur pengirimannya yang disebut **CDN (Content Delivery Network)**.

### Konsep Gudang Cabang (Edge Servers)
Ibaratnya lu lagi mesen paket Shopee dari toko pusat di luar negeri, pasti sampainya sebulan kan? Tapi kalau tuh toko punya "Gudang Cabang" di Jakarta, paket lu besoknya langsung nyampe. Nah, CDN kerjanya percis kayak gitu.

YouTube dan platform web besar nggak naruh file video tunggal mereka di satu server pusat buat diserbu satu dunia (bisa *down* servernya). Mereka mendistribusikan salinan *file* video lu ke ratusan komputer server kecil (*Edge Server*) yang tersebar di berbagai negara.

Jadi, pas lu nge-klik video di Indonesia, lu secara otomatis narik paket data videonya dari server CDN YouTube terdekat (mungkin servernya ada di Jakarta atau Singapura). Jarak fisiknya pendek, latensi ping-nya kecil, otomatis *bandwidth* transfernya maksimal dan video lu langsung muter mulus tanpa putus-putus. Keren, kan?`,
    mediaType: "ARTICLE",
    mediaUrl: null,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["cdn", "streaming", "jaringan", "infrastruktur"],
    published: true,
  },
];

const generate100Posts = () => {
  const allPosts = [];
  const prefixes = [
    "Studi Kasus:",
    "Review Mendalam:",
    "Update 2026:",
    "Edisi Lanjutan:",
    "Analisis Terkini:",
  ];

  for (let i = 0; i < basePosts.length; i++) {
    allPosts.push({
      ...basePosts[i],
      slug: slugify(basePosts[i].title),
    });
  }

  for (let i = 21; i <= 100; i++) {
    const baseIndex = i % basePosts.length;
    const base = basePosts[baseIndex];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const generatedTitle = `${randomPrefix} ${base.title} (Vol. ${Math.floor(i / 20) + 1})`;

    allPosts.push({
      ...base,
      title: generatedTitle,
      slug: slugify(`${generatedTitle}-${i}`),
    });
  }

  return allPosts;
};

async function main() {
  console.log("🌱 Menyiapkan database CMS Multimedia (Bulk 100 Data Mode)...");

  // Bersihkan data lama
  await prisma.post.deleteMany();
  console.log("Data lama berhasil dihapus");

  const finalPosts = generate100Posts();

  for (let i = 0; i < finalPosts.length; i++) {
    await prisma.post.create({ data: finalPosts[i] });
    if ((i + 1) % 10 === 0 || i === 0) {
      console.log(`[${i + 1}/100] Sukses inject: "${finalPosts[i].title}"`);
    }
  }

  console.log(
    `\nBerhasil menyematkan total ${finalPosts.length} artikel ke database secara otomatis!`,
  );
}

main()
  .catch((e) => {
    console.error("Terjadi kesalahan saat proses seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
