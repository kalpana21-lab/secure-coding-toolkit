//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\App.js
// Triggering final Netlify deploy to activate _redirects
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import QuizDashboard from './components/QuizDashboard';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SecureTextInput from './components/SecureTextInput';
import PasswordInput from './components/PasswordInput';
import CodeEditor from './components/CodeEditor';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import Dashboard from './pages/Dashboard';
import QuizHistory from './pages/QuizHistory';
import { ToastContainer } from 'react-toastify';
import QuizEditor from './components/QuizEditor';
import AdminQuizManager from './pages/AdminQuizManager';
import PreviewLearner from './pages/PreviewLearner';

function App() {
  const [secureText, setSecureText] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/lessons" element={<LessonPage />} />
        <Route path="/preview/:quizId" element={<PreviewLearner />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-dashboard"
          element={
            <ProtectedRoute>
              <QuizDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-quiz"
            element={
              <ProtectedRoute>
                <QuizEditor />
              </ProtectedRoute>
            }
        />

        <Route
          path="/admin/quizzes"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminQuizManager />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />

        <Route path="/history" element={<ProtectedRoute><QuizHistory /></ProtectedRoute>} />
      </Routes>

      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Secure Coding Toolkit</h1>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Secure Text Input</h2>
          <SecureTextInput
            label="Username"
            maxLength={50}
            onChange={setSecureText}
          />
          <p>Sanitized Value: <strong>{secureText}</strong></p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Password Input</h2>
          <PasswordInput onChange={setPassword} />
          <p>Entered Password: <strong>{password}</strong></p>
        </section>

        <section>
          <h2>Code Editor</h2>
          <CodeEditor value={code} onChange={setCode} />
          <p>Code Preview:</p>
          <pre>{code}</pre>
        </section>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;