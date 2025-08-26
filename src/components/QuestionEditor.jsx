//C:\Users\KALPNA\Desktop\secure-coding-dashboard\frontend\src\components\QuestionEditor.jsx
import React from 'react';

const QuestionEditor = ({
  question,
  qIndex,
  updateQuestion,
  updateOption,
  addOption,
  removeOption,
  deleteQuestion,
}) => {
  return (
    <div className="question-block">
      <input
        type="text"
        placeholder={`Question ${qIndex + 1}`}
        value={question.text}
        onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
      />
      {question.options.map((opt, oIndex) => (
        <div key={oIndex}>
          <input
            type="text"
            placeholder={`Option ${oIndex + 1}`}
            value={opt}
            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
          />
          <input
            type="radio"
            name={`correct-${qIndex}`}
            checked={question.correctIndex === oIndex}
            onChange={() => updateQuestion(qIndex, 'correctIndex', oIndex)}
          />{' '}
          Correct
          <button onClick={() => removeOption(qIndex, oIndex)}>Remove</button>
        </div>
      ))}
      <button onClick={() => addOption(qIndex)}>Add Option</button>
      <button onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
    </div>
  );
};

export default QuestionEditor;