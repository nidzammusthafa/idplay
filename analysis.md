# Analisis Komponen Harga dan Halaman Produk IdPlay

Dokumen ini menganalisis komponen yang terkait dengan tampilan harga produk dan halaman detail produk pada proyek IdPlay.

## 1. Ikhtisar Proyek

Proyek ini adalah aplikasi web yang dibangun menggunakan Next.js dan React dengan TypeScript. Aplikasi ini berfungsi sebagai situs web pemasaran untuk penyedia layanan internet bernama IdPlay. Styling ditangani oleh Tailwind CSS.

- **Framework**: Next.js 15.3.5
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Dependencies Utama**: `react`, `react-dom`, `next`, `leaflet`, `lucide-react`.

## 2. Sumber Data Produk

Sumber utama untuk semua data produk, termasuk kecepatan, fitur, dan harga, adalah sebuah *constant* array bernama `PACKAGE_PLANS`.

- **Lokasi File**: `/mnt/e/Projects/idplay/src/lib/constants.tsx`
- **Struktur Data**: Array dari objek `PackagePlan`, di mana setiap objek merepresentasikan satu paket internet dengan properti seperti:
    - `speed` (number): Kecepatan paket dalam Mbps.
    - `color` (string): Warna tema untuk kartu produk.
    - `features` (string[]): Daftar fitur utama.
    - `prices` (object): Objek yang berisi detail harga untuk periode berbeda (`monthly`, `sixMonths`, `twelveMonths`).
    - `badge` (string, optional): Label khusus seperti "Terlaris!".

Terdapat file duplikat di `/mnt/e/Projects/idplay/constants.tsx`, namun file di dalam `src/lib/` adalah yang secara aktif digunakan oleh halaman-halaman aplikasi.

## 3. Halaman Harga (`/harga`)

Halaman ini menampilkan semua paket internet yang tersedia dan memungkinkan pengguna membandingkan harga berdasarkan periode pembayaran.

- **File Komponen**: `/mnt/e/Projects/idplay/src/app/harga/page.tsx`
- **Komponen Utama**: `HargaPage`

### Aspek dan Fungsionalitas:

1.  **State Management**: Menggunakan `useState` dari React untuk mengelola periode pembayaran yang aktif (`activePeriod`), yang bisa berupa `monthly`, `sixMonths`, atau `twelveMonths`.
2.  **Data Fetching**: Mengimpor `PACKAGE_PLANS` langsung dari `src/lib/constants.tsx`.
3.  **UI Toggle**: Terdapat tombol *toggle* untuk mengubah periode pembayaran. Perubahan ini akan memicu *re-render* untuk menampilkan harga yang sesuai.
4.  **Tampilan Kartu Produk**:
    - Melakukan iterasi (map) pada `PACKAGE_PLANS`.
    - Untuk setiap paket, sebuah kartu (dibuat dengan `Link` dari Next.js) ditampilkan.
    - Kartu ini menampilkan kecepatan, fitur, dan harga sesuai dengan `activePeriod` yang dipilih.
    - Jika sebuah paket tidak tersedia untuk periode tertentu (harga di-set sebagai `"-"`), kartu akan ditampilkan sebagai non-aktif (*disabled*).
5.  **Routing**: Setiap kartu produk yang aktif mengarah ke halaman detail produk (`/paket/[slug]`). *Slug* URL dibuat secara dinamis berdasarkan kecepatan dan periode pembayaran (contoh: `/paket/20-mbps-bulanan`).
6.  **Banner Tambahan**: Di bagian bawah halaman, terdapat gambar statis (`price-list.webp`) yang menampilkan daftar harga resmi.

## 4. Halaman Detail Produk (`/paket/[slug]`)

Halaman ini adalah halaman dinamis yang menampilkan informasi mendalam tentang satu paket spesifik untuk periode pembayaran tertentu.

- **File Komponen**: `/mnt/e/Projects/idplay/src/app/paket/[slug]/page.tsx`
- **Komponen Utama**: `PaketPage`

### Aspek dan Fungsionalitas:

