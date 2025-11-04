import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => (
  <View style={styles.container}>
    <StatusBar style="dark" />
    <View style={styles.header}>
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={46} color="#2368ff" />
      </View>
      <Text style={styles.name}>Nguyễn Văn A</Text>
      <Text style={styles.email}>an.nguyen@example.com</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tùy chọn nhanh</Text>
      <TouchableOpacity style={styles.optionItem} activeOpacity={0.75}>
        <Ionicons name="bookmark-outline" size={22} color="#1b2538" />
        <Text style={styles.optionText}>Bài học đã lưu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionItem} activeOpacity={0.75}>
        <Ionicons name="notifications-outline" size={22} color="#1b2538" />
        <Text style={styles.optionText}>Thông báo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionItem} activeOpacity={0.75}>
        <Ionicons name="settings-outline" size={22} color="#1b2538" />
        <Text style={styles.optionText}>Cài đặt</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
      <Text style={styles.logoutText}>Đăng xuất</Text>
    </TouchableOpacity>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 32,
    backgroundColor: '#2368ff15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1b2538',
  },
  email: {
    fontSize: 14,
    color: '#5b667c',
    marginTop: 6,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#1a2642',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b2538',
    marginBottom: 14,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#1b2538',
  },
  logoutButton: {
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#1a2642',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    marginBottom: 40,
  },
  logoutText: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: '700',
  },
});
