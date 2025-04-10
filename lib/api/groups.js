import { fetchWithRetry } from "../api/api";

export const createGroup = async (name, lockId, desc) => {
  try {
    const createGroup = {LockId: lockId, Name: name, Description: desc};
    const group = await fetchWithRetry("POST", "group/create", createGroup);  
    return group;
  } catch (error) {
    console.error("Hiba a csoport létrehozásakor:", error);
    return null;
  }
}

export const getGroupsFromLockWithUsers = async (lockId) => {
  try {    
    const groups = await fetchWithRetry("GET", `group/locks/${lockId}`);
    return groups;
  } catch (error) {
    console.error("Hiba a csoportok lekérésekor (fromlockwithusers):", error);
    return [];
  }
}

export const getGroupsFromLock = async (lockId) => {
  try {    
    const groups = await fetchWithRetry("GET", `group/lock/${lockId}/groups`);
    return groups;
  } catch (error) {
    console.error("Hiba a csoportok lekérésekor (fromlock):", error);
    return [];
  }
}

export const getUsersFromGroup = async (groupId) => {
  try {    
    const users = await fetchWithRetry("GET", `group/${groupId}/users`);
    return users;
  } catch (error) {
    console.error("Hiba a felhasználók lekérésekor:", error);
    return [];
  }
}

export const postAddUserToGroup = async (groupId,userId) => {
  try {
    const reponse = await fetchWithRetry("POST", `group/${groupId}/${userId}`);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a felhasználó csoporthoz rendelésekor:", error);
  }
}

export const deleteUserToGroup = async (groupId,userId) => {
  try {
    const reponse = await fetchWithRetry("DELETE", `group/${groupId}/${userId}`);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a felhasználó csoportból való törlésekor:", error);
  }
}

export const deleteGroupFromLock = async (groupId) => {
  try {
    const reponse = await fetchWithRetry("DELETE", `group/delete/${groupId}`);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a csoport törlésekor:", error);
  }
}