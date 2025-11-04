import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SUBJECTS, { getSubjectById } from '../data/subjects';

const SubjectDetailScreen = ({ route, navigation }) => {
  const { subjectId } = route.params || {};
  const subject = useMemo(() => getSubjectById(subjectId) || SUBJECTS[0], [subjectId]);
  const [expandedChapterId, setExpandedChapterId] = useState(subject?.chapters?.[0]?.id ?? null);

  const handleToggleChapter = (chapterId) => {
    setExpandedChapterId((current) => (current === chapterId ? null : chapterId));
  };

  const getLessonStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          container: styles.lessonCompleted,
          icon: 'checkmark-circle',
          iconColor: '#27c470',
          textColor: '#163337',
        };
      case 'in-progress':
        return {
          container: styles.lessonInProgress,
          icon: 'play',
          iconColor: '#2f6aff',
          textColor: '#1b263b',
        };
      default:
        return {
          container: styles.lessonLocked,
          icon: 'lock-closed',
          iconColor: '#c5ccd9',
          textColor: '#97a0b1',
        };
    }
  };

  if (!subject) {
    return null;
  }

  const overallPercent = Math.round(subject.progress * 100);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#142033" />
          </TouchableOpacity>
          <View>
            <Text style={styles.subjectTitle}>{subject.name}</Text>
            <Text style={styles.subjectGrade}>{subject.grade}</Text>
          </View>
        </View>

        <LinearGradient colors={['#f2f4ff', '#faf5ff']} style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={[styles.subjectIcon, { backgroundColor: `${subject.color}20` }]}>
              <Ionicons name={subject.icon} size={26} color={subject.color} />
            </View>
            <View>
              <Text style={styles.summaryTitle}>{subject.name}</Text>
              <Text style={styles.summaryMeta}>{subject.totalUnitsText}</Text>
            </View>
          </View>
          <View style={styles.summaryProgress}>
            <View style={styles.summaryProgressTrack}>
              <View style={[styles.summaryProgressFill, { width: `${overallPercent}%` }]} />
            </View>
            <Text style={styles.summaryProgressValue}>{overallPercent}%</Text>
          </View>
        </LinearGradient>

        {subject.chapters.map((chapter) => {
          const chapterProgress = Math.round((chapter.completed / chapter.total) * 100);
          const isExpanded = expandedChapterId === chapter.id;

          return (
            <View
              key={chapter.id}
              style={[styles.chapterCard, isExpanded ? styles.chapterExpanded : styles.chapterCollapsed]}
            >
              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.chapterHeader}
                onPress={() => handleToggleChapter(chapter.id)}
              >
                <Ionicons
                  name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                  size={18}
                  color="#142033"
                  style={styles.chapterToggle}
                />
                <View style={styles.chapterInfo}>
                  <Text style={styles.chapterTitle}>{chapter.title}</Text>
                  <Text style={styles.chapterDescription}>{chapter.description}</Text>
                </View>
                <View style={styles.chapterProgress}>
                  <Text style={styles.chapterProgressText}>
                    {chapter.completed}/{chapter.total}
                  </Text>
                  <View style={styles.chapterProgressTrack}>
                    <View style={[styles.chapterProgressFill, { width: `${chapterProgress}%` }]} />
                  </View>
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.lessonList}>
                  {chapter.lessons.map((lesson) => {
                    const statusStyles = getLessonStatusStyles(lesson.status);
                    const inProgressPercent = Math.round((lesson.progress || 0) * 100);

                    return (
                      <TouchableOpacity
                        key={lesson.id}
                        activeOpacity={lesson.status === 'locked' ? 1 : 0.8}
                        style={[styles.lessonCard, statusStyles.container]}
                      >
                        <View style={styles.lessonLeft}>
                          <Ionicons
                            name={statusStyles.icon}
                            size={20}
                            color={statusStyles.iconColor}
                            style={styles.lessonIcon}
                          />
                          <View>
                            <Text style={[styles.lessonTitle, { color: statusStyles.textColor }]}>
                              {lesson.title}
                            </Text>
                            <View style={styles.lessonMetaRow}>
                              <Ionicons name="time-outline" size={14} color={statusStyles.textColor} />
                              <Text style={[styles.lessonDuration, { color: statusStyles.textColor }]}>
                                {lesson.duration}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {lesson.status === 'in-progress' && (
                          <View style={styles.lessonProgressArea}>
                            <View style={styles.lessonProgressTrack}>
                              <View style={[styles.lessonProgressFill, { width: `${inProgressPercent}%` }]} />
                            </View>
                            <Text style={styles.lessonProgressValue}>{inProgressPercent}%</Text>
                          </View>
                        )}
                        {lesson.status !== 'in-progress' && (
                          <Ionicons
                            name={lesson.status === 'locked' ? 'lock-closed-outline' : 'play'}
                            size={20}
                            color={statusStyles.iconColor}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SubjectDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  scrollContent: {
    paddingBottom: 120,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#1b2945',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  subjectTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#142033',
  },
  subjectGrade: {
    fontSize: 14,
    color: '#5f6f87',
    marginTop: 4,
  },
  summaryCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 16,
  },
  subjectIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#233163',
    marginBottom: 6,
  },
  summaryMeta: {
    fontSize: 14,
    color: '#4f5f7b',
  },
  summaryProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryProgressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#dfdff0',
    overflow: 'hidden',
  },
  summaryProgressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#142033',
  },
  summaryProgressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#142033',
  },
  chapterCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#1a2541',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  chapterExpanded: {
    paddingBottom: 12,
  },
  chapterCollapsed: {
    paddingBottom: 6,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chapterToggle: {
    marginTop: 4,
  },
  chapterInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#142033',
    marginBottom: 6,
  },
  chapterDescription: {
    fontSize: 13,
    color: '#5c6b84',
    lineHeight: 18,
  },
  chapterProgress: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  chapterProgressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#142033',
    marginBottom: 6,
  },
  chapterProgressTrack: {
    width: 72,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#e1e5ef',
    overflow: 'hidden',
  },
  chapterProgressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#142033',
  },
  lessonList: {
    marginTop: 18,
    gap: 12,
  },
  lessonCard: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIcon: {
    marginRight: 12,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  lessonMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  lessonDuration: {
    fontSize: 13,
  },
  lessonProgressArea: {
    alignItems: 'flex-end',
    gap: 6,
  },
  lessonProgressTrack: {
    width: 70,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#dce2ed',
    overflow: 'hidden',
  },
  lessonProgressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#142033',
  },
  lessonProgressValue: {
    fontSize: 12,
    color: '#142033',
    fontWeight: '600',
  },
  lessonCompleted: {
    backgroundColor: '#e7fff4',
  },
  lessonInProgress: {
    backgroundColor: '#eef3ff',
  },
  lessonLocked: {
    backgroundColor: '#f6f7fb',
  },
});
