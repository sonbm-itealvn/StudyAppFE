import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SUBJECTS, { getSubjectById } from '../data/subjects';
import { fetchChaptersBySubject, fetchLessonsByChapter } from '../services/subjectService';

const SubjectDetailScreen = ({ route, navigation }) => {
  const { subjectId } = route.params || {};
  const passedSubject = route.params?.subjectData;

  const fallbackSubject = getSubjectById(subjectId) || SUBJECTS[0];

  const [subjectInfo, setSubjectInfo] = useState(() => ({
    id: passedSubject?.id ?? passedSubject?._id ?? fallbackSubject?.id ?? subjectId,
    name: passedSubject?.name ?? fallbackSubject?.name ?? 'Mon hoc',
    grade: passedSubject?.grade ?? fallbackSubject?.grade ?? '',
    color: passedSubject?.color ?? fallbackSubject?.color ?? '#2f6aff',
    icon: passedSubject?.icon ?? fallbackSubject?.icon ?? 'book-outline',
    progressPercent:
      passedSubject?.progressPercent ??
      (typeof passedSubject?.progress === 'number'
        ? Math.round(passedSubject.progress * 100)
        : fallbackSubject?.progressPercent ??
          (typeof fallbackSubject?.progress === 'number'
            ? Math.round(fallbackSubject.progress * 100)
            : 0)),
    totalUnitsText:
      passedSubject?.totalUnitsText ?? fallbackSubject?.totalUnitsText ?? 'Dang cap nhat',
  }));

  const [chapters, setChapters] = useState([]);
  const [expandedChapterId, setExpandedChapterId] = useState(null);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [chaptersError, setChaptersError] = useState(null);
  const [lessonsMap, setLessonsMap] = useState({});
  const [loadingLessons, setLoadingLessons] = useState({});
  const [lessonsError, setLessonsError] = useState({});

  const handleToggleChapter = async (chapterId) => {
    if (expandedChapterId === chapterId) {
      setExpandedChapterId(null);
      return;
    }
    setExpandedChapterId(chapterId);
    if (!lessonsMap[chapterId]) {
      await loadLessons(chapterId);
    }
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

  const loadChapters = useCallback(async () => {
    if (!subjectInfo.id) return;
    setLoadingChapters(true);
    setChaptersError(null);
    try {
      const data = await fetchChaptersBySubject(subjectInfo.id);
      const mapped = data.map((chapter, index) => {
        const id = chapter._id ?? chapter.id ?? `chapter-${index}`;
        const title = chapter.name ?? chapter.title ?? `Chuong ${index + 1}`;
        const description = chapter.description ?? chapter.summary ?? '';
        const completedLessons =
          chapter.completedLessons ?? chapter.completed ?? chapter.completedUnits ?? 0;
        const totalLessons =
          chapter.totalLessons ?? chapter.total ?? chapter.totalUnits ?? chapter.lessonCount ?? 0;
        const progressPercent =
          totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        return {
          id,
          title,
          description,
          completedLessons,
          totalLessons,
          progressPercent,
          raw: chapter,
        };
      });
      setChapters(mapped);
      if (mapped.length > 0) {
        setExpandedChapterId(mapped[0].id);
        await loadLessons(mapped[0].id);
      } else {
        setExpandedChapterId(null);
      }
    } catch (error) {
      setChapters([]);
      setChaptersError(error.message || 'Khong the tai danh sach chuong.');
    } finally {
      setLoadingChapters(false);
    }
  }, [subjectInfo.id]);

  const loadLessons = useCallback(
    async (chapterId) => {
      if (!chapterId) return;
      setLoadingLessons((prev) => ({ ...prev, [chapterId]: true }));
      setLessonsError((prev) => ({ ...prev, [chapterId]: null }));
      try {
        const data = await fetchLessonsByChapter(chapterId);
        const mapped = data.map((lesson, index) => {
          const id = lesson._id ?? lesson.id ?? `lesson-${chapterId}-${index}`;
          const title = lesson.name ?? lesson.title ?? `Bai ${index + 1}`;
          const duration =
            lesson.duration ??
            lesson.time ??
            lesson.readingTime ??
            lesson.estimatedTime ??
            '—';
          const status = lesson.status ?? 'locked';
          const progress =
            lesson.progress ??
            (status === 'completed' ? 1 : status === 'in-progress' ? 0.5 : 0);
          return {
            id,
            title,
            duration,
            status,
            progress,
            raw: lesson,
          };
        });
        setLessonsMap((prev) => ({ ...prev, [chapterId]: mapped }));
      } catch (error) {
        setLessonsMap((prev) => ({ ...prev, [chapterId]: [] }));
        setLessonsError((prev) => ({
          ...prev,
          [chapterId]: error.message || 'Khong the tai bai hoc.',
        }));
      } finally {
        setLoadingLessons((prev) => ({ ...prev, [chapterId]: false }));
      }
    },
    [],
  );

  useEffect(() => {
    loadChapters();
  }, [loadChapters]);

  const overallPercent = subjectInfo.progressPercent ?? 0;
  const hasChapters = chapters.length > 0;
  const summaryMeta = subjectInfo.totalUnitsText;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#142033" />
          </TouchableOpacity>
          <View>
            <Text style={styles.subjectTitle}>{subjectInfo.name}</Text>
            <Text style={styles.subjectGrade}>{subjectInfo.grade}</Text>
          </View>
        </View>

        <LinearGradient colors={['#f2f4ff', '#faf5ff']} style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={[styles.subjectIcon, { backgroundColor: `${subjectInfo.color}20` }]}>
              <Ionicons name={subjectInfo.icon} size={26} color={subjectInfo.color} />
            </View>
            <View>
              <Text style={styles.summaryTitle}>{subjectInfo.name}</Text>
              <Text style={styles.summaryMeta}>{summaryMeta}</Text>
            </View>
          </View>
          <View style={styles.summaryProgress}>
            <View style={styles.summaryProgressTrack}>
              <View style={[styles.summaryProgressFill, { width: `${overallPercent}%` }]} />
            </View>
            <Text style={styles.summaryProgressValue}>{overallPercent}%</Text>
          </View>
        </LinearGradient>

        {loadingChapters && (
          <View style={styles.loadingState}>
            <ActivityIndicator size="small" color="#2368ff" />
            <Text style={styles.loadingText}>Dang tai chuong hoc...</Text>
          </View>
        )}

        {chaptersError && !loadingChapters && (
          <Text style={styles.errorText}>{chaptersError}</Text>
        )}

        {!loadingChapters && !chaptersError && !hasChapters && (
          <View style={styles.placeholderCard}>
            <Ionicons name="book-outline" size={26} color="#2368ff" />
            <Text style={styles.placeholderTitle}>Noi dung dang duoc cap nhat</Text>
            <Text style={styles.placeholderText}>
              Chi tiet mon hoc se duoc bo sung khi co du lieu chuong va bai giang.
            </Text>
          </View>
        )}

        {chapters.map((chapter) => {
          const isExpanded = expandedChapterId === chapter.id;
          const chapterLessons = lessonsMap[chapter.id] || [];
          const chapterLoading = loadingLessons[chapter.id];
          const chapterError = lessonsError[chapter.id];
          const progressText =
            chapter.totalLessons > 0
              ? `${chapter.completedLessons}/${chapter.totalLessons}`
              : `${chapter.progressPercent}%`;

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
                  {chapter.description ? (
                    <Text style={styles.chapterDescription}>{chapter.description}</Text>
                  ) : null}
                </View>
                <View style={styles.chapterProgress}>
                  <Text style={styles.chapterProgressText}>{progressText}</Text>
                  <View style={styles.chapterProgressTrack}>
                    <View style={[styles.chapterProgressFill, { width: `${chapter.progressPercent}%` }]} />
                  </View>
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.lessonList}>
                  {chapterLoading && (
                    <View style={styles.loadingState}>
                      <ActivityIndicator size="small" color="#2368ff" />
                      <Text style={styles.loadingText}>Dang tai bai hoc...</Text>
                    </View>
                  )}

                  {chapterError && !chapterLoading && (
                    <Text style={styles.errorText}>{chapterError}</Text>
                  )}

                  {!chapterLoading && !chapterError && chapterLessons.length === 0 && (
                    <Text style={styles.emptyLessonsText}>Chua co bai hoc.</Text>
                  )}

                  {chapterLessons.map((lesson) => {
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
  loadingState: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#44527a',
    fontSize: 14,
  },
  errorText: {
    color: '#d93025',
    fontSize: 13,
    marginBottom: 12,
  },
  placeholderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#1a2541',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2740',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#5b6375',
    textAlign: 'center',
    lineHeight: 20,
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
  emptyLessonsText: {
    color: '#6b768d',
    fontSize: 13,
    textAlign: 'center',
  },
});
