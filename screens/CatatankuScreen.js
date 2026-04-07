import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CatatankuScreen() {
  const [inputTeks, setInputTeks] = useState('');        
  const [catatanTersimpan, setCatatanTersimpan] = useState(''); 
  const [sudahSimpan, setSudahSimpan] = useState(false); 

  const simpanData = async () => {
    if (!inputTeks.trim()) {
      Alert.alert('Oops!', 'Catatan Tidak Boleh Kosong Ya... 😊');
      return;
    }
    try {
      await AsyncStorage.setItem('draft_catatan', inputTeks);

      // Update state tampilan
      setCatatanTersimpan(inputTeks);
      setSudahSimpan(true);

      // Reset indikator setelah 2 detik
      setTimeout(() => setSudahSimpan(false), 2000);

      Alert.alert('Tersimpan! 💾', 'Catatan kamu berhasil disimpan permanen di HP!');
    } catch (error) {
      Alert.alert('Gagal', 'Tidak bisa menyimpan catatan.');
    }
  };

  // ── AsyncStorage: Ambil catatan ────────────────────────────
  const ambilData = async () => {
    try {
      // Baca data dari AsyncStorage menggunakan kunci 'draft_catatan'
      const nilai = await AsyncStorage.getItem('draft_catatan');

      if (nilai !== null) {
        // Salin isi buku catatan ke State agar muncul di layar
        setInputTeks(nilai);
        setCatatanTersimpan(nilai);
      }
    } catch (error) {
      Alert.alert('Gagal', 'Tidak bisa membaca catatan.');
    }
  };

  // ── Hapus catatan ──────────────────────────────────────────
  const hapusData = async () => {
    Alert.alert(
      'Hapus Catatan?',
      'Catatan yang tersimpan akan dihapus permanen.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('draft_catatan');
              setInputTeks('');
              setCatatanTersimpan('');
            } catch (error) {
              Alert.alert('Gagal', 'Tidak bisa menghapus catatan.');
            }
          },
        },
      ]
    );
  };

  // ── Jalankan ambilData saat halaman pertama kali dibuka ────
  useEffect(() => {
    ambilData();
  }, []);

  // ── Tampilan (UI) ──────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0E17" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>📝 Catatanku</Text>
            <Text style={styles.headerSubtitle}>Tulis apapun, tersimpan permanen</Text>
          </View>

          {/* Area Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>✏️  Tulis Catatan</Text>
              {catatanTersimpan ? (
                <TouchableOpacity onPress={hapusData}>
                  <Text style={styles.hapusBtn}>🗑️ Hapus</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <TextInput
              style={styles.textInput}
              multiline={true}          // TextInput multiline sesuai instruksi LKPD
              value={inputTeks}
              onChangeText={(teks) => setInputTeks(teks)}
              placeholder="Mulai menulis catatanmu di sini..."
              placeholderTextColor="#555570"
              textAlignVertical="top"
            />

            {/* Jumlah karakter */}
            <Text style={styles.charCount}>{inputTeks.length} karakter</Text>
          </View>

          {/* Tombol Simpan Catatan */}
          <TouchableOpacity
            style={[styles.btnSimpan, sudahSimpan && styles.btnSimpanSukses]}
            onPress={simpanData}
            activeOpacity={0.8}
          >
            <Text style={styles.btnSimpanText}>
              {sudahSimpan ? '✅  Tersimpan!' : '💾  Simpan Catatan'}
            </Text>
          </TouchableOpacity>

          {/* Area Catatan Tersimpan */}
          {catatanTersimpan ? (
            <View style={styles.tersimpanContainer}>
              <View style={styles.tersimpanHeader}>
                <View style={styles.dotHijau} />
                <Text style={styles.tersimpanLabel}>Tersimpan di memori HP</Text>
              </View>
              <Text style={styles.tersimpanTeks}>{catatanTersimpan}</Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={styles.emptyText}>Belum ada catatan tersimpan</Text>
              <Text style={styles.emptySubText}>
                Tulis sesuatu lalu tekan "Simpan Catatan"
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0E17',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Header ──
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFE',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#A7A9BE',
    marginTop: 4,
  },

  // ── Input ──
  inputContainer: {
    marginHorizontal: 24,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(233,69,96,0.2)',
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    color: '#A7A9BE',
    fontSize: 13,
    fontWeight: '600',
  },
  hapusBtn: {
    color: '#E94560',
    fontSize: 13,
    fontWeight: '600',
  },
  textInput: {
    color: '#FFFFFE',
    fontSize: 15,
    lineHeight: 24,
    minHeight: 160,
    maxHeight: 280,
  },
  charCount: {
    color: '#555570',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 8,
  },

  // ── Tombol Simpan ──
  btnSimpan: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: '#E94560',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#E94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  btnSimpanSukses: {
    backgroundColor: '#2ECC71',
    shadowColor: '#2ECC71',
  },
  btnSimpanText: {
    color: '#FFFFFE',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Area tersimpan ──
  tersimpanContainer: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,204,113,0.3)',
  },
  tersimpanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dotHijau: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2ECC71',
    marginRight: 8,
  },
  tersimpanLabel: {
    color: '#2ECC71',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tersimpanTeks: {
    color: '#A7A9BE',
    fontSize: 14,
    lineHeight: 22,
  },

  // ── Empty state ──
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: '#A7A9BE',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubText: {
    color: '#555570',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});