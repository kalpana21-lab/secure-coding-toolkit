//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\pages\QuizHistory.jsx
import React, { useEffect, useState } from 'react';
import { getQuizHistoryByUserId } from '../services/quizService';
import { getUserIdFromToken } from '../utils/auth';
import './QuizHistory.css';
import RetakeHistory from '../components/RetakeHistory';
import AttemptHeatmap from '../components/AttemptHeatmap';
import ProgressChart from '../components/ProgressChart';

import TopicMasteryChart from '../components/TopicMasteryChart';

import QuizCard from '../components/QuizCard';
import ExportCSV from '../components/ExportCSV';

const QuizHistory = () => {
  const [attempts, setAttempts] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserIdFromToken();
        const data = await getQuizHistoryByUserId(userId);
        setAttempts(data || []);
      } catch (err) {
        console.error('Error loading quiz history:', err);
        setError('Failed to load quiz history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalQuizzes = attempts.length;

  const averageScore = totalQuizzes > 0
    ? (attempts.reduce((acc, a) => acc + a.score, 0) / totalQuizzes).toFixed(2)
    : 0;

  const highestScore = totalQuizzes > 0
    ? Math.max(...attempts.map(a => a.score))
    : 0;

  const uniqueTitles = [...new Set(attempts.map(a => a.quizId.title))];

  const sortedAttempts = [...attempts].sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );

  const filteredAttempts = selectedTitle === 'All'
    ? sortedAttempts
    : sortedAttempts.filter(a => a.quizId.title === selectedTitle);

  if (loading) return <p>Loading quiz history...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-history-page">
      <h2>Your Quiz History</h2>

      {/* 🔍 Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="quiz-filter">Filter by Quiz Title:</label>
        <select
          id="quiz-filter"
          onChange={(e) => setSelectedTitle(e.target.value)}
          value={selectedTitle}
        >
          <option value="All">All</option>
          {uniqueTitles.map(title => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>

      {filteredAttempts.length > 0 && (
        <>

          <ExportCSV attempts={filteredAttempts} />
          <ProgressChart attempts={filteredAttempts} />
          <TopicMasteryChart attempts={filteredAttempts} />
          <AttemptHeatmap attempts={filteredAttempts} />
          <RetakeHistory attempts={filteredAttempts} />
        </>
      )}

      <div className="quiz-history-container">
        {filteredAttempts.map(({ _id, quizId, score, total, submittedAt }) => (
          <QuizCard
            key={_id}
            quizId={quizId}
            score={score}
            total={total}
            submittedAt={submittedAt}
          />
        ))}
        <div className="quiz-summary">
          <p><strong>Total Quizzes Taken:</strong> {totalQuizzes}</p>
          <p><strong>Average Score:</strong> {averageScore}</p>
          <p><strong>Highest Score:</strong> {highestScore}</p>
        </div>
        <div className="summary-stats">
          <p><strong>Total Quizzes:</strong> {totalQuizzes}</p>
          <p><strong>Average Score:</strong> {averageScore}</p>
          <p><strong>Highest Score:</strong> {highestScore}</p>
        </div>
      </div>
    </div>

  );
};

export default QuizHistory;
