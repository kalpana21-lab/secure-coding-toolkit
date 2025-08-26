import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', formData);
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      setMessage(`Welcome back, ${data.name}!`);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Log In</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;