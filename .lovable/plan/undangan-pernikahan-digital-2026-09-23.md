# Undangan Pernikahan Digital

Satu halaman undangan yang dibuka seperti contoh: layar sampul dulu, lalu tamu menekan "Buka Undangan" dan masuk ke isi undangan dengan musik latar mulai berputar.

## Alur halaman

```text
Sampul (nama mempelai, tanggal, "Kepada: <nama tamu dari tautan>")
   -> tombol Buka Undangan
Mempelai (foto + nama lengkap, orang tua)
Hitung mundur + tombol simpan tanggal
Acara (akad & resepsi: waktu, tempat, tombol peta)
Our Story: 1. Pertemuan Pertama  2. Lamaran  3. Pernikahan
Galeri foto
Amplop digital & kado (nomor rekening, salin, alamat kirim)
RSVP & ucapan (form + daftar ucapan tamu)
Penutup
```

Detail kecil: tombol musik mengambang untuk putar/hentikan, nama tamu diambil dari tautan `?kpd=...` (kalau kosong, tampil "Tamu Undangan"), animasi lembut saat tiap bagian masuk layar.

## Isi teks

Anda belum punya data acara, jadi saya isi dengan contoh (nama, tanggal, lokasi, cerita, nomor rekening) yang jelas terlihat sebagai contoh dan mudah Anda ganti nanti. Foto memakai gambar yang saya buatkan, bisa diganti dengan foto asli.

## RSVP dan ucapan

Bagian ini menyimpan data, jadi saya aktifkan Lovable Cloud: tamu mengisi nama, kehadiran (hadir / tidak hadir), jumlah orang, dan pesan; ucapan langsung tampil di daftar. Semua orang boleh menulis dan membaca ucapan, tetapi tidak bisa mengubah atau menghapus ucapan orang lain.

## Tampilan

Sebelum membangun, saya tunjukkan 3 arah desain (nuansa warna, tipografi, tata letak) agar Anda pilih satu.

## Catatan teknis

- Satu route `/` dengan seluruh bagian; state "undangan dibuka" mengontrol scroll-lock dan pemutaran audio (audio hanya dimulai setelah klik tamu).
- Nama tamu dibaca lewat `validateSearch` pada route (`kpd`, `contoh`).
- Tabel `wishes` di Cloud dengan RLS: insert & select publik, tanpa update/delete; grant untuk `anon`/`authenticated`.
- Kirim/ambil ucapan lewat server function + TanStack Query.
- Hitung mundur pakai interval sisi klien; tombol simpan tanggal membuat file .ics.
- head() khusus untuk halaman undangan (judul, deskripsi, og).
