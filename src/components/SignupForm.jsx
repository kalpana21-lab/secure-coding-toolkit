//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\components\SignupForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/signup', formData);
      console.log('Signup successful:', data);
      localStorage.setItem('token', data.token);
      setMessage(`Welcome, ${data.name}!`);
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={signup}>
      <h2>Signup</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignupForm;