import { fetchWithRetry } from "../api/api";

export const getCountUserKeys = async (userId) => {
  try {    
    const countKeys = await fetchWithRetry("GET", `key/count/${userId}`);
    return countKeys;
  } catch (error) {
    console.error("Hiba a kulcsok számának lekérésekor:", error);
    return 0;
  }
};

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

export const postKeyCreate = async (userId,lockId,expDate,remainingUses,name,startTime,endTime) => {
  console.log(startTime,endTime);
  
  try {
    const createKey = {userID: userId, lockId: lockId, ExpirationDate: expDate, RemainingUses: remainingUses, Name: name, StartTimeString: startTime, EndTimeString: endTime}  
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