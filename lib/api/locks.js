import { fetchWithRetry } from "../api/api";

export const getCountUserLocks = async (userId) => {
  try {    
    const countLocks = await fetchWithRetry("GET", `lock/count/${userId}`);
    return countLocks;
  } catch (error) {
    console.error("Hiba a zárak számának lekérésekor:", error);
    return 0;
  }
};

export const getUserLocks = async (userId) => {
  try {    
    const locks = await fetchWithRetry("GET", `user/${userId}/locks`);
    return locks;
  } catch (error) {
    console.error("Hiba a zárak lekérésekor:", error);
    return [];
  }
};

export const getLockById = async (lockId) => {
  try {    
    const lock = await fetchWithRetry("GET", `lock/${lockId}`);
    return lock;
  } catch (error) {
    console.error("Hiba a zár lekérésekor:", error);
    return [];
  }
}

export const putLockUpdate = async (lockId,status,name) => {
  try {
    const updateLock = {Id: lockId, Name: name, Status: status}  
    const reponse = await fetchWithRetry("PUT", `lock/${lockId}`,updateLock);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a zár frissitésekor:", error);
  }
}
