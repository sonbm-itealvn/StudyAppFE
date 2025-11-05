import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fetchClasses } from '../services/classService';
import { fetchSubjectsByClass } from '../services/subjectService';

const SUBJECT_COLORS = ['#2f6aff', '#00c274', '#8b3dff', '#ff7a2f', '#ff4f9b', '#1db9ff', '#ffb03a'];
const SUBJECT_ICONS = [
  'book-outline',
  'calculator-outline',
  'flask-outline',
  'earth-outline',
  'color-palette-outline',
  'podium-outline',
  'school-outline',
];

const SubjectsScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const [isLoadingClasses, setLoadingClasses] = useState(false);
  const [classesError, setClassesError] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [isLoadingSubjects, setLoadingSubjects] = useState(false);
  const [subjectsError, setSubjectsError] = useState(null);

  useEffect(() => {
    const loadClasses = async () => {
      setLoadingClasses(true);
      setClassesError(null);
      try {
        const fetchedClasses = await fetchClasses();
        setClasses(fetchedClasses);
        if (!selectedClass && fetchedClasses.length > 0) {
          setSelectedClass(fetchedClasses[0]);
        }
        if (!fetchedClasses || fetchedClasses.length === 0) {
          setClassesError('Không thể tải danh sách lớp. Vui lòng thử lại sau.');
        }
      } catch (error) {
        setClassesError('Không thể tải danh sách lớp. Vui lòng thử lại sau.');
      } finally {
        setLoadingClasses(false);
      }
    };

    loadClasses();
  }, []);

  const loadSubjects = useCallback(async (classId) => {
    if (!classId) {
      setSubjects([]);
      return;
    }

    setLoadingSubjects(true);
    setSubjectsError(null);
    try {
      const data = await fetchSubjectsByClass(classId);
      const mapped = data.map((item, index) => {
        const id = item._id ?? item.id ?? `subject-${index}`;
        const name = item.name ?? `Môn học ${index + 1}`;
        const color = item.color ?? SUBJECT_COLORS[index % SUBJECT_COLORS.length];
        const icon = item.icon ?? SUBJECT_ICONS[index % SUBJECT_ICONS.length];
        const completed =
          item.completedLessons ??
          item.completed ??
          item.completedUnits ??
          item.completedChapters ??
          0;
        const total =
          item.totalLessons ??
          item.total ??
          item.totalUnits ??
          item.totalChapters ??
          item.lessonCount ??
          0;
        let progressPercent =
          item.progressPercent ??
          item.progress ??
          item.percentage ??
          (total > 0 ? Math.round((completed / total) * 100) : 0);
        progressPercent = Math.min(Math.max(progressPercent, 0), 100);
        const progressText =
          item.progressText ??
          (total > 0
            ? `${completed}/${total} Hoàn thành`
            : `${progressPercent}% Hoàn thành`);
        const description = item.description ?? item.subtitle ?? '';
        return {
          id,
          name,
          color,
          icon,
          progressPercent,
          progressText,
          description,
          raw: item,
        };
      });

      setSubjects(mapped);
      if (mapped.length === 0) {
        setSubjectsError('Chưa có môn học cho lớp này.');
      }
    } catch (error) {
      setSubjects([]);
      setSubjectsError(error.message || 'Không thể tải danh sách môn học.');
    } finally {
      setLoadingSubjects(false);
    }
  }, []);

  useEffect(() => {
    if (selectedClass?.id) {
      loadSubjects(selectedClass.id);
    }
  }, [selectedClass?.id, loadSubjects]);

  const getClassDisplayName = (cls) => {
    if (!cls) return 'Lớp học';
    return cls.name || 'Lớp học';
  };

  const handleOpenSubject = (subject) => {
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.navigate('SubjectDetail', {
        subjectId: subject.id,
        subjectData: subject.raw,
      });
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.gradeSelector}
            onPress={() => setSelectorVisible(true)}
          >
            {isLoadingClasses ? (
              <ActivityIndicator size="small" color="#1b2538" />
            ) : (
              <Text style={styles.gradeSelectorText}>
                {selectedClass ? getClassDisplayName(selectedClass) : 'Chon lop'}
              </Text>
            )}
            <Ionicons name="chevron-down" size={16} color="#1b2538" />
          </TouchableOpacity>
        </View>

        <LinearGradient colors={['#f2f4ff', '#f9f5ff']} style={styles.summaryCard}>
          <Text style={styles.summaryHeadline}>
            {selectedClass ? getClassDisplayName(selectedClass) : 'Lop hoc'}
          </Text>
          <Text style={styles.summarySub}>
            {subjects.length} môn học cho năm học 2024-2025
          </Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Danh sách môn học</Text>

        <View>
          {isLoadingSubjects ? (
            <View style={styles.subjectsLoading}>
              <ActivityIndicator size="small" color="#2368ff" />
            </View>
          ) : subjects.length === 0 ? (
            <Text style={styles.emptySubjectsText}>Chưa có môn học.</Text>
          ) : (
            subjects.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={[styles.subjectCard, index !== subjects.length - 1 && styles.cardSpacing]}
                onPress={() => handleOpenSubject(item)}
              >
                <View style={[styles.subjectIcon, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <View style={styles.subjectContent}>
                  <Text style={styles.subjectName}>{item.name}</Text>
                  {item.description ? (
                    <Text style={styles.subjectDescription}>{item.description}</Text>
                  ) : null}
                  <View style={styles.subjectProgressBar}>
                    <View style={[styles.subjectProgressFill, { width: `${item.progressPercent}%` }]} />
                  </View>
                  <Text style={styles.subjectProgressText}>{item.progressText}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#1f2d3d" />
              </TouchableOpacity>
            ))
          )}
        </View>

        {classesError && <Text style={styles.errorText}>{classesError}</Text>}
        {subjectsError && <Text style={styles.errorText}>{subjectsError}</Text>}
      </ScrollView>

      <Modal
        visible={isSelectorVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectorVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn lớp học</Text>
              <TouchableOpacity onPress={() => setSelectorVisible(false)} activeOpacity={0.7}>
                <Ionicons name="close" size={22} color="#1b2538" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={classes}
              keyExtractor={(item, index) => String(item?.id ?? index)}
              ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
              renderItem={({ item }) => {
                const isActive = selectedClass && (selectedClass.id ?? selectedClass.name) === (item.id ?? item.name);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.modalItem, isActive && styles.modalItemActive]}
                    onPress={() => {
                      setSelectedClass(item);
                      setSelectorVisible(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, isActive && styles.modalItemTextActive]}>
                      {getClassDisplayName(item)}
                    </Text>
                    {isActive && <Ionicons name="checkmark-circle" size={20} color="#2368ff" />}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  {isLoadingClasses ? (
                    <ActivityIndicator size="small" color="#2368ff" />
                  ) : (
                    <Text style={styles.emptyStateText}>Chưa có lớp nào</Text>
                  )}
                </View>
              }
            />
          </View>
        </View>
      </Modal>
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
    gap: 6,
  },
  gradeSelectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b2538',
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
  subjectsLoading: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptySubjectsText: {
    textAlign: 'center',
    color: '#6b768d',
    paddingVertical: 24,
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
  },
  subjectDescription: {
    fontSize: 13,
    color: '#5b6375',
    marginTop: 6,
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
  subjectProgressText: {
    fontSize: 13,
    color: '#525f75',
    marginTop: 10,
  },
  errorText: {
    color: '#d93025',
    fontSize: 13,
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    maxHeight: '60%',
    shadowColor: '#1a2642',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b2538',
  },
  modalSeparator: {
    height: 1,
    backgroundColor: '#ebedf2',
  },
  modalItem: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItemActive: {
    backgroundColor: '#f1f5ff',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  modalItemText: {
    fontSize: 15,
    color: '#1b2538',
  },
  modalItemTextActive: {
    color: '#2368ff',
    fontWeight: '600',
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b768d',
  },
});
