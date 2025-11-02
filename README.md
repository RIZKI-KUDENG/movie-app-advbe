# Movie App - Advanced Backend

Backend REST API yang lebih canggih untuk aplikasi film, dibangun menggunakan Node.js, Express, dan Sequelize dengan ES Modules. Fitur ini mencakup autentikasi JWT, verifikasi email, dan upload file.

## Fitur

* **Autentikasi JWT**: Menggunakan JSON Web Tokens (JWT) untuk login dan mengamankan rute API.
* **Verifikasi Email**: Pengguna baru harus memverifikasi email mereka melalui tautan yang dikirim secara otomatis sebelum dapat login.
* **Pengiriman Email**: Menggunakan `Nodemailer` untuk mengirim email verifikasi ke pengguna baru.
* **Password Hashing**: Password disimpan secara aman di database menggunakan `bcrypt`.
* **Upload File**: Endpoint khusus (`/upload`) menggunakan `Multer` untuk menangani upload gambar, memfilter tipe file, dan membatasi ukuran file.
* **Manajemen Film**: Menambah dan melihat daftar film. Rute-rute ini dilindungi oleh autentikasi JWT.
* **Filtering & Pencarian Lanjutan**: Endpoint `GET /movies` mendukung paginasi (`page`), sorting (`sortBy`), pencarian berdasarkan judul (`search`), dan filtering berdasarkan `genre` serta `kategori`.
* **ES Modules**: Proyek ini menggunakan sintaks `import`/`export` ES Modules modern.

## Teknologi yang Digunakan

* **Node.js**
* **Express.js**
* **Sequelize** (ORM)
* **MySQL2** (Driver Database)
* **JSON Web Token (jsonwebtoken)**: Untuk otorisasi
* **Bcrypt**: Untuk hashing password
* **Nodemailer**: Untuk pengiriman email
* **Multer**: Untuk menangani upload file
* **UUID**: Untuk menghasilkan token unik
* **Dotenv**: Untuk mengelola variabel lingkungan

## Prasyarat dan Instalasi

### Prasyarat

* Node.js (v14 atau lebih baru)
* Server Database MySQL yang sedang berjalan
* Akun Gmail (atau layanan SMTP lain) untuk pengiriman email.
    * *Catatan: Jika menggunakan Gmail, Anda perlu membuat "App Password" dari pengaturan akun Google Anda.*

### Langkah Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/rizki-kudeng/movie-app-advbe.git](https://github.com/rizki-kudeng/movie-app-advbe.git)
    cd movie-app-advbe
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Buat file `.env`:**
    Buat file bernama `.env` di root proyek dan isi dengan variabel berikut:
    ```env
    # Konfigurasi Database
    DB_NAME=nama_database_anda
    DB_USER=user_db_anda
    DB_PASSWORD=password_db_anda
    DB_HOST=localhost
    DB_PORT=3306
    DB_DIALECT=mysql

    # Kunci Rahasia JWT
    JWT_SECRET=kunci_rahasia_jwt_anda_yang_kuat

    # Konfigurasi Nodemailer (Gmail)
    EMAIL_USER=email_gmail_anda@gmail.com
    EMAIL_PASS=password_aplikasi_gmail_anda 
    ```

4.  **Siapkan Database:**
    * Pastikan server MySQL Anda berjalan.
    * Buat database di MySQL (misalnya `movie_app_advbe`) yang sesuai dengan `DB_NAME` di file `.env` Anda.
    * **Penting:** Proyek ini menggunakan `sequelize.sync()`. Tabel (`users`, `movies`) akan dibuat secara otomatis saat server dijalankan. Anda tidak perlu menjalankan migrasi.

5.  **Jalankan Server:**
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:3000`.

## Susunan Proyek

## Contoh Penggunaan (Alur API)

### 1. Registrasi Pengguna Baru

* **Method:** `POST`
* **URL:** `http://localhost:3000/auth/register`
* **Body (JSON):**
    ```json
    {
      "fullName": "User Baru",
      "username": "userbaru",
      "email": "user.baru@example.com",
      "password": "password123"
    }
    ```
* **Respon:** Server akan mengirim email verifikasi ke `user.baru@example.com`.

### 2. Verifikasi Email

* Buka email Anda, temukan tautan verifikasi.
* **Method:** `GET`
* **URL:** `http://localhost:3000/auth/verify-email?token=...` (token unik dari email)
* **Respon:** Akun diaktifkan (`isVerified` menjadi `true`).

### 3. Login

* **Method:** `POST`
* **URL:** `http://localhost:3000/auth/login`
* **Body (JSON):**
    ```json
    {
      "email": "user.baru@example.com",
      "password": "password123"
    }
    ```
* **Respon:** Anda akan mendapatkan JWT token jika sukses.
    ```json
    {
      "message": "login success",
      "token": "eyJh... (token JWT Anda)"
    }
    ```

### 4. Upload Gambar (Membutuhkan Token)

* **Method:** `POST`
* **URL:** `http://localhost:3000/upload`
* **Header:**
    * `Authorization`: `Bearer eyJh... (token JWT Anda)`
* **Body (Form-Data):**
    * `key`: `file`
    * `value`: (Pilih file gambar Anda)
* **Respon:**
    ```json
    {
      "message": "File uploaded successfully",
      "file": {
        "filename": "namafileunik.png",
        ...
      }
    }
    ```

### 5. Menambah Film Baru (Membutuhkan Token)

* **Method:** `POST`
* **URL:** `http://localhost:3000/movies`
* **Header:**
    * `Authorization`: `Bearer eyJh... (token JWT Anda)`
* **Body (JSON):** (Gunakan `filename` dari langkah 4 untuk `image`)
    ```json
    {
      "title": "Spider-Man: Across the Spider-Verse",
      "deskripsi": "Miles Morales kembali...",
      "genre": "Animation, Action",
      "kategori": "Movie",
      "image": "namafileunik.png",
      "rating": 9.5
    }
    ```

### 6. Mendapatkan Daftar Film (Filtering)

* **Method:** `GET`
* **URL:** `http://localhost:3000/movies?kategori=Movie&search=Spider&sortBy=rating`
* **Header:**
    * `Authorization`: `Bearer eyJh... (token JWT Anda)`
* **Respon:** Daftar film yang telah difilter.

## Kontribusi

Kontribusi selalu diterima! Jika Anda memiliki saran untuk perbaikan, silakan fork repositori ini dan buat *pull request*, atau buka *issue* dengan tag "enhancement".

1.  Fork Proyek
2.  Buat Branch Fitur Anda (`git checkout -b fitur/FiturLuarBiasa`)
3.  Commit Perubahan Anda (`git commit -m 'Menambahkan FiturLuarBiasa'`)
4.  Push ke Branch (`git push origin fitur/FiturLuarBiasa`)
5.  Buka *Pull Request*

## Lisensi

Didistribusikan di bawah Lisensi MIT.

---

**MIT License**

Copyright (c) 2025 [Nama Pemilik Proyek/GitHub Username]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.