// src/pages/LessonPage.js
import React, { useState } from 'react';
import SecureInput from '../components/SecureInput';
import { validateInput } from '../utils/validateInput';

const LessonPage = () => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (validateInput(input)) {
      alert('Input is valid and secure!');
    } else {
      alert('Invalid input detected.');
    }
  };

  return (
    <div>
      <h2>Secure Lesson Input</h2>
      <SecureInput value={input} onChange={setInput} placeholder="Enter lesson name" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LessonPage;