const BASE_URL = 'http://192.168.0.45:4000/api/admin';

export const fetchClasses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/classes/`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to load classes', error);
    throw error;
  }
};

export default {
  fetchClasses,
};
