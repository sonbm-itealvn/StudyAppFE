import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const ProgressScreen = () => (
  <View style={styles.container}>
    <StatusBar style="dark" />
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name="stats-chart-outline" size={36} color="#2368ff" />
      </View>
      <Text style={styles.title}>Bảng tiến độ đang được chuẩn bị</Text>
      <Text style={styles.subtitle}>
        Bạn sẽ xem được thống kê bài học, thời gian học và chuỗi hoàn thành tại đây.
      </Text>
    </View>
  </View>
);

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#1d2a44',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#2368ff15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#18263f',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#56627a',
    textAlign: 'center',
    lineHeight: 20,
  },
});
