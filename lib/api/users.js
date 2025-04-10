import { fetchWithRetry } from '../api/api.js'

export const getUsers = async () => {
  try {    
    const users = await fetchWithRetry("GET", `user/getall`);
    return users;
  } catch (error) {
    console.error("Hiba a felhasználók lekérésekor:", error);
    return [];
  }
};

export const putUserUpdate = async (userId,email,name) => {
  try {
    const updateUser = {Email: email, Name: name};
    const reponse = await fetchWithRetry("PUT", `user/update/${userId}`, updateUser);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a felhasználó frissitésekor:", error);
  }
}

export const putPasswordUpdate = async (userId,password,newPassword) => {
  try {
    const updatePassword = {Password: password, NewPassword: newPassword};
    const reponse = await fetchWithRetry("PUT", `user/${userId}/change-password`, updatePassword);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a jelszó frissitésekor:", error);
  }
}

export const postPushToken = async (userId,token) => {
  try {
    const pushToken = {userId: userId, token: token};
    const reponse = await fetchWithRetry("POST", `notification/register-push-token`, pushToken);
    console.log(reponse);
  } catch (error) {
    console.error("Hiba a token beállításakor:", error);
  }
}