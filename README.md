# WD GROUP WEDDING INVITATION MANAGEMENT

Platform manajemen undangan pernikahan digital milik WD Group, dibangun menggunakan React, Vite, TypeScript, Tailwind CSS, dan Supabase.

## 1. Project Overview
Aplikasi ini memiliki 3 fungsi utama:
- **Public Website:** Home, katalog tema undangan, fitur.
- **Admin Management:** Manajemen klien, tema, undangan (multi-step builder), tamu, RSVP, komentar, pengaturan, dll.
- **Public Wedding Invitation:** Halaman undangan publik yang dapat diakses tamu berdasarkan slug (contoh: `/invitation/rizky-aulia?to=Nama+Tamu`).

## 2. Requirements
- Node.js (v18+)
- NPM / Yarn
- Project Supabase (untuk Database, Auth, dan Storage)

## 3. Installation
```bash
npm install
```

## 4. Environment Setup
Buat file `.env` berdasarkan `.env.example`:
```env
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```
*(Jangan pernah memasukkan Service Role Key ke frontend).*

## 5. Supabase Setup
- Buat proyek baru di [Supabase](https://supabase.com).
- Dapatkan URL dan Anon Key dari menu Settings > API.

## 6. Database Migration & RLS Setup
- Buka **SQL Editor** di Supabase Dashboard.
- Copy dan jalankan seluruh query dari file `supabase/migrations/00000_init.sql`.
- Migration ini sudah termasuk pembuatan tabel, indeks, trigger, fungsi keamanan, dan kebijakan Row Level Security (RLS).

## 7. Storage Setup
Secara manual di Supabase Storage, buat bucket public berikut:
- `website-assets`
- `invitation-assets`
- `theme-assets`
- `gallery`

## 8. Create Admin
Otentikasi admin dikendalikan oleh Supabase Auth dan tabel `profiles`.
1. Masuk ke menu **Authentication > Users** di Supabase.
2. Buat akun baru (contoh: `admin@wdgroup.com`).
3. Masuk ke **Table Editor > profiles**, temukan baris user yang baru saja dibuat.
4. Set kolom `role` menjadi `admin`.

## 9. Development
Jalankan development server lokal:
```bash
npm run dev
```

## 10. Build Production
Untuk mem-build proyek secara optimal:
```bash
npm run build
```

## 11. Deployment
Aplikasi ini dapat di-deploy pada layanan statis / SPA seperti Vercel, Netlify, atau Cloudflare Pages.
Pastikan pengaturan *rewrite rule* atau *SPA fallback* diatur agar semua rute mengarah ke `index.html`.

## 12. Troubleshooting
- **Error Login:** Pastikan Anda mengeset `role = 'admin'` di tabel `profiles`.
- **Tidak bisa Upload Gambar:** Cek kebijakan Storage di Supabase; pastikan bucket memiliki akses *public read* dan admin memiliki izin insert.
- **Data Kosong di Dashboard:** Pastikan *Row Level Security* (RLS) policies sudah diterapkan sehingga tabel memiliki hak baca bagi role `admin`.
