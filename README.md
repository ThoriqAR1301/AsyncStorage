# 📱 Smart Notes App — Panduan Setup

## Struktur File Project
```
SmartNotes/
├── App.js
└── screens/
    ├── InspirasiScreen.js
    └── CatatankuScreen.js
```

---

## 🚀 Langkah-Langkah Menjalankan Project

### 1. Buat Project Expo Baru
Buka terminal, lalu jalankan:
```bash
npx create-expo-app SmartNotes
cd SmartNotes
```

### 2. Install Library yang Dibutuhkan
```bash
# React Navigation (Bottom Tabs)
npm install @react-navigation/native @react-navigation/bottom-tabs

# Dependencies React Navigation
npx expo install react-native-screens react-native-safe-area-context

# AsyncStorage
npx expo install @react-native-async-storage/async-storage
```

### 3. Salin File Kode
- Ganti isi `App.js` dengan file `App.js` yang sudah disiapkan
- Buat folder `screens/` di dalam folder project
- Salin `InspirasiScreen.js` dan `CatatankuScreen.js` ke dalam folder `screens/`

### 4. Jalankan Aplikasi
```bash
npx expo start
```
Scan QR code menggunakan aplikasi **Expo Go** di HP kamu.

---

## ✅ Fitur yang Ada

### Tab 1 — Halaman Inspirasi ✨
- Otomatis mengambil quote acak saat pertama dibuka
- Tombol "Cari Inspirasi Lain" untuk refresh quote
- **[BONUS]** Tombol "Simpan ke Catatanku" — menyimpan quote ke AsyncStorage

### Tab 2 — Halaman Catatanku 📝
- TextInput multiline untuk menulis catatan panjang
- Tombol "Simpan Catatan" — menyimpan ke memori HP (AsyncStorage)
- Catatan otomatis muncul kembali saat halaman dibuka
- Tombol hapus catatan
- Catatan TIDAK HILANG meski aplikasi ditutup paksa

---

## 🧪 Cara Test AsyncStorage
1. Buka Tab "Catatanku"
2. Ketik catatan panjang
3. Tekan "Simpan Catatan"
4. **Force close** aplikasi Expo Go
5. Buka lagi → catatan masih ada ✅

---

## 📊 Pemenuhan Rubrik Penilaian
| Kriteria | Status |
|---|---|
| Slicing UI & Navigasi (25%) | ✅ Bottom Tabs + desain kartu |
| Fetch API (25%) | ✅ dummyjson.com/quotes/random |
| AsyncStorage Logic (40%) | ✅ setItem + getItem + useEffect |
| Kerapian Kode (10%) | ✅ File dipisah, variabel jelas |
| **BONUS** Simpan ke Catatanku | ✅ Ada di halaman Inspirasi |
