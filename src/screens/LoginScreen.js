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

const LoginScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#3a7bff', '#7a3dff', '#ff2ea1']} style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Ionicons name="school-outline" size={44} color="#ffffff" />
        </View>
        <Text style={styles.title}>Chào mừng trở lại!</Text>
        <Text style={styles.subtitle}>Đăng nhập để tiếp tục học tập</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.inputLabel}>Email</Text>
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
            placeholder="••••••••"
            placeholderTextColor="#9aa3b1"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.submitButton}
          onPress={() => navigation.replace('MainTabs')}
        >
          <LinearGradient colors={['#2f6aff', '#1851f0']} style={styles.submitGradient}>
            <Text style={styles.submitText}>Đăng nhập</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.demoWrapper}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Ionicons name="bulb-outline" size={18} color="#2063ff" />
          <Text style={styles.demoText}>Sử dụng tài khoản demo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Chưa có tài khoản?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('Register')}
          >
            Đăng ký ngay
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 72,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
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
    color: '#f0f4ff',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#172036',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
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
    marginTop: 24,
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
  demoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
  },
  demoText: {
    fontSize: 14,
    color: '#2063ff',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 26,
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
