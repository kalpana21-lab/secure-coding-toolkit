//C:\Users\KALPNA\Desktop\secure-coding-dashboard\frontend\src\utils\auth.js
import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  const { id } = jwtDecode(token);
  return id;
};