1.  **Static Site Generation (SSG)**: Halaman ini di-generate secara statis saat proses *build* menggunakan `generateStaticParams`. Fungsi ini membuat semua kemungkinan kombinasi *slug* berdasarkan data `PACKAGE_PLANS`, memastikan semua halaman detail produk sudah siap sebelum diakses pengguna untuk performa maksimal.
2.  **Parsing Slug**: Terdapat fungsi `parseSlug` untuk mengurai informasi kecepatan dan periode dari *slug* URL.
3.  **Data Retrieval**: Fungsi `getPackageDetails` menggunakan *slug* yang sudah diurai untuk mencari data paket yang relevan dari `PACKAGE_PLANS`.
4.  **Konten Dinamis**:
    - **Informasi Harga**: Menampilkan harga per bulan dan total pembayaran (jika berlaku) untuk paket dan periode yang dipilih.
    - **Konten Kontekstual**: Menggunakan fungsi `getIdealUsageContent` yang memberikan deskripsi dan *tag* penggunaan ideal berdasarkan kecepatan paket (misalnya, "Sempurna untuk Kebutuhan Dasar" untuk 15 Mbps). Ini adalah cara yang baik untuk memberikan nilai tambah kepada pengguna.
    - **Gambar Dinamis**: Gambar *header* untuk setiap halaman (`finalImageUrl`) dipilih secara dinamis berdasarkan kecepatan dan periode dari *slug*.
5.  **SEO**: Metadata (judul dan deskripsi) halaman di-generate secara dinamis menggunakan `generateMetadata` untuk setiap paket, yang sangat baik untuk SEO. Judul dan deskripsi dioptimalkan dengan informasi kecepatan, harga, dan periode.
6.  **Call to Action (CTA)**: Terdapat tombol "Langganan Sekarang" yang mengarahkan pengguna ke halaman `/cek-jangkauan`.

## 5. Komponen `Pricing.tsx` (Tidak Digunakan di Halaman Utama)

Terdapat komponen `Pricing` yang lebih kompleks, namun tampaknya tidak diintegrasikan ke dalam halaman `/harga` saat ini.

- **File Komponen**: `/mnt/e/Projects/idplay/src/components/Pricing.tsx`
- **Komponen Utama**: `Pricing` dan `PriceCard`

### Aspek dan Fungsionalitas:

1.  **Tampilan Carousel/Slider**: Komponen ini dirancang sebagai *slider* horizontal untuk menampilkan kartu-kartu harga, lengkap dengan tombol navigasi "sebelumnya" dan "berikutnya".
2.  **State & Ref Management**: Menggunakan `useState` dan `useRef` secara ekstensif untuk mengelola *state* slider, seperti indeks kartu yang aktif (`currentIndex`) dan referensi ke elemen DOM untuk *scrolling*.
3.  **Data Source**: Komponen ini mengimpor `PACKAGE_PLANS` dari file `constants.tsx` di *root* direktori, bukan dari `src/lib/constants.tsx`. Ini menunjukkan kemungkinan adanya inkonsistensi atau komponen ini adalah versi lama.
4.  **Interaktivitas**: Logika yang cukup kompleks untuk menangani *scrolling* (programatik dan manual) serta *intersection observer* untuk mendeteksi kartu mana yang sedang terlihat di layar.
5.  **Potensi Penggunaan**: Komponen ini bisa jadi dirancang untuk digunakan di halaman utama (`/`) atau sebagai alternatif tampilan di halaman harga.

## 6. Ringkasan dan Kesimpulan

- **Struktur Data Terpusat**: Penggunaan `PACKAGE_PLANS` sebagai satu-satunya sumber kebenaran (*single source of truth*) untuk data produk adalah praktik yang sangat baik. Ini membuat pemeliharaan data menjadi mudah.
- **Komponen Halaman Harga (`/harga`)**: Implementasinya sederhana, efektif, dan fungsional. Komponen ini langsung menampilkan semua opsi secara jelas dalam bentuk *grid*.
- **Komponen Halaman Detail Produk (`/paket/[slug]`)**: Implementasi yang solid dengan pemanfaatan fitur-fitur Next.js seperti SSG (`generateStaticParams`) dan metadata dinamis. Penambahan konten kontekstual (`getIdealUsageContent`) adalah nilai plus yang signifikan.
- **Inkonsistensi**: Terdapat duplikasi file konstanta (`constants.tsx` dan `src/lib/constants.tsx`) dan komponen `Pricing.tsx` yang tidak terpakai yang mengacu pada file konstanta yang salah. Ini bisa dirapikan untuk menghindari kebingungan di masa depan.

Secara keseluruhan, arsitektur komponen untuk harga dan produk sudah bagus, modular, dan memanfaatkan kekuatan Next.js dengan baik untuk performa dan SEO.
