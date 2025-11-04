import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#7e3dff', '#b22cff', '#ff2f87']} style={styles.container}>
      <StatusBar style="light" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={20} color="#ffffff" />
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Ionicons name="school-outline" size={44} color="#ffffff" />
        </View>
        <Text style={styles.title}>Tạo tài khoản mới</Text>
        <Text style={styles.subtitle}>Bắt đầu hành trình học tập của bạn</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.inputLabel}>Họ và tên</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#5d6b80" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nguyễn Văn A"
            placeholderTextColor="#9aa3b1"
          />
        </View>

        <Text style={[styles.inputLabel, styles.inputSpacing]}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={18} color="#5d6b80" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            placeholderTextColor="#9aa3b1"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={[styles.inputLabel, styles.inputSpacing]}>Mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#5d6b80" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ít nhất 6 ký tự"
            placeholderTextColor="#9aa3b1"
            secureTextEntry
          />
        </View>

        <Text style={[styles.inputLabel, styles.inputSpacing]}>Xác nhận mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color="#5d6b80"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="#9aa3b1"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.submitButton}
          onPress={() => navigation.replace('MainTabs')}
        >
          <LinearGradient colors={['#a72eff', '#ff2e8b']} style={styles.submitGradient}>
            <Text style={styles.submitText}>Đăng ký</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Đã có tài khoản?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('Login')}
          >
            Đăng nhập
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 68,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  backText: {
    color: '#ffffff',
    fontSize: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoWrapper: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#ffffff30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#f1eaff',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#31124d',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: 10,
  },
  inputSpacing: {
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1c2843',
  },
  submitButton: {
    marginTop: 28,
  },
  submitGradient: {
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 28,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
  footerLink: {
    fontWeight: '600',
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
});
