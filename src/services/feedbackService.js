// C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\services\feedbackService.js
import axios from 'axios';

export const submitFeedback = async (payload) => {
  const res = await axios.post('/api/feedback', payload);
  return res.data;
};
export const fetchFeedbackSummary = async (quizId) => {
  const res = await axios.get(`/api/feedback/summary?quizId=${quizId}`);
  return res.data.summary;
};