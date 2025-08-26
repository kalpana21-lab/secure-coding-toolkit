// frontend/src/components/FeedbackSummary.jsx
import React, { useEffect, useState } from 'react';
import { fetchFeedbackSummary } from '../services/feedbackService';
import { getAllQuizzes } from '../services/quizService';
import FeedbackChart from './FeedbackChart';

const FeedbackSummary = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [summary, setSummary] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Load quiz list for dropdown
  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await getAllQuizzes();
      setQuizzes(data);
    };
    loadQuizzes();
  }, []);

  // Load feedback summary when quiz is selected
  const fetchSummary = async () => {
    if (!selectedQuizId) return;
    const data = await fetchFeedbackSummary(selectedQuizId);
    setSummary(data.summary || []);
    setQuestions(data.questions || []);
  };

  const handleExport = () => {
    const rows = summary.map(s => {
      const confusing = s.feedback?.find(f => f.type === 'confusing')?.count || s.confusingCount || 0;
      const rewording = s.feedback?.find(f => f.type === 'needs rewording')?.count || s.rewordingCount || 0;
      return `${s._id},${confusing},${rewording}`;
    });

    const csv = ['QuestionID,Confusing,NeedsRewording', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedback_summary.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFeedbackCounts = (questionId) => {
    const entry = summary.find((s) => s._id === questionId);
    return entry?.feedback || [];
  };

  const averageHealthScore = summary.length
    ? summary.reduce((sum, s) => sum + (s.healthScore || 0), 0) / summary.length
    : 0;
  const scoreColor =
    averageHealthScore > 80 ? 'green' :
      averageHealthScore > 50 ? 'orange' : 'red';

  return (
    <div className="feedback-summary">
      <h3>Feedback Overview</h3>

      {/* Quiz Selector */}
      <select value={selectedQuizId} onChange={e => setSelectedQuizId(e.target.value)}>
        <option value="">Select a quiz</option>
        {quizzes.map(q => (
          <option key={q._id} value={q._id}>{q.title}</option>
        ))}
      </select>

      {/* Feedback List */}
      <h3 style={{ marginTop: '2rem' }}>Feedback Overview</h3>
      <ul style={{ paddingLeft: '1rem' }}>
        {questions.map((q, i) => {
          const feedback = getFeedbackCounts(q._id);
          const flagged = feedback.some(f => f.type === 'confusing' && f.count >= 3);

          return (
            <li key={q._id} className={flagged ? 'flagged' : ''}>
              <strong>Q{i + 1}:</strong> {q.prompt}
              <ul>
                {feedback.map((f, idx) => (
                  <li key={idx}>{f.type}: {f.count}</li>
                ))}
              </ul>
              {flagged && (
                <span className="flag" title="Marked due to high confusion feedback">
                  ⚠️ Needs Review
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {summary.length === 0 && (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>
          No feedback available for this quiz yet.
        </p>
      )}
      {/* Chart + Health Score */}
      <FeedbackChart summary={summary} />
      <p style={{ color: scoreColor, fontWeight: 'bold' }}>
        🧠 Average Health Score: {Math.round(averageHealthScore)}%
      </p>

      {/* Action Buttons */}
      <button onClick={fetchSummary} disabled={!selectedQuizId}>
        Load Summary
      </button>
      <button onClick={handleExport} disabled={summary.length === 0}>
        Export CSV
      </button>
    </div>
  );
};

export default FeedbackSummary;