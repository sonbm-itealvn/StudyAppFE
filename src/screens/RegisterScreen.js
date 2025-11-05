import React, { useState } from 'react';
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
import { register as registerAccount, login as loginAccount } from '../services/authService';
import { setAccessToken } from '../services/tokenStorage';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu cần ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const registerResult = await registerAccount({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        password_confirmation: confirmPassword,
      });

      const registerToken =
        registerResult?.accessToken ||
        registerResult?.token ||
        registerResult?.access_token ||
        registerResult?.data?.accessToken ||
        registerResult?.data?.token;
      if (registerToken) {
        await setAccessToken(registerToken);
        navigation.replace('MainTabs');
        return;
      }

      try {
        const loginResult = await loginAccount({ email: email.trim(), password });
        const loginToken =
          loginResult?.accessToken ||
          loginResult?.token ||
          loginResult?.access_token ||
          loginResult?.data?.accessToken ||
          loginResult?.data?.token;
        if (loginToken) {
          await setAccessToken(loginToken);
        } else {
          await setAccessToken(null);
        }
        navigation.replace('MainTabs');
      } catch (loginError) {
        console.warn('Auto login failed', loginError);
        await setAccessToken(null);
        navigation.navigate('Login', { emailPrefill: email.trim() });
      }
    } catch (error) {
      await setAccessToken(null);
      setErrorMessage(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#7e3dff', '#b22cff', '#ff2f87']} style={styles.container}>
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
                  value={fullName}
                  onChangeText={setFullName}
                  returnKeyType="next"
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
                  placeholder="Ít nhất 6 ký tự"
                  placeholderTextColor="#9aa3b1"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="next"
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
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.submitButton}
                onPress={handleRegister}
                disabled={loading}
              >
                <LinearGradient colors={['#a72eff', '#ff2e8b']} style={styles.submitGradient}>
                  <Text style={styles.submitText}>{loading ? 'Đang đăng ký...' : 'Đăng ký'}</Text>
                </LinearGradient>
              </TouchableOpacity>

              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoider: {
    flex: 1,
  },
  scrollContent: {
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
  errorText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 13,
    color: '#ffe9ff',
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
