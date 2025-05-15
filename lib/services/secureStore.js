import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';
const EMAIL_KEY = 'userEmail';
const PASSWORD_KEY = 'userPassword';
const USER_KEY = 'user';
const CURRENT_KEY = 'currentKey';
const OFFLINE_KEYS = 'offlineKeys';
const LAST_LOGIN_TIME = 'lastLoginTime';

export const getLastLoginTime = async () => {
  try {
    const lastLoginTime = await SecureStore.getItemAsync(LAST_LOGIN_TIME);
    return lastLoginTime;
  } catch (error) {
    console.error('Error getting last login time:', error);
    return null;
  }
}

export const saveLoginTime = async () => {
  const currentDate = new Date().toISOString();
  await SecureStore.setItemAsync(LAST_LOGIN_TIME, currentDate);
}

export const saveOfflineKeys = async (keys) => {
  try {
    const keysJSON = JSON.stringify(keys);
    await SecureStore.setItemAsync(OFFLINE_KEYS, keysJSON);
  } catch (error) {
    console.error('Error saving offline keys:', error);
  }
};

export const getOfflineKeys = async () => {
  try {
    const jsonRESPONSE = await SecureStore.getItemAsync(OFFLINE_KEYS);
    return jsonRESPONSE != null ? JSON.parse(jsonRESPONSE) : null;
  } catch (error) {
    console.error('Error getting offline keys:', error);
    return null;
  }
};

export const deleteOfflineKeys = async () => {
  try {
    await SecureStore.deleteItemAsync(OFFLINE_KEYS);
  }
  catch (error) {
    console.error('Error deleting offline keys:', error);
  }
};

export const saveCurrentKey = async (key) => {
  try {
    const keyJSON = JSON.stringify(key);
    await SecureStore.setItemAsync(CURRENT_KEY, keyJSON);
    console.log("Kulcs kiválasztva");
  } catch (error) {
    console.error('Error saving currentkey:', error);
  }
};

export const getCurrentKey = async () => {
  try {
    const jsonRESPONSE = await SecureStore.getItemAsync(CURRENT_KEY);
    return jsonRESPONSE != null ? JSON.parse(jsonRESPONSE) : null;
  } catch (error) {
    console.error('Error getting currentkey:', error);
    return null;
  }
};

export const deleteCurrentKey = async () => {
  try {
    await SecureStore.deleteItemAsync(CURRENT_KEY);
    console.log("Kulcs törölve");
  } catch (error) {
    console.error('Error deleting currentkey:', error);
  }
};

export const saveUser = async (user) => {
  try {
    const userJSON = JSON.stringify(user);
    
    await SecureStore.setItemAsync(USER_KEY, userJSON);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async () => {
  try {
    const jsonRESPONSE = await SecureStore.getItemAsync(USER_KEY);
    
    return jsonRESPONSE != null ? JSON.parse(jsonRESPONSE) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const deleteUser = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const reLogin = async () => {
  console.log('Token lejárt, próbálok újra bejelentkezni...');

  const email = await SecureStore.getItemAsync('userEmail');
  const password = await SecureStore.getItemAsync('userPassword');

  if (!email || !password) {
    console.log('Nincsenek mentett bejelentkezési adatok. Kijelentkeztetés szükséges.');
    return false;
  }

  try {
    const newToken = await loginUser(email, password).token;
    await saveToken(newToken);
    console.log('Új token mentve.');
    return true;
  } catch (error) {
    console.log('Újra bejelentkezés sikertelen.');
    return false;
  }
};

export const savePassword = async (password) => {
  try {
    await SecureStore.setItemAsync(PASSWORD_KEY, password);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getPassword = async () => {
  try {
    return await SecureStore.getItemAsync(PASSWORD_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const deletePassword = async () => {
  try {
    await SecureStore.deleteItemAsync(PASSWORD_KEY);
  } catch (error) {
    console.error('Error deleting token:', error);
  }
}

export const saveEmail = async (email) => {
  try {
    await SecureStore.setItemAsync(EMAIL_KEY, email);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getEmail = async () => {
  try {
    return await SecureStore.getItemAsync(EMAIL_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const deleteEmail = async () => {
  try {
    await SecureStore.deleteItemAsync(EMAIL_KEY);
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};

export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};

export const isLoggedIn = async () => {
  const token = await getToken();
  return token !== null;
};