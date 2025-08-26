// frontend/src/utils/validateQuiz.js
export const validateQuiz = (title, questions) => {
  if (!title.trim()) return 'Quiz title is required.';
  if (questions.length === 0) return 'Add at least one question.';
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!q.text.trim()) return `Question ${i + 1} is missing text.`;
    if (q.options.some(opt => !opt.trim())) return `Question ${i + 1} has empty options.`;
    if (q.correctIndex < 0 || q.correctIndex > 3) return `Question ${i + 1} has invalid correct answer.`;
  }
  return null;
};