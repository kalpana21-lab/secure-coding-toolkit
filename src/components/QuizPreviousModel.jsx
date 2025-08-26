//C:\Users\KALPNA\Desktop\secure-coding-dashboard\frontend\src\components\QuizPreviousModel.jsx
import React, { useEffect, useState } from 'react';
import './QuizPreviewModal.css';
import { trackEvent } from '../utils/analytics';
import { updateQuiz } from '../services/quizService';
import { toast } from 'react-toastify';
import { submitFeedback } from '../services/feedbackService';

function QuizPreviewModal({ quiz, onClose }) {
  const [isLearnerView, setIsLearnerView] = useState(false);
  const [editableQuiz, setEditableQuiz] = useState(quiz);

  useEffect(() => {
    trackEvent('PreviewModalOpened', { quizId: quiz._id });
    setEditableQuiz(quiz); // Reset when modal opens
  }, [quiz]);

  const handleToggleView = () => {
    const nextView = !isLearnerView;
    setIsLearnerView(nextView);
    trackEvent('ToggleLearnerView', { quizId: quiz._id, isLearnerView: nextView });
  };

  const handleSave = async () => {
    try {
      await updateQuiz(editableQuiz._id, editableQuiz);
      trackEvent('QuizSaved', { quizId: editableQuiz._id });
      toast.success('Quiz updated successfully!');
      onClose();
    } catch (err) {
      trackEvent('QuizSaveFailed', { quizId: editableQuiz._id, error: err.message });
      toast.error('Failed to save changes.');
    }
  };

  const handleFeedback = async (questionIndex, type) => {
    const question = editableQuiz.questions[questionIndex];
    await submitFeedback({
      quizId: editableQuiz._id,
      questionId: question._id,
      feedbackType: type,
      timestamp: new Date().toISOString(),
    });

    trackEvent('FeedbackGiven', {
      quizId: editableQuiz._id,
      questionId: question._id,
      feedbackType: type,
    });
  };



  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!quiz) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">Edit Quiz</h2>
        <p><strong>Title:</strong> {editableQuiz.title}</p>
        <p><strong>Total Questions:</strong> {editableQuiz.questions.length}</p>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={editableQuiz.title}
            onChange={(e) =>
              setEditableQuiz({ ...editableQuiz, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={editableQuiz.description}
            onChange={(e) =>
              setEditableQuiz({ ...editableQuiz, description: e.target.value })
            }
          />
        </div>

        <ul className="question-list">
          {(editableQuiz.questions || []).map((q, i) => (
            <li key={i} className="question-item">
              <label><strong>Q{i + 1}:</strong> {q.prompt}</label>
              <ul className="choice-list">
                {q.choices.map((choice, idx) => (
                  <li key={idx}>
                    {isLearnerView ? (
                      <span className={idx === q.correctAnswer ? 'correct-choice' : ''}>
                        {choice}
                      </span>
                    ) : (
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) => {
                          const updated = [...editableQuiz.questions];
                          updated[i].choices[idx] = e.target.value;
                          setEditableQuiz({ ...editableQuiz, questions: updated });
                        }}
                        className={idx === q.correctAnswer ? 'correct-choice' : ''}
                      />
                    )}
                  </li>
                ))}
              </ul>
              <div className="feedback-buttons">
                <button onClick={() => handleFeedback(i, 'confusing')}>Confusing</button>
                <button onClick={() => handleFeedback(i, 'too_long')}>Too Long</button>
                <button onClick={() => handleFeedback(i, 'needs_rewording')}>Needs Rewording</button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={handleToggleView}>
          {isLearnerView ? 'Switch to Edit Mode' : 'Preview as Learner'}
        </button>

        <button onClick={onClose}>Close</button>
      </div>

      <div className="modal-actions">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default QuizPreviewModal;