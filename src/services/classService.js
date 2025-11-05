import { getAccessToken } from './tokenStorage';

const BASE_URL = 'http://192.168.0.45:4000/api/admin';

const FALLBACK_CLASSES = [
  { id: '690977f25938ca0e33267bec', name: 'Lop 10' },
  { id: '690977f75938ca0e33267bf2', name: 'Lop 11' },
  { id: '690977fb5938ca0e33267bf8', name: 'Lop 12' },
  { id: '690977dc5938ca0e33267bd4', name: 'Lop 6' },
  { id: '690977e45938ca0e33267bda', name: 'Lop 7' },
  { id: '690977e95938ca0e33267be0', name: 'Lop 8' },
  { id: '690977ed5938ca0e33267be6', name: 'Lop 9' },
];

export const fetchClasses = async () => {
  try {
    const token = await getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/classes/`, {
      headers,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      id: item._id ?? item.id ?? item.classId ?? item.name ?? null,
      name: item.name ?? '',
    }));
  } catch (error) {
    console.error('Failed to load classes', error);
    return FALLBACK_CLASSES;
  }
};

export default {
  fetchClasses,
};
