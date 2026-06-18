# MediaHub

MediaHub adalah sebuah Sistem Manajemen Konten (CMS) dan portal berita multimedia kustom yang dirancang dengan antarmuka **Neo-Brutalisme** yang khas. Proyek ini dibangun untuk mengatasi kebutuhan pengelolaan konten yang beragam (Video, Audio, Gambar, dan Artikel) dalam satu _platform_ tersentralisasi yang sangat cepat, minim konfigurasi, dan memiliki identitas desain yang berani (garis tebal, kontras tinggi, elemen _raw_).

Dikembangkan sebagai pemenuhan Tugas Sistem Multimedia (SISMUL WEB).

## Teknologi yang Digunakan (Tech Stack)

Proyek ini dibangun menggunakan teknologi _modern web development_ terkini:

- **Framework:** Next.js 14+ (App Router) & React 19
- **Bahasa:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (dengan kustomisasi utilitas Brutalisme seperti `brutal-border` dan `brutal-shadow`)
- **Database & ORM:** PostgreSQL via Supabase & Prisma ORM
- **Markdown Processing:** `react-markdown` & `remark-gfm`
- **Tipografi:** Bricolage Grotesque (Google Fonts)

---

## Fitur Utama

Aplikasi ini dibagi menjadi dua bagian utama: **Portal Publik** dan **Dasbor Admin**.

### 1. Desain Neo-Brutalisme Kustom

Berbeda dengan web pada umumnya, MediaHub menggunakan warna solid (_high-contrast_), tanpa sudut melengkung (_border-radius: 0_), dan bayangan pekat tebal untuk memberikan efek industrial yang berani.

### 2. Dukungan Multimedia Penuh

Sistem ini membedakan dan menangani 4 tipe media secara native:

- **[▶] Video:** Penanam (_embed_) responsif YouTube atau URL langsung.
- **[♪] Audio:** Pemutar audio terintegrasi (_custom player_).
- **[■] Gambar:** Dukungan resolusi tinggi dengan optimasi Next/Image.
- **[≡] Artikel:** Format penulisan panjang (teks murni).

### 3. Editor Markdown Split-Screen

Dasbor admin dilengkapi dengan editor Markdown terintegrasi di mana penulis bisa mengetik sintaks secara langsung di atas dan melihat _Live Preview_ hasil jadinya di bawah secara _real-time_.

### 4. Manajemen Konten Super Cepat (Server Actions)

Menggunakan _Next.js Server Actions_ untuk memproses Create, Read, Update, Delete (CRUD) langsung di _server_, dipadukan dengan teknik `unstable_cache` untuk mengurangi beban _database_.

### 5. Fitur Interaktif Publik

- **Pencarian Global:** Pencarian teks penuh pada judul, kutipan, dan isi artikel.
- **Estimasi Waktu Baca:** Menghitung otomatis durasi waktu untuk membaca sebuah teks (misal: `[3 MIN READ]`).
- **Konten Terkait:** Sistem pintar yang merekomendasikan 3 postingan relevan di akhir setiap bacaan.

---

## Panduan Instalasi dan Penggunaan

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal di mesin Anda.

### 1. Persyaratan Sistem

- [Node.js](https://nodejs.org/en/) (v18.17 atau lebih baru)
- Akun [Supabase](https://supabase.com/) (untuk _Database_ PostgreSQL)

### 2. Instalasi Dependensi

Buka terminal Anda, arahkan ke direktori proyek, lalu jalankan:

```bash
npm install
```

### 3. Konfigurasi Lingkungan (Environment Variables)

Buat sebuah file bernama `.env` di direktori _root_ (paling luar) proyek ini. Isi file tersebut dengan kredensial dari Supabase Anda:

```env
DATABASE_URL=""
DIRECT_URL=""

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4. Sinkronisasi Database

Jalankan perintah prisma untuk menerapkan skema (_schema_) ke dalam Supabase Anda:

```bash
npx prisma generate
npx prisma db push
```

_(Opsional)_ Jika Anda ingin melihat/mengelola database secara visual melalui browser:

```bash
npx prisma studio
```

### 5. Menjalankan Aplikasi

Mulai server pengembangan lokal:

```bash
npm run dev
```

Aplikasi Anda kini berjalan!

- **Portal Publik:** Buka `http://localhost:3000` di _browser_.
- **Dasbor Admin:** Buka `http://localhost:3000/admin` untuk mengelola konten.

---
