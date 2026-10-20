# SPMB Frontend — Sistem Penerimaan Murid Baru

Frontend aplikasi Sistem Penerimaan Murid Baru (SPMB) dibangun menggunakan **React, Vite, dan Tailwind CSS**. Aplikasi ini berfungsi sebagai antarmuka pengguna untuk proses pendaftaran calon murid baru, pengelolaan data pendaftaran, unggah dokumen persyaratan, serta pemantauan hasil seleksi.

Frontend berkomunikasi dengan backend Laravel melalui REST API. Backend bertanggung jawab atas autentikasi, validasi data, otorisasi pengguna, pengelolaan database PostgreSQL, dan penyimpanan dokumen melalui Supabase Storage.

Dokumentasi ini menjelaskan arsitektur frontend, fungsi setiap modul, integrasi API, konfigurasi lingkungan, instalasi, pengujian, serta rencana pengembangan aplikasi.

## Daftar Isi

- [Ringkasan Proyek](#ringkasan-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Arsitektur Aplikasi](#arsitektur-aplikasi)
- [Peran Pengguna](#peran-pengguna)
- [Fitur dan Fungsi Frontend](#fitur-dan-fungsi-frontend)
- [Alur Pendaftaran Siswa](#alur-pendaftaran-siswa)
- [Struktur Folder](#struktur-folder)
- [Integrasi API Laravel](#integrasi-api-laravel)
- [Konfigurasi Lingkungan](#konfigurasi-lingkungan)
- [Instalasi dan Menjalankan Frontend](#instalasi-dan-menjalankan-frontend)
- [Panduan Pengujian](#panduan-pengujian)
- [Keamanan Frontend](#keamanan-frontend)
- [Penanganan Error](#penanganan-error)
- [Rencana Pengembangan Selanjutnya](#rencana-pengembangan-selanjutnya)
- [Status Dokumentasi](#status-dokumentasi)

## Ringkasan Proyek

SPMB merupakan aplikasi berbasis web yang membantu proses penerimaan murid baru secara digital.

Frontend menyediakan antarmuka yang menghubungkan calon siswa, panitia, dan administrator dengan layanan backend Laravel.

| Komponen | Teknologi | Fungsi |
|---|---|---|
| Frontend | React | Membangun antarmuka dan komponen UI |
| Development Server | Vite | Menjalankan server pengembangan dan membangun aplikasi produksi |
| Styling | Tailwind CSS | Mengatur desain, layout, dan responsivitas |
| Backend | Laravel | Menyediakan REST API dan logika bisnis |
| Database | PostgreSQL (Supabase) | Menyimpan data pengguna dan pendaftaran |
| Penyimpanan Berkas | Supabase Storage | Menyimpan dokumen persyaratan |
| Autentikasi API | Laravel Sanctum | Mengelola autentikasi dan akses API |
| Email | Brevo SMTP | Mengirim OTP dan email autentikasi melalui backend |

## Teknologi yang Digunakan

### React

React digunakan untuk membangun antarmuka berbasis komponen. Komponen dapat digunakan kembali untuk formulir, navigasi, dashboard, tabel data, notifikasi, dan tampilan status pendaftaran.

### Vite

Vite digunakan sebagai development server dan build tool untuk aplikasi React. Vite menyediakan proses pengembangan yang cepat serta menghasilkan aset frontend yang siap diterapkan ke lingkungan produksi.

### Tailwind CSS

Tailwind CSS digunakan untuk membangun desain antarmuka dengan utility classes, termasuk:

- Layout halaman dan dashboard.
- Formulir autentikasi dan pendaftaran.
- Tabel data dan kartu informasi.
- Tampilan responsif untuk desktop, tablet, dan perangkat seluler.
- Indikator status, pesan validasi, dan notifikasi.

### Laravel REST API

Laravel berfungsi sebagai backend utama yang memproses permintaan dari frontend. Seluruh validasi bisnis, autentikasi, otorisasi, dan operasi database harus dilakukan atau diverifikasi oleh backend.

## Arsitektur Aplikasi

Secara umum, arsitektur aplikasi menggunakan pola frontend dan backend yang terpisah.

```text
┌───────────────────────────────┐
│        Pengguna SPMB          │
│  Siswa / Panitia / Admin      │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│        Frontend React         │
│                               │
│  Vite + Tailwind CSS          │
│  Halaman, Formulir, Dashboard  │
│  Validasi Input dan Navigasi  │
└──────────────┬────────────────┘
               │
               │ HTTP / HTTPS
               │ REST API + JSON
               ▼
┌───────────────────────────────┐
│        Backend Laravel        │
│                               │
│  Authentication               │
│  Authorization                │
│  Validasi dan Logika Bisnis   │
│  Pengelolaan Pendaftaran      │
└──────────┬───────────┬────────┘
           │           │
           ▼           ▼
┌────────────────┐  ┌────────────────┐
│ PostgreSQL     │  │ Supabase       │
│ Database       │  │ Storage         │
└────────────────┘  └────────────────┘
```

Alur komunikasi:

1. Pengguna membuka halaman frontend.
2. React menampilkan antarmuka berdasarkan halaman dan status autentikasi.
3. Frontend mengirim permintaan HTTP ke endpoint backend Laravel.
4. Laravel memvalidasi permintaan dan memeriksa hak akses.
5. Backend membaca atau memperbarui database dan penyimpanan berkas jika diperlukan.
6. Backend mengembalikan respons API.
7. Frontend menampilkan data, pesan keberhasilan, atau informasi kesalahan.

Frontend tidak mengakses database PostgreSQL secara langsung dan tidak menyimpan kredensial rahasia backend.

## Peran Pengguna

Aplikasi memiliki tiga peran utama.

| Role | Fungsi pada Frontend |
|---|---|
| `siswa` | Registrasi, verifikasi OTP, login, pengisian biodata, unggah berkas, pemilihan jurusan, dan pemantauan hasil seleksi |
| `panitia` | Melihat data pendaftar, memeriksa kelengkapan dokumen, melihat rekapitulasi, dan memperbarui hasil seleksi sesuai kewenangan |
| `admin` | Mengelola data jurusan dan mengakses fungsi administratif sesuai hak akses |

Tampilan menu dan dashboard disesuaikan dengan role pengguna. Namun, pembatasan akses pada frontend hanya berfungsi sebagai lapisan antarmuka. Backend Laravel tetap wajib memvalidasi role pada setiap endpoint yang memerlukan autentikasi.

## Fitur dan Fungsi Frontend

Bagian ini menjelaskan fungsi antarmuka yang perlu diintegrasikan dengan endpoint backend. Status implementasi setiap fitur harus disesuaikan dengan kode aktual pada repositori.

### 1. Halaman Publik

Halaman publik menjadi pintu masuk bagi pengguna yang ingin mendapatkan informasi penerimaan murid baru.

Fungsi utama:

- Menampilkan informasi SPMB.
- Menampilkan daftar jurusan yang tersedia.
- Menyediakan navigasi menuju halaman registrasi dan login.
- Menampilkan informasi persyaratan pendaftaran.
- Menampilkan informasi umum proses seleksi.

Daftar jurusan diambil melalui endpoint publik backend Laravel.

### 2. Registrasi Akun

Halaman registrasi digunakan calon siswa untuk membuat akun.

Fungsi:

- Menampilkan formulir pendaftaran akun.
- Memvalidasi input wajib sebelum permintaan dikirim.
- Mengirim data registrasi ke backend.
- Menampilkan pesan keberhasilan atau kesalahan.
- Mengarahkan pengguna ke halaman verifikasi OTP sesuai respons backend.

Validasi frontend membantu pengalaman pengguna, sedangkan validasi final tetap dilakukan oleh Laravel.

### 3. Verifikasi OTP

Halaman verifikasi OTP digunakan untuk mengonfirmasi alamat email pengguna.

Fungsi:

- Menyediakan input kode OTP enam digit.
- Mengirim kode OTP ke endpoint verifikasi.
- Menampilkan status verifikasi.
- Menampilkan informasi ketika kode tidak valid atau kedaluwarsa.
- Menyediakan mekanisme kirim ulang OTP jika didukung backend.

Setelah OTP berhasil diverifikasi, backend dapat membuat data awal pengguna, biodata, template berkas, dan nomor pendaftaran dalam satu transaksi database sesuai implementasi backend.

### 4. Login Pengguna

Halaman login menyediakan formulir autentikasi.

Fungsi:

- Menerima username, email, atau ID panitia sesuai aturan backend.
- Menerima kata sandi.
- Mengirim permintaan autentikasi ke Laravel.
- Menampilkan pesan jika kredensial tidak valid.
- Menangani respons pembatasan percobaan login.
- Mengarahkan pengguna ke dashboard berdasarkan role yang dikembalikan backend.

Frontend tidak boleh menentukan role hanya berdasarkan input pengguna. Role harus berasal dari identitas yang telah diverifikasi oleh backend.

### 5. Lupa dan Reset Password

Fungsi yang disediakan pada antarmuka:

- Formulir permintaan reset password.
- Input OTP reset password.
- Formulir kata sandi baru dan konfirmasi kata sandi.
- Pesan keberhasilan dan kegagalan proses.
- Navigasi kembali ke halaman login.

Pengiriman email OTP dan pembaruan kata sandi dilakukan melalui backend Laravel.

### 6. Dashboard Siswa

Dashboard siswa menampilkan ringkasan proses pendaftaran.

Fungsi:

- Menampilkan informasi akun dan nomor pendaftaran.
- Menampilkan ringkasan kelengkapan biodata.
- Menampilkan status dokumen persyaratan.
- Menampilkan pilihan jurusan.
- Menampilkan status proses pendaftaran.
- Menampilkan hasil seleksi setelah tersedia.

Data dashboard harus diperoleh dari API backend agar sesuai dengan kondisi terbaru di database.

### 7. Formulir Biodata

Formulir biodata digunakan siswa untuk melengkapi data diri.

Fungsi:

- Menampilkan data biodata yang tersimpan.
- Mengizinkan pengguna mengubah data yang diperbolehkan.
- Memvalidasi input wajib dan format data.
- Mengirim perubahan ke endpoint biodata.
- Menampilkan pesan keberhasilan atau kesalahan.
- Memperbarui tampilan setelah backend mengonfirmasi perubahan.

Backend bertanggung jawab menyinkronkan biodata dengan data pendaftaran sesuai aturan bisnis yang digunakan.

### 8. Manajemen Berkas Persyaratan

Halaman berkas digunakan untuk mengunggah dokumen pendaftaran.

Jenis dokumen yang didukung pada sistem backend:

- Ijazah atau Surat Keterangan Lulus (SKL).
- Kartu Keluarga (KK).
- Akta kelahiran.
- Pasfoto.

Fungsi antarmuka:

- Menampilkan daftar dokumen yang diperlukan.
- Menyediakan pemilihan berkas dari perangkat pengguna.
- Menampilkan nama dan ukuran berkas sebelum diunggah.
- Memvalidasi jenis dan ukuran berkas sesuai ketentuan sistem.
- Mengirim berkas melalui API backend.
- Menampilkan status unggah dan informasi kegagalan.
- Menampilkan status dokumen berdasarkan respons backend.

Penyimpanan akhir dokumen dilakukan melalui backend dan Supabase Storage sesuai arsitektur sistem.

### 9. Pemilihan Jurusan

Halaman pemilihan jurusan memungkinkan calon siswa memilih program atau jurusan yang tersedia.

Fungsi:

- Mengambil daftar jurusan dari API.
- Menampilkan nama dan informasi jurusan.
- Menampilkan pilihan jurusan yang telah tersimpan.
- Mengirim pilihan ke backend.
- Menampilkan konfirmasi setelah perubahan berhasil.

Aturan jumlah pilihan, perubahan pilihan, dan batas waktu pendaftaran mengikuti ketentuan backend.

### 10. Dashboard Panitia

Dashboard panitia digunakan untuk memantau proses penerimaan murid baru.

Fungsi:

- Menampilkan ringkasan jumlah pendaftar.
- Menampilkan daftar calon siswa.
- Menampilkan informasi biodata dan status kelengkapan dokumen sesuai izin akses.
- Menyediakan pencarian dan filter jika didukung API.
- Menampilkan rekapitulasi pendaftaran.
- Menyediakan antarmuka pembaruan status seleksi sesuai kewenangan.

Setiap operasi yang mengubah data seleksi harus dikonfirmasi oleh backend.

### 11. Dashboard Admin

Dashboard admin digunakan untuk mengelola data yang berkaitan dengan operasional sistem.

Fungsi:

- Menampilkan ringkasan data pendaftaran.
- Menampilkan daftar jurusan.
- Menambahkan data jurusan.
- Mengubah data jurusan.
- Menghapus data jurusan sesuai aturan sistem.
- Menampilkan informasi administratif yang diizinkan.

Aksi administratif harus dilindungi autentikasi dan otorisasi pada backend.

### 12. Status Pendaftaran dan Hasil Seleksi

Frontend menyediakan tampilan status proses pendaftaran dan hasil seleksi.

Contoh informasi yang dapat ditampilkan sesuai respons API:

- Pendaftaran sedang diproses.
- Dokumen belum lengkap.
- Pendaftaran sedang diverifikasi.
- Hasil seleksi tersedia.
- Dinyatakan lulus atau tidak lulus.

Label di atas merupakan contoh tampilan. Nilai status yang sebenarnya harus mengikuti enum, field, atau format respons backend, bukan dibuat sendiri oleh frontend.

## Alur Pendaftaran Siswa

Alur utama pendaftaran dirancang sebagai berikut:

1. Calon siswa membuka halaman SPMB.
2. Calon siswa melakukan registrasi akun.
3. Sistem mengirim OTP melalui email.
4. Calon siswa memasukkan kode OTP.
5. Backend memverifikasi OTP dan membuat data awal yang diperlukan.
6. Calon siswa login ke aplikasi.
7. Siswa melengkapi biodata.
8. Siswa mengunggah seluruh dokumen persyaratan.
9. Siswa memilih jurusan sesuai ketentuan.
10. Siswa memantau status pendaftaran.
11. Panitia melakukan pemeriksaan dan pengelolaan seleksi.
12. Siswa melihat hasil seleksi setelah diumumkan.

Tahapan ini menggambarkan alur sistem yang direncanakan berdasarkan kemampuan backend. Ketersediaan setiap halaman dan integrasinya perlu diperiksa pada kode frontend aktual.

## Struktur Folder

Berikut contoh struktur folder yang disarankan untuk frontend React + Vite.

```text
spmb-frontend/
├── public/
│   └── assets/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── ui/
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── SiswaLayout.jsx
│   │   ├── PanitiaLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   ├── public/
│   │   ├── auth/
│   │   ├── siswa/
│   │   ├── panitia/
│   │   └── admin/
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── biodataService.js
│   │   ├── berkasService.js
│   │   ├── jurusanService.js
│   │   └── pendaftaranService.js
│   ├── hooks/
│   ├── contexts/
│   ├── routes/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

Struktur tersebut merupakan rekomendasi pengorganisasian kode, bukan klaim bahwa seluruh file sudah tersedia. Sesuaikan dengan struktur folder proyek yang sebenarnya.

Fungsi direktori utama:

| Direktori | Tanggung Jawab |
|---|---|
| `components/` | Komponen UI yang dapat digunakan kembali |
| `layouts/` | Kerangka tampilan publik dan dashboard |
| `pages/` | Halaman berdasarkan fitur dan role |
| `services/` | Komunikasi dengan REST API Laravel |
| `hooks/` | Custom React hooks |
| `contexts/` | State global, misalnya konteks autentikasi |
| `routes/` | Konfigurasi navigasi dan proteksi rute |
| `utils/` | Fungsi pembantu dan pemformatan data |
| `assets/` | Gambar, ikon, dan aset frontend |

## Integrasi API Laravel

Frontend berkomunikasi dengan backend menggunakan HTTP request ke endpoint REST API.

### Konfigurasi Base URL

Gunakan variabel lingkungan Vite untuk menentukan alamat backend.

```env

```

Contoh variabel tersebut digunakan untuk lingkungan pengembangan lokal. Ganti nilainya dengan URL backend yang sesuai untuk lingkungan lain.

### API Client

Contoh implementasi menggunakan Fetch API pada file `src/services/api.ts`:

```Typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL");
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
    }
  );

  const contentType = response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(
      typeof data === "object" && data?.message
        ? data.message
        : `Permintaan gagal (${response.status})`
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}
```

Implementasi ini merupakan contoh dasar. Penanganan autentikasi, unggah berkas, CSRF, dan format respons perlu disesuaikan dengan konfigurasi backend.

### Kelompok Endpoint

Nama endpoint berikut bersifat konseptual. Gunakan URL, HTTP method, nama parameter, dan format respons yang benar-benar didefinisikan pada `routes/api.php` dan controller Laravel.

| Modul         | Fungsi                                                        |
|---------------|---------------------------------------------------------------|
| Auth          | Registrasi, OTP, login, logout, dan reset password            |
| Jurusan       | Mengambil daftar jurusan dan operasi CRUD administratif       |
| Biodata       | Mengambil dan memperbarui biodata siswa                       |
| Berkas        | Mengunggah dokumen dan mengambil status berkas                |
| Pendaftaran   | Mengambil data pendaftaran dan memperbarui pilihan jurusan    |
| Seleksi       | Mengambil rekapitulasi dan status hasil seleksi               |

### Penanganan Token

Jika backend menggunakan Bearer Token Laravel Sanctum, frontend mengirim token melalui header:

```http
Authorization: Bearer <token>
Accept: application/json
```

Token harus dikelola dengan hati-hati. Jangan mencetak token ke console atau memasukkannya ke URL.

Jika backend menggunakan autentikasi berbasis cookie HttpOnly, browser tidak dapat membaca cookie tersebut melalui JavaScript. Konfigurasi Fetch API dapat menggunakan:

```javascript
fetch(`${API_BASE_URL}/endpoint`, {
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
});
```

Penggunaan cookie memerlukan konfigurasi CORS, cookie, domain, dan mekanisme CSRF yang benar pada backend Laravel. Pilih pola autentikasi sesuai konfigurasi backend; jangan mengasumsikan Bearer Token dan autentikasi cookie dapat digunakan secara identik tanpa penyesuaian.

## Konfigurasi Lingkungan

Buat file `.env` pada direktori utama frontend.

Contoh konfigurasi:

```env

```

Jika diperlukan, tambahkan variabel frontend lain yang tidak bersifat rahasia.

**Catatan keamanan:**

- Jangan memasukkan `APP_KEY` Laravel ke frontend.
- Jangan memasukkan password database PostgreSQL ke frontend.
- Jangan mengekspos Supabase Service Role Key.
- Jangan menyimpan SMTP key Brevo di variabel `VITE_*`.
- Semua variabel berawalan `VITE_` dapat dimasukkan ke bundle frontend dan terlihat oleh pengguna.
- Jangan mengunggah file `.env` yang berisi konfigurasi lokal atau kredensial.
- Pastikan `.env` tercantum dalam `.gitignore`.
- Gunakan HTTPS untuk komunikasi pada lingkungan produksi.

Setelah mengubah variabel `.env`, mulai ulang development server Vite agar perubahan konfigurasi terbaca.

## Instalasi dan Menjalankan Frontend

### Persyaratan

- Node.js versi yang kompatibel dengan Vite pada proyek.
- npm atau package manager yang digunakan proyek.
- Repository frontend SPMB.
- Backend Laravel yang dapat diakses.
- Konfigurasi URL API yang benar.

### Langkah Instalasi

Clone repository frontend:

```bash
git clone <URL_REPOSITORY_FRONTEND>
cd spmb-frontend
```

Pasang dependensi:

```bash
npm install
```

Jalankan frontend:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan oleh Vite di terminal. Alamat default biasanya `http://localhost:5173`, tetapi port dapat berbeda jika port tersebut sedang digunakan.

### Menjalankan Backend

Buka terminal terpisah pada direktori proyek Laravel:

```bash
composer install
php artisan serve
```

Pastikan konfigurasi `.env` Laravel, koneksi PostgreSQL, autentikasi, dan layanan penyimpanan telah disiapkan.

### Build untuk Produksi

Jalankan perintah berikut untuk membuat build frontend:

```bash
npm run build
```

Untuk menguji hasil build secara lokal:

```bash
npm run preview
```

Build umumnya disimpan pada direktori `dist/`. Deploy direktori tersebut ke hosting statis atau server web yang mendukung aplikasi frontend Vite.

Perintah di atas mengasumsikan script `dev`, `build`, dan `preview` telah tersedia di `package.json`. Periksa konfigurasi proyek apabila nama script berbeda.

## Panduan Pengujian

Pengujian frontend perlu memastikan interaksi pengguna dan integrasi API berjalan sesuai harapan.

### 1. Pengujian Autentikasi

- Buka halaman registrasi.
- Kirim data registrasi yang valid dan tidak valid.
- Periksa penanganan respons registrasi.
- Verifikasi OTP menggunakan kode yang diterima melalui email.
- Login menggunakan metode identifikasi yang didukung backend.
- Uji kredensial yang salah.
- Uji proses lupa password dan reset password.
- Uji logout dan akses kembali ke halaman privat.

### 2. Pengujian Role

- Login sebagai siswa dan periksa dashboard siswa.
- Login sebagai panitia dan periksa halaman pengelolaan pendaftar.
- Login sebagai admin dan periksa halaman administrasi.
- Coba membuka URL dashboard role lain secara langsung.
- Pastikan backend menolak permintaan yang tidak memiliki izin, meskipun URL frontend dapat dibuka secara manual.

### 3. Pengujian Biodata dan Berkas

- Perbarui biodata siswa.
- Pastikan data yang diperbarui muncul kembali setelah halaman dimuat ulang.
- Unggah dokumen dengan format dan ukuran yang diizinkan.
- Uji berkas yang tidak sesuai ketentuan.
- Pastikan frontend menampilkan respons kegagalan unggah.
- Verifikasi penyimpanan dokumen pada Supabase Storage melalui backend.

### 4. Pengujian Pendaftaran dan Seleksi

- Periksa daftar jurusan yang tersedia.
- Simpan pilihan jurusan.
- Pastikan perubahan ditampilkan setelah backend mengonfirmasi keberhasilan.
- Periksa status pendaftaran.
- Uji halaman rekapitulasi panitia.
- Uji tampilan hasil seleksi siswa setelah status tersedia.

### 5. Pengujian Tampilan

- Uji halaman pada desktop, tablet, dan perangkat seluler.
- Pastikan formulir mudah digunakan.
- Pastikan indikator loading tampil saat permintaan API berlangsung.
- Pastikan notifikasi keberhasilan dan kegagalan mudah dipahami.
- Pastikan tabel dan dashboard tetap dapat digunakan pada layar kecil.

### Kriteria Keberhasilan

Pengujian dapat dianggap berhasil apabila:

- Navigasi dan halaman bekerja sesuai rancangan.
- Respons API ditampilkan dengan benar.
- Formulir memvalidasi input dan menangani kesalahan.
- Data yang disimpan dapat dimuat kembali dari backend.
- Pengguna tidak dapat melakukan operasi backend di luar hak aksesnya.
- Dokumen diunggah dan dikelola sesuai ketentuan.
- Build produksi berhasil dijalankan tanpa error.

## Keamanan Frontend

Keamanan aplikasi tidak cukup hanya mengandalkan komponen React atau proteksi halaman.

Prinsip yang perlu diterapkan:

1. **Autentikasi terpusat di backend.** Status login dan identitas pengguna harus divalidasi oleh Laravel.
2. **Otorisasi berbasis role.** Route guard frontend membantu navigasi, tetapi setiap endpoint privat tetap wajib dilindungi middleware backend.
3. **Perlindungan token.** Hindari menyimpan token sensitif pada penyimpanan yang mudah diakses JavaScript apabila tersedia pilihan autentikasi yang lebih aman.
4. **Validasi input.** Gunakan validasi frontend untuk kenyamanan pengguna dan validasi backend untuk keamanan data.
5. **Validasi dokumen.** Periksa format dan ukuran berkas di frontend, lalu lakukan validasi ulang di backend.
6. **Konfigurasi CORS.** Izinkan hanya origin frontend yang diperlukan pada lingkungan produksi.
7. **Penanganan error.** Jangan menampilkan stack trace, kredensial, atau detail internal server kepada pengguna.
8. **HTTPS.** Gunakan koneksi HTTPS pada lingkungan produksi.

## Penanganan Error

Frontend perlu menangani berbagai kondisi kegagalan secara konsisten.

| Kondisi | Penanganan Antarmuka |
|---|---|
| `400` | Tampilkan informasi permintaan yang tidak sesuai |
| `401` | Minta pengguna login kembali atau perbarui status autentikasi |
| `403` | Tampilkan pesan akses ditolak |
| `404` | Tampilkan informasi data atau halaman tidak ditemukan |
| `422` | Tampilkan kesalahan validasi pada formulir |
| `429` | Tampilkan informasi batas percobaan atau permintaan |
| `500` | Tampilkan pesan kesalahan server yang umum |
| Gangguan jaringan | Tampilkan pesan koneksi dan opsi mencoba kembali |

Tabel tersebut merupakan panduan umum. Penanganan aktual harus disesuaikan dengan status HTTP dan format respons yang digunakan backend.

## Rencana Pengembangan Selanjutnya

Pengembangan frontend dapat dilanjutkan melalui beberapa tahap:

1. Mengintegrasikan seluruh halaman React dengan endpoint Laravel yang tersedia.
2. Menyelesaikan dashboard siswa, panitia, dan admin.
3. Menyelaraskan struktur respons API dengan service frontend.
4. Menyelesaikan alur registrasi, verifikasi OTP, login, dan reset password.
5. Menyelesaikan formulir biodata dan unggah dokumen.
6. Mengintegrasikan pemilihan jurusan dan pemantauan hasil seleksi.
7. Menambahkan loading state, notifikasi, dan penanganan error yang konsisten.
8. Melakukan pengujian fungsional dan pengujian responsif.
9. Mengoptimalkan build dan menyiapkan deployment produksi.
10. Memperbarui dokumentasi berdasarkan implementasi aktual.

## Status Dokumentasi

Dokumen ini merupakan dokumentasi frontend SPMB berbasis React, Vite, dan Tailwind CSS yang dirancang untuk terintegrasi dengan backend Laravel.

Daftar fitur dan struktur folder pada dokumen ini berfungsi sebagai acuan pengembangan. Status selesai atau belum selesai harus diverifikasi melalui kode aktual, konfigurasi, dan hasil pengujian aplikasi.

Dokumentasi akan diperbarui seiring bertambahnya fitur dan penyelesaian integrasi frontend dengan backend.

---

**SPMB — Sistem Penerimaan Murid Baru**

Frontend: React + Vite + Tailwind CSS  
Backend: Laravel REST API  
Database: PostgreSQL (Supabase)  
Penyimpanan Berkas: Supabase Storage
