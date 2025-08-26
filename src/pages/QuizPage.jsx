// frontend/src/pages/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchLessons as fetchQuizzes, submitQuizAnswers as submitQuiz } from '../services/api';

function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
      }
    };
    loadQuizzes();
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (quiz) => {
    try {
      const res = await submitQuiz(quiz._id, answers);
      alert(`Score: ${res.score}/${quiz.questions.length}`);
      setResult(res);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Secure Coding Quiz</h2>

      {quizzes.map(quiz => (
        <div key={quiz._id} style={{ marginBottom: '2rem' }}>
          <h3>{quiz.title}</h3>

          {quiz.questions.map(q => (
            <div key={q._id} style={{ marginBottom: '1rem' }}>
              <p><strong>{q.prompt}</strong></p>
              {q.options.map(opt => (
                <label key={opt} style={{ display: 'block', marginLeft: '1rem' }}>
                  <input
                    type="radio"
                    name={q._id}
                    value={opt}
                    checked={answers[q._id] === opt}
                    onChange={() => handleChange(q._id, opt)} />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button onClick={() => handleSubmit(quiz)}>Submit</button>
        </div>
      ))}

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Score: {result.score}</h4>
         {result.feedback?.map((fb, idx) => (
          <p key={idx}>
          <strong>{fb.question}</strong>: {fb.result}
          </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizPage;