//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\pages\AdminQuizManager.jsx
import React, { useState, useEffect } from 'react';
import { getAllQuizzes, createQuiz, deleteQuiz } from '../services/adminService';
import './AdminQuizManager.css';
import QuizPreviewModal from '../components/QuizPreviewModal';
import FeedbackSummary from '../components/FeedbackSummary';
import { fetchQuizById } from '../services/quizService';



const AdminQuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data || []);
      } catch (err) {
        setError('Failed to load quizzes.');
      }
    };
    fetchQuizzes();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      const created = await createQuiz({ title: newTitle });
      setQuizzes([...quizzes, created]);
      setNewTitle('');
    } catch (err) {
      setError('Failed to create quiz.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuiz(id);
      setQuizzes(quizzes.filter(q => q._id !== id));
    } catch (err) {
      setError('Failed to delete quiz.');
    }
  };
  const handleSelectQuiz = async (quiz) => {
    try {
      const fullQuiz = await fetchQuizById(quiz._id); // gets questions too
      setSelectedQuiz(fullQuiz);
    } catch (err) {
      setError('Failed to load quiz details.');
    }
  };

  return (
    <div className="admin-quiz-manager">
      <h2>Admin Quiz Manager</h2>

      <div className="create-section">
        <input
          type="text"
          placeholder="New quiz title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Create Quiz</button>
      </div>

      {error && <p className="error">{error}</p>}

      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            {quiz.title}
            <button onClick={() => handleSelectQuiz(quiz)}>Preview</button>
            <button onClick={() => handleDelete(quiz._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ul>
        {quizzes.map((quiz) => (
          <div key={quiz._id}>
            <h3>{quiz.title}</h3>
            {/* other quiz details */}
          </div>
        ))}
      </ul>
      {selectedQuiz && (
        <QuizPreviewModal
          quiz={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
        />
      )}
      {selectedQuiz?.questions && (
        <FeedbackSummary
          quizId={selectedQuiz._id}
          questions={selectedQuiz.questions}
        />
      )}
    </div>
  );
};

export default AdminQuizManager;