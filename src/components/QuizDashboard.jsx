import { useEffect, useState } from 'react';
import axios from 'axios';

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/quizzes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  const handleStartQuiz = async (quizId) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`/api/quizzes/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSelectedQuiz(res.data);
    setAnswers({});
    setFeedback(null);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuiz = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `/api/quizzes/${selectedQuiz._id}/submit`,
      { answers },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setFeedback(res.data);
  };

  return (
    <div>
      <h2>Quiz Dashboard</h2>

      {!selectedQuiz ? (
        <>
          <h3>Available Quizzes</h3>
          {quizzes.map((quiz) => (
            <div key={quiz._id}>
              <h4>{quiz.title}</h4>
              <button onClick={() => handleStartQuiz(quiz._id)}>Start Quiz</button>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3>{selectedQuiz.title}</h3>
          {selectedQuiz.questions.map((q) => (
            <div key={q._id}>
              <p>{q.text}</p>
              {q.options.map((opt, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={q._id}
                    value={opt}
                    checked={answers[q._id] === opt}
                    onChange={() => handleAnswerChange(q._id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>

          {feedback && (
            <div>
              <h4>Score: {feedback.score}</h4>
              <p>{feedback.message}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizDashboard;