//C:\Users\KALPNA\Desktop\secure-coding-dashboard\frontend\src\components\QuizEditor.jsx
import React, { useState, useEffect } from 'react';
import './QuizEditor.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveQuiz } from '../services/quizService';
import { validateQuiz } from '../utils/validateQuiz';
import QuestionEditor from '../components/QuestionEditor';
import QuizPreviewModal from '../components/QuizPreviewModal';

const QuizEditor = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showPreview]);
  const handlePreview = () => {
    const error = validateQuiz(title, questions);
    if (error) {
      toast.error(error);
      return;
    }
    setShowPreview(true);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    const error = validateQuiz(title, questions);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const response = await saveQuiz({ title, questions });
      console.log('Quiz saved:', response);

      toast.success('Quiz saved successfully!');
      setTitle('');
      setQuestions([]);
    } catch (err) {
      toast.error('Failed to save quiz.');
    }
  };

  return (
    <div className="quiz-editor">
      <h2>Create/Edit Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, qIndex) => (
        <QuestionEditor
          key={qIndex}
          question={q}
          qIndex={qIndex}
          updateQuestion={updateQuestion}
          updateOption={updateOption}
          addOption={addOption}
          removeOption={removeOption}
          deleteQuestion={deleteQuestion}
        />
      ))}
      {showPreview && (
        <QuizPreviewModal
          title={title}
          questions={questions}
          onClose={() => setShowPreview(false)}
          handleConfirmSave={handleSubmit}
        />
      )}


      <button onClick={handlePreview}>Preview Quiz</button>
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Save Quiz</button>
    </div>
  );
};

export default QuizEditor;