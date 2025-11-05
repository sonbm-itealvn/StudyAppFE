import { getAccessToken } from './tokenStorage';

const SUBJECT_BASE_URL = 'http://192.168.0.45:4000/api/subjects';
const ADMIN_BASE_URL = 'http://192.168.0.45:4000/api/admin';

export const fetchSubjectsByClass = async (classId) => {
  if (!classId) {
    throw new Error('classId is required');
  }

  const token = await getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${SUBJECT_BASE_URL}/by-class/${classId}`, {
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    let message;
    try {
      const json = JSON.parse(text);
      message = json?.message || json?.error || text;
    } catch (_err) {
      message = text;
    }
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    return [];
  }

  return data;
};

export const fetchChaptersBySubject = async (subjectId) => {
  if (!subjectId) {
    throw new Error('subjectId is required');
  }

  const token = await getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${ADMIN_BASE_URL}/chapters/by-subject/${subjectId}`, {
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    let message;
    try {
      const json = JSON.parse(text);
      message = json?.message || json?.error || text;
    } catch (_err) {
      message = text;
    }
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    return [];
  }
  return data;
};

export const fetchLessonsByChapter = async (chapterId) => {
  if (!chapterId) {
    throw new Error('chapterId is required');
  }

  const token = await getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${ADMIN_BASE_URL}/lessons/by-chapter/${chapterId}`, {
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    let message;
    try {
      const json = JSON.parse(text);
      message = json?.message || json?.error || text;
    } catch (_err) {
      message = text;
    }
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    return [];
  }
  return data;
};

export default {
  fetchSubjectsByClass,
  fetchChaptersBySubject,
  fetchLessonsByChapter,
};
