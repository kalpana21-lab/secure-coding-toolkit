//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\services\api.js
import axios from 'axios';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 5000,
    withCredentials: true,

});
api.interceptors.response.use(
       (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export async function fetchLessons() {
  const res = await api.get(`lessons`);
  return res.data;
}
export async function submitQuizAnswers(quizId, answers) {
  const res = await api.post(`/quizzes/${quizId}/submit`, { answers });
  return res.data;
}


export default api;