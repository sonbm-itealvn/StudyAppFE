import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../services/authService';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (route?.params?.emailPrefill) {
      setEmail(route.params.emailPrefill);
    }
  }, [route?.params?.emailPrefill]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await login({ email: email.trim(), password });
      navigation.replace('MainTabs');
    } catch (error) {
      setErrorMessage(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#3a7bff', '#7a3dff', '#ff2ea1']} style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoider}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
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
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType="next"
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
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={handleLogin}
                  returnKeyType="done"
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.submitButton}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient colors={['#2f6aff', '#1851f0']} style={styles.submitGradient}>
                  <Text style={styles.submitText}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.demoWrapper}
                onPress={() => {
                  setEmail('demo@example.com');
                  setPassword('password');
                }}
                disabled={loading}
              >
                <Ionicons name="bulb-outline" size={18} color="#2063ff" />
                <Text style={styles.demoText}>Sử dụng tài khoản demo</Text>
              </TouchableOpacity>

              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoider: {
    flex: 1,
  },
  scrollContent: {
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
    textAlign: 'center',
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
  errorText: {
    marginTop: 16,
    fontSize: 13,
    color: '#ffebee',
    textAlign: 'center',
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
