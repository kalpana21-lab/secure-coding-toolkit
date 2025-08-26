// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecureInput from '../components/SecureInput';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Moved inside component

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;

      localStorage.setItem('token', token); // ✅ Store JWT securely
      alert('Login successful!');
      navigate('/dashboard'); // ✅ Single redirect

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed. Check your credentials and try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email">Email</label>
        <SecureInput
          id="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        <SecureInput
          id="password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
      </div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;