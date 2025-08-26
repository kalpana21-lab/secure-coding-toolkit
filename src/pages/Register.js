// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecureInput from '../components/SecureInput';
import api from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    try {
      const response = await api.post('/auth/register', { email, password });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>

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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;