import { fetchWithRetry } from "../api/api";

export const getUserKeys = async (userId) => {
  try {    
    const keys = await fetchWithRetry("GET", `user/${userId}/keys`);
    return keys;
  } catch (error) {
    console.error("Hiba a kulcsok lekérésekor:", error);
    return [];
  }
};

export const getKeysForLock = async (lockId) => {
  try {    
    const keys = await fetchWithRetry("GET", `lock/${lockId}/keys`);
    return keys;
  } catch (error) {
    console.error("Hiba a kulcsok lekérésekor:", error);
    return [];
  }
};
