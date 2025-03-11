import api from '../api/api.js'
import { saveEmail, savePassword, saveToken, saveUser } from '../services/secureStore.js'

export const loginUser = async (email, password) => {
    try {
      const response = await api.post('user/login', { email, password });
      saveEmail(email);
      savePassword(password);
      saveToken(response.data.token);
      saveUser(response.data.user);      
      return {success: true, data: response.data};
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  export const registerUser = async (email, password, name) => {
    try {
      const response = await api.post('user/create', { email, password, name });
      console.log("Reg:",response.data.message);
      return {success: true, data: response.data};
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  };