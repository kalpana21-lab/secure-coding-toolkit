// frontend/src/pages/LessonPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchLessons } from '../services/lessonService';

const LessonPage = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchLessons().then(setLessons).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Secure Coding Lessons</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>{lesson.title} - {lesson.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default LessonPage;