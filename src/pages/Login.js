//C:\Users\KALPNA\Desktop\secure-coding-dashboard\frontend-clean\src\pages\Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecureInput from '../components/SecureInput';
import api from '../services/api';
import '../style/global.css'; // ✅ Import your CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed. Check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <SecureInput
          id="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
        />
      </div>

      <div className="form-group">
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