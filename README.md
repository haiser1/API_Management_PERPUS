# API_Management_PERPUS

## Langkah-langkah Instalasi

1. Clone repo ini atau bisa juga download
2. Masuk ke folder projek
3. Buka terminal dari dalam foldernya
4. Jalankan perintah npm install untuk menginstall semua dependensi yang dibutuhkan
5. buat kunci RSA nya dengan perintah :
- ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
- openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
6. Buat database nya
7. Jika databasenya sudah dibuat maka buat table nya dengan menambahkan code di index.js di baris code ke 22 sesuaikan saja dengan nama model yang sudah ada
8. Lalu jalankan perintah :
- npm run start_dev => menggunakan nodemon
- npm start => tidak menggunakan nodemon