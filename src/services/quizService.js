// frontend/src/services/quizService.js
import API from './api';

export const fetchQuizById = async (quizId) => {
  // mock or real API call
};
export const submitQuiz = async (lessonId, answers) => {
  const res = await API.post(`/quizzes/${lessonId}/submit`, { answers });
  return res.data;
};
export const fetchQuizHistory = async () => {
  const res = await API.get('/quizzes/quiz-history');
  return res.data.attempts;
};
export const getQuizHistoryByUserId = async (userId) => {
  const res = await API.get(`/quizzes/attempts/${userId}`);
  return res.data.attempts;
};
// Save a new quiz (admin only)
export const saveQuiz = async (quizData) => {
  return await API.post('/admin/quizzes', quizData);
};

export const getAllQuizzes = async () => {
  return await API.get('/quizzes');
};

export const deleteQuiz = async (quizId) => {
  return await API.delete(`/admin/quizzes/${quizId}`);
};

export const updateQuiz = async (quizId, updatedData) => {
  return await API.put(`/admin/quizzes/${quizId}`, updatedData);
};


