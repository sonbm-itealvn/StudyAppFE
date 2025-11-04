const BASE_URL = 'http://192.168.0.45:4000/api/auth';

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && (data?.message || data?.error)) ||
      (typeof data === 'string' ? data : 'Đã xảy ra lỗi, vui lòng thử lại.');
    throw new Error(message);
  }

  return data;
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
};

export const register = async ({ fullName, email, password, password_confirmation }) => {
  const payload = {
    fullName,
    email,
    password,
  };

  if (password_confirmation) {
    payload.password_confirmation = password_confirmation;
  }

  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export default {
  login,
  register,
};
