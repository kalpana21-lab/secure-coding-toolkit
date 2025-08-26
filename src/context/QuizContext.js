// src/context/QuizContext.js
import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [progress, setProgress] = useState({ completed: [], score: 0 });

  return (
    <QuizContext.Provider value={{ progress, setProgress }}>
      {children}
    </QuizContext.Provider>
  );
};