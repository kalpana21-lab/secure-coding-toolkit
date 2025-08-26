// src/pages/QuizSection.js
import React, { useState } from 'react';
// frontend/src/services/quizService.js

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const sampleQuiz = [
  { question: 'What is XSS?', options: ['Cross-Site Scripting', 'XML Secure Sync'], answer: 0 },
  { question: 'Which tool detects insecure Python code?', options: ['Bandit', 'ESLint'], answer: 0 },
];

const QuizSection = () => {
  const [responses, setResponses] = useState(Array(sampleQuiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, optionIndex) => {
    setResponses((prev) => {
      const updated = [...prev];
      updated[qIndex] = optionIndex;
      return updated;
    });
  };

  const handleSubmit = () => {
    const allValid = responses.every((r) => r !== null);
    if (!allValid) return alert('Please answer all questions.');

    const score = responses.filter((r, i) => r === sampleQuiz[i].answer).length;
    setSubmitted(true);
    alert(`Your score: ${score}/${sampleQuiz.length}`);
  };
  /*useEffect(() => {
    fetchQuizzes().then(setQuizzes);
  }, []);*/

  return (
    <div>
      <h2>Secure Coding Quiz</h2>
      {sampleQuiz.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((opt, j) => (
            <label key={j}>
              <input
                type="radio"
                name={`q${i}`}
                checked={responses[i] === j}
                onChange={() => handleSelect(i, j)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={responses.includes(null)}
        >Submit Quiz
      </button>
      {submitted && <p>Thanks for participating!</p>}
    </div>
  );
};

export default QuizSection;
