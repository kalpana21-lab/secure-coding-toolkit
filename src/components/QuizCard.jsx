import React from 'react';
import './QuizCard.css';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quizId, score, total, submittedAt }) => {
  const navigate = useNavigate();
  const scoreClass =
    score / total > 0.8 ? 'high-score' :
    score / total < 0.5 ? 'low-score' :
    'medium-score';

  return (
    <div className={`quiz-card ${scoreClass}`}>
      <div className="quiz-title">{quizId.title}</div>
      <div className="quiz-score">Score: {score}/{total}</div>
      <div className="quiz-date">Submitted: {new Date(submittedAt).toLocaleString()}</div>
      <div className="quiz-percentage">Percentage: {((score / total) * 100).toFixed(1)}%</div>
      <button onClick={() => navigate(`/quiz/${quizId._id}`)}>Retake Quiz</button>
    </div>
  );
};

export default QuizCard;