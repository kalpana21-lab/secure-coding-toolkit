// ✅ Define local API instance
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});
export const fetchLessons = async () => {
  try {
    const res = await API.get('/lessons');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch lessons:', err);
    throw err;
  }
};