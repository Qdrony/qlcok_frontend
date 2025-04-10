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

export const putKeyUpdate = async (keyId,status,expDate,remainingUses,name) => {
  try {
    const updateKey = {Id: keyId, Status: status, ExpirationDate: expDate, RemainingUses: remainingUses, Name: name}
    const reponse = await fetchWithRetry("PUT", "key/update",updateKey);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a kulcs frissitésekor:", error);
  }
}

export const postKeyCreate = async (userId,lockId,expDate,remainingUses,name) => {
  try {
    const createKey = {userID: userId, lockId: lockId, ExpirationDate: expDate, RemainingUses: remainingUses, Name: name}  
    const reponse = await fetchWithRetry("POST", "key/create",createKey);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a kulcs létrehozásakor:", error);
  }
}

export const deleteKey = async (keyId) => {
  try { 
    const reponse = await fetchWithRetry("DELETE", `key/${keyId}`);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a kulcs törlésekor:", error);
  }
}