// frontend/src/api/authService.js
import apiClient from './axios';

export const registerUser = (userData) => {
  return apiClient.post('/user/register', userData);
};

export const loginUser = (credentials) => {
  return apiClient.post('/user/login', credentials);
};
export const changePassword = (passwordData) => {
  return apiClient.post('/user/change-password', passwordData);
};
export const logout = async () => {
  const response = await apiClient.post("/user/logout");
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await apiClient.post("/admin/login", credentials);
  return response;
};