import { fetchWithRetry } from "../api/api";

export const getLogsFromLock = async (lockId) => {
  try {    
    const groups = await fetchWithRetry("GET", `log/lock/${lockId}/logs`);
    return groups;
  } catch (error) {
    console.error("Hiba a logok lekérésekor:", error);
    return [];
  }
};