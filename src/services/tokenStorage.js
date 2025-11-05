import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'hoctapapp/accessToken';

export const setAccessToken = async (token) => {
  if (!token) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  return token;
};

export const clearAccessToken = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};

export default {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
};
