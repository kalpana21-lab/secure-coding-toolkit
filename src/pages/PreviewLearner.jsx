import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuizById } from '../services/quizService';
import { submitFeedback } from '../services/feedbackService';
import './PreviewLearner.css';



const PreviewLearner: React.FC = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (!quizId) return;
        const data = await fetchQuizById(quizId);
        setQuiz(data);
      } catch (err) {
        console.error('Failed to load quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const handleFeedback = async (questionId, type) => {
    try {
      await submitFeedback({
        quizId,
        questionId,
        feedbackType: type,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Feedback error:', err);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="preview-container">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      <ul className="question-list">
        {quiz.questions.map((q, i) => (
          <li key={q._id}>
            <strong>Q{i + 1}:</strong> {q.prompt}
            <ul>
              {q.choices.map((choice, idx) => (
                <li key={idx}>{choice}</li>
              ))}
            </ul>
            <div className="feedback-buttons">
              <button onClick={() => handleFeedback(q._id, 'confusing')}>Confusing</button>
              <button onClick={() => handleFeedback(q._id, 'too_long')}>Too Long</button>
              <button onClick={() => handleFeedback(q._id, 'needs_rewording')}>Needs Rewording</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewLearner;