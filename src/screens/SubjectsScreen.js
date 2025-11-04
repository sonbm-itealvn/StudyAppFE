import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SUBJECTS from '../data/subjects';

const SubjectsScreen = ({ navigation }) => {
  const aggregatedSubjects = useMemo(
    () =>
      SUBJECTS.map((subject) => {
        const totalLessons = subject.chapters.reduce((acc, chapter) => acc + chapter.total, 0);
        const completedLessons = subject.chapters.reduce((acc, chapter) => acc + chapter.completed, 0);

        return {
          ...subject,
          progressPercent: Math.round(subject.progress * 100),
          progressText: `${completedLessons}/${totalLessons} bài học hoàn thành`,
        };
      }),
    [],
  );

  const handleOpenSubject = (subjectId) => {
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.navigate('SubjectDetail', { subjectId });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backStub}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="chevron-back" size={20} color="#1b2538" />
            <Text style={styles.headerTitle}>Môn học</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.gradeSelector}>
            <Text style={styles.gradeSelectorText}>Lớp 10</Text>
            <Ionicons name="chevron-down" size={16} color="#1b2538" />
          </TouchableOpacity>
        </View>

        <LinearGradient colors={['#f2f4ff', '#f9f5ff']} style={styles.summaryCard}>
          <Text style={styles.summaryHeadline}>Lớp 10</Text>
          <Text style={styles.summarySub}>
            {aggregatedSubjects.length} môn học • Năm học 2024-2025
          </Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Các môn học</Text>

        <View>
          {aggregatedSubjects.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={[styles.subjectCard, index !== aggregatedSubjects.length - 1 && styles.cardSpacing]}
              onPress={() => handleOpenSubject(item.id)}
            >
              <View style={[styles.subjectIcon, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.subjectContent}>
                <Text style={styles.subjectName}>{item.name}</Text>
                <Text style={styles.subjectProgressText}>{item.progressText}</Text>
                <View style={styles.subjectProgressBar}>
                  <View style={[styles.subjectProgressFill, { width: `${item.progressPercent}%` }]} />
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#1f2d3d" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SubjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backStub: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1b2538',
    marginLeft: 8,
  },
  gradeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    shadowColor: '#13203a',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  gradeSelectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b2538',
    marginRight: 6,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  summaryHeadline: {
    fontSize: 18,
    fontWeight: '700',
    color: '#233163',
    marginBottom: 6,
  },
  summarySub: {
    fontSize: 14,
    color: '#44527a',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b2538',
    marginBottom: 16,
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#1a2642',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  cardSpacing: {
    marginBottom: 14,
  },
  subjectIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  subjectContent: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2740',
    marginBottom: 6,
  },
  subjectProgressText: {
    fontSize: 13,
    color: '#525f75',
    marginBottom: 10,
  },
  subjectProgressBar: {
    height: 6,
    backgroundColor: '#e4e7ef',
    borderRadius: 6,
    overflow: 'hidden',
  },
  subjectProgressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#121a2f',
  },
});
