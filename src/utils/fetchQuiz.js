import axios from 'axios';
import fallbackData from '../data/fallback-quiz.json'; // adjust path if needed

export const fetchQuiz = async () => {
  try {
    const res = await axios.get('/api/quiz');
    return res.data;
  } catch (err) {
    console.warn('Fallback triggered');
    return fallbackData;
  }
};