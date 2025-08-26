// src/components/LessonCard.js
import React from 'react';
import './LessonCard.css';

const LessonCard = ({ title, description, onClick }) => (
  <div className="lesson-card" onClick={onClick}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default LessonCard;