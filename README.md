
# Laundry API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Laundry API adalah sebuah aplikasi berbasis RESTful API yang digunakan untuk mengelola operasional laundry. Aplikasi ini memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada entitas pelanggan dan pesanan, serta menyediakan autentikasi menggunakan JSON Web Tokens (JWT) untuk melindungi akses ke API.

## Teknologi yang Digunakan

- Node.js
- Express.js
- Sequelize (ORM untuk koneksi dan manipulasi database)
- MySQL (Database)
- JSON Web Tokens (JWT) untuk autentikasi
- Winston (Logger untuk mencatat aktivitas aplikasi)
- Postman (Dokumentasi API)
- Swagger (Dokumentasi API)

## Deskripsi

Aplikasi Laundry API menyediakan API (Application Programming Interface) untuk mengelola entitas pelanggan (customers) dan pesanan (orders) pada bisnis laundry. API ini dapat digunakan oleh aplikasi frontend, aplikasi mobile, atau klien lain yang membutuhkan akses ke data laundry.

Aplikasi ini dibangun dengan menggunakan framework Express.js dan Sequelize untuk menghubungkan dan memanipulasi data pada database MySQL. Autentikasi dilakukan menggunakan JSON Web Tokens (JWT), sehingga setiap permintaan API harus menyertakan token yang valid untuk mendapatkan akses.

Selain itu, aplikasi ini telah dilengkapi dengan fitur logger menggunakan Winston. Logger ini berguna untuk mencatat aktivitas dan informasi penting dalam aplikasi, sehingga memudahkan pemantauan dan pemecahan masalah.

## Fitur

- API untuk CRUD (Create, Read, Update, Delete) pada entitas pelanggan (customers) dan pesanan (orders).
- Autentikasi menggunakan JSON Web Tokens (JWT).
- Setiap permintaan API harus menyertakan token untuk akses.
- API untuk login dan sign up pengguna.
- Fitur logger dengan Winston untuk mencatat aktivitas aplikasi.
## Instalasi dan Penggunaan

1. Clone repositori ini:

```bash
  git clone https://github.com/hikio-17/LAUNDRY-API.git
```

2. Pindah ke direktori proyek:

```bash
  cd LAUNDRY-API
```

3. Install dependensi:

```bash
  npm install
```

4. Start the server

```bash
  npm run start
```

5. Jalankan Migrasi untuk membuat skema table dalam database:

```bash
  npx sequelize-cli db:migrate
```

6. Jlankan Server:

```bash
  npm run start
```

Secara default server akan berjalan pada `http://localhost:5000`

## Dokumentasi API

- Dokumentasi API dapat ditemukan di [Postman](https://documenter.getpostman.com/view/20149138/2s93sZ8EjA) atau **Swagger** di `https://localhost:5000/api-docs`.


## Lisensi

Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).


## Penulis
Fajri Muhammad Tio - [@hikio-17](https://github.com/hikio-17)
