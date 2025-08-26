// frontend/src/services/authService.js
import API from './api';

export const register = async (email, password) => {
  const res = await API.post('/auth/register', { email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  const { token } = res.data;
  localStorage.setItem('authToken', token);
  return res.data;
};
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};
export const logout = () => {
  localStorage.removeItem('authToken');
};