import axios from 'axios';
import fallbackData from '../data/fallback-quiz.json'; // adjust path if needed

export const fetchQuiz = async () => {
  try {
    const res = await axios.get('https://railway.com/project/e6a325af-749e-4e8f-8fd5-09fea379c491/settings/usage?environmentId=75220d28-1865-490f-b5f5-3f43fe75a5da/api/quiz');
    return res.data;
  } catch (err) {
    console.warn('Fallback triggered');
    return fallbackData;
  }
};