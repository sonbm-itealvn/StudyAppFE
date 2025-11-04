import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SUBJECTS from '../data/subjects';

const QUICK_ACTIONS = [
  {
    id: 'choose',
    title: 'Chọn môn học',
    icon: 'library-outline',
    target: { type: 'subject' },
  },
  {
    id: 'progress',
    title: 'Xem tiến độ',
    icon: 'stats-chart-outline',
    target: { type: 'progress' },
  },
];

const HomeScreen = ({ navigation }) => {
  const continueLessons = useMemo(() => {
    const lessons = SUBJECTS.flatMap((subject) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons
          .filter((lesson) => lesson.status !== 'locked')
          .map((lesson) => ({
            ...lesson,
            subjectId: subject.id,
            subjectName: subject.name,
            color: subject.color,
            icon: subject.icon,
          })),
      ),
    );

    const priority = {
      'in-progress': 0,
      completed: 1,
      default: 2,
    };

    lessons.sort(
      (a, b) => (priority[a.status] ?? priority.default) - (priority[b.status] ?? priority.default),
    );

    return lessons.slice(0, 2);
  }, []);

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
        <LinearGradient colors={['#4b7dff', '#8c3dff']} style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.greeting}>Chào buổi sáng, An!</Text>
              <Text style={styles.greetingSub}>Sẵn sàng học bài hôm nay?</Text>
            </View>
            <View style={styles.streakBadge}>
              <Ionicons name="flash-outline" size={20} color="#ffffff" />
            </View>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Bài học hôm nay</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45 phút</Text>
              <Text style={styles.statLabel}>Thời gian học</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Ngày liên tiếp</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tiếp tục học</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.sectionAction}
            onPress={() => navigation.navigate('Subjects')}
          >
            <Text style={styles.sectionActionText}>Xem tất cả</Text>
            <Ionicons name="chevron-forward" size={16} color="#1f2d3d" />
          </TouchableOpacity>
        </View>

        <View>
          {continueLessons.map((item, index) => {
            const progressPercent =
              item.status === 'completed' ? 100 : Math.round((item.progress || 0) * 100);

            return (
              <View
                key={item.id}
                style={[styles.lessonCard, index !== continueLessons.length - 1 && styles.cardSpacing]}
              >
                <View style={[styles.lessonIcon, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <View style={styles.lessonContent}>
                  <Text style={[styles.lessonSubject, { color: item.color }]}>{item.subjectName}</Text>
                  <Text style={styles.lessonTitle}>{item.title}</Text>
                  <View style={styles.progressWrapper}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                    </View>
                    <Text style={styles.progressPercent}>{progressPercent}%</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.playButton}
                  activeOpacity={0.8}
                  onPress={() => handleOpenSubject(item.subjectId)}
                >
                  <Ionicons name="play" size={20} color="#0b1020" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.quickLearningHeader}>
          <Text style={styles.sectionTitle}>Học tập nhanh</Text>
        </View>
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((item, index) => {
            const handlePress =
              item.target.type === 'subject'
                ? () => navigation.navigate('Subjects')
                : item.target.type === 'progress'
                ? () => navigation.navigate('Progress')
                : undefined;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={[styles.quickCard, index === 0 && styles.quickCardSpacing]}
                onPress={handlePress}
              >
                <Ionicons name={item.icon} size={22} color="#1f2d3d" />
                <Text style={styles.quickText}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <LinearGradient colors={['#e7fff4', '#f9fffd']} style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalBadge}>
              <Ionicons name="radio-button-on" size={18} color="#12a454" />
            </View>
            <Text style={styles.goalTitle}>Mục tiêu hôm nay</Text>
          </View>
          <Text style={styles.goalSubtitle}>Hoàn thành 3 bài học</Text>
          <View style={styles.goalProgressWrapper}>
            <View style={styles.goalProgressTrack}>
              <View style={[styles.goalProgressFill, { width: '66%' }]} />
            </View>
            <Text style={styles.goalProgressValue}>2/3</Text>
          </View>
          <Text style={styles.goalHint}>Còn 1 bài nữa để đạt mục tiêu!</Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  scrollContent: {
    paddingBottom: 90,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  heroCard: {
    borderRadius: 26,
    paddingHorizontal: 24,
    paddingVertical: 28,
    marginBottom: 28,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  greetingSub: {
    color: '#e8edff',
    fontSize: 14,
  },
  streakBadge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ffffff30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    backgroundColor: '#ffffff20',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  statLabel: {
    color: '#e6ebff',
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#ffffff30',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#142033',
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionActionText: {
    color: '#1f2d3d',
    fontWeight: '600',
    marginRight: 4,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#1a2642',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  cardSpacing: {
    marginBottom: 16,
  },
  lessonIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lessonContent: {
    flex: 1,
  },
  lessonSubject: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b263b',
    marginBottom: 12,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#e5e8f0',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#15203f',
  },
  progressPercent: {
    fontSize: 12,
    color: '#1f2d3d',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#10152410',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  quickLearningHeader: {
    marginTop: 12,
  },
  quickActions: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a2642',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  quickCardSpacing: {
    marginRight: 14,
  },
  quickText: {
    marginTop: 10,
    fontWeight: '600',
    color: '#1d2d44',
  },
  goalCard: {
    borderRadius: 22,
    padding: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalBadge: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#d8fff0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d513a',
  },
  goalSubtitle: {
    fontSize: 14,
    color: '#154a37',
    marginBottom: 16,
  },
  goalProgressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalProgressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#d4e6de',
    marginRight: 12,
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#15203f',
  },
  goalProgressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15203f',
  },
  goalHint: {
    color: '#32524a',
    fontSize: 13,
  },
});
