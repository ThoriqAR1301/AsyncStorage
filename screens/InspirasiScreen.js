import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InspirasiScreen() {
  const [quote, setQuote] = useState(null);       
  const [loading, setLoading] = useState(false);  

  const ambilQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      Alert.alert('Gagal', 'Tidak Bisa Mengambil Quote. Periksa Koneksi Internet Kamu');
    } finally {
      setLoading(false);
    }
  };

  const simpanKeCatatan = async () => {
    if (!quote) return;

    try {
      const dataTersimpan = await AsyncStorage.getItem('draft_catatan');
      const catatanLama = dataTersimpan ? dataTersimpan : '';

      const teksQuote = `"${quote.quote}"\n— ${quote.author}`;
      const catatanBaru = catatanLama
        ? `${catatanLama}\n\n${teksQuote}`
        : teksQuote;

      await AsyncStorage.setItem('draft_catatan', catatanBaru);
      Alert.alert('Berhasil! 🎉', 'Quote Berhasil Disimpan Ke Catatanku!');
    } catch (error) {
      Alert.alert('Gagal', 'Tidak Bisa Menyimpan Quote.');
    }
  };

  useEffect(() => {
    ambilQuote();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0E17" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>✨ Inspirasi Hari Ini</Text>
        <Text style={styles.headerSubtitle}>Temukan Kata-Kata Yang Menyemangatimu</Text>
      </View>

      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.cornerDecorTL} />
          <View style={styles.cornerDecorBR} />

          <Text style={styles.quoteIcon}>"</Text>

          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#E94560" />
              <Text style={styles.loadingText}>Mencari Inspirasi...</Text>
            </View>
          ) : quote ? (
            <>
              <Text style={styles.quoteText}>{quote.quote}</Text>
              <View style={styles.divider} />
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
            </>
          ) : (
            <Text style={styles.quoteText}>Tekan Tombol Di Bawah Untuk Mulai!</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={ambilQuote}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.btnTextPrimary}>
            {loading ? 'Memuat...' : '🔄  Cari Inspirasi Lain'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary, (!quote || loading) && styles.btnDisabled]}
          onPress={simpanKeCatatan}
          disabled={!quote || loading}
          activeOpacity={0.8}
        >
          <Text style={styles.btnTextSecondary}>📝  Simpan ke Catatanku</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0E17',
  },
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

  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(233,69,96,0.3)',
    elevation: 12,
    shadowColor: '#E94560',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    overflow: 'hidden',
  },
  cornerDecorTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    borderTopLeftRadius: 24,
    backgroundColor: 'rgba(233,69,96,0.12)',
  },
  cornerDecorBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderBottomRightRadius: 24,
    backgroundColor: 'rgba(233,69,96,0.08)',
  },
  quoteIcon: {
    fontSize: 64,
    color: '#E94560',
    lineHeight: 60,
    marginBottom: 8,
    fontWeight: '900',
    opacity: 0.7,
  },
  loadingBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  loadingText: {
    color: '#A7A9BE',
    marginTop: 12,
    fontSize: 14,
  },
  quoteText: {
    fontSize: 17,
    color: '#FFFFFE',
    lineHeight: 28,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(233,69,96,0.3)',
    marginVertical: 20,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#E94560',
    fontWeight: '700',
    textAlign: 'right',
    letterSpacing: 0.5,
  },

  buttonGroup: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  btn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#E94560',
    elevation: 8,
    shadowColor: '#E94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E94560',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnTextPrimary: {
    color: '#FFFFFE',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  btnTextSecondary: {
    color: '#E94560',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});