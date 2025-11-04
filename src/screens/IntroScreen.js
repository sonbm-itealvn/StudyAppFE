import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const FEATURE_ITEMS = [
  {
    id: 'learn-anywhere',
    icon: 'book-outline',
    title: 'Học mọi lúc mọi nơi',
    subtitle: 'Truy cập bài học mọi lúc mọi nơi',
    colors: ['#f2f8ff', '#ffffff'],
    iconColor: '#2368ff',
  },
  {
    id: 'track-progress',
    icon: 'podium-outline',
    title: 'Theo dõi tiến độ',
    subtitle: 'Nắm bắt quá trình học tập của bạn',
    colors: ['#ecfff5', '#ffffff'],
    iconColor: '#0aa05a',
  },
  {
    id: 'achievements',
    icon: 'ribbon-outline',
    title: 'Thành tích & Huy hiệu',
    subtitle: 'Nhận thưởng khi hoàn thành mục tiêu',
    colors: ['#fff8ed', '#ffffff'],
    iconColor: '#f1912b',
  },
];

const FeatureCard = ({ colors, icon, iconColor, title, subtitle }) => (
  <LinearGradient colors={colors} style={styles.featureCard}>
    <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
      <Ionicons name={icon} size={22} color={iconColor} />
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  </LinearGradient>
);

const IntroScreen = ({ navigation }) => {
  const renderItem = ({ item }) => <FeatureCard {...item} />;

  return (
    <LinearGradient colors={['#4c7dff', '#9f3dff', '#f733a4']} style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Ionicons name="school-outline" size={44} color="#ffffff" />
        </View>
        <Text style={styles.appName}>StudyApp</Text>
        <Text style={styles.tagline}>Nền tảng học tập thông minh cho học sinh</Text>
      </View>

      <FlatList
        data={FEATURE_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.featureList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient colors={['#6a8bff', '#a550ff']} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Bắt đầu ngay</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.footerNote}>Miễn phí • An toàn • Hiệu quả</Text>
      </View>
    </LinearGradient>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 72,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoWrapper: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#ffffff30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#f2f5ff',
    textAlign: 'center',
  },
  featureList: {
    gap: 18,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f1f3d',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#606070',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  footerNote: {
    marginTop: 16,
    color: '#ffe9ff',
    fontSize: 14,
  },
});
