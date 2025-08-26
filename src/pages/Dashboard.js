//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\pages\Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Add this
import LessonCards from '../components/LessonCards';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h2>Welcome to Secure Coding Toolkit</h2>
  <div>
    <button onClick={logout}>Logout</button>
    <Link to="/history"  style={{
      marginLeft: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '4px',
      textDecoration: 'none'
      }}>

      View Quiz History
    </Link>
  </div>
</header>

const Dashboard = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    api.get('/lessons')
      .then(res => setLessons(res.data))
      .catch(err => console.error('Failed to load lessons:', err));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome to Secure Coding Toolkit</h2>
        <button onClick={logout}>Logout</button>
      </header>

      {lessons.map((lesson) => (
        <LessonCards
          key={lesson._id}
          title={lesson.title}
          description={lesson.summary}
          onClick={() => window.location.href = `/lessons/${lesson._id}`}
        />
      ))}
    </div>
  );
};

export default Dashboard;