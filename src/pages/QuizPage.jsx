import React, { useEffect, useState } from 'react';
import { fetchQuiz } from '../utils/fetchQuiz';

function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await fetchQuiz();
      setQuizzes(data);
    };
    loadQuizzes();
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (quiz) => {
    let score = 0;
    const feedbackData = quiz.questions.map(q => {
      const correct = q.correctAnswer;
      const userAnswer = answers[q._id];
      if (userAnswer === correct) {
        score++;
        return { question: q.prompt, result: "✅ Correct" };
      } else {
        return { question: q.prompt, result: `❌ Incorrect (Correct: ${correct})` };
      }
    });

    setResult({ score, feedback: feedbackData });
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <div>
      <header style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <h1>🔐 Secure Coding Dashboard</h1>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>Practice. Learn. Secure.</p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '2rem' }}>
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
                      onChange={() => handleChange(q._id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}

            <h4>Progress: {quiz.questions.filter(q => answers[q._id]).length} / {quiz.questions.length}</h4>
            <button onClick={() => handleSubmit(quiz)}>Submit</button>
          </div>
        ))}

        {result && (
          <div style={{ marginTop: '2rem' }}>
            <h4>Score: {result.score}</h4>
            {result.feedback.map((fb, idx) => (
              <p key={idx}>
                <strong>{fb.question}</strong>: {fb.result}
              </p>
            ))}
            <button onClick={handleRetake}>Retake Quiz</button>
          </div>
        )}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.85rem', color: '#777' }}>
        <p>Built by Kalpana Panchal • Arya P.G. College, Panipat</p>
      </footer>
    </div>
  );
}

export default QuizPage;