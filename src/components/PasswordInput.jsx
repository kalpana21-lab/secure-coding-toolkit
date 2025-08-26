// src/components/PasswordInput.jsx
import React, { useState } from 'react';

function PasswordInput({ onChange }) {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  const toggleVisibility = () => setVisible(!visible);

  const getStrength = (pwd) => {
    if (pwd.length < 6) return 'Weak';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 'Strong';
    return 'Medium';
  };

  const handleChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    onChange && onChange(pwd);
  };

  return (
    <div>
      <label>Password</label>
      <input
        type={visible ? 'text' : 'password'}
        value={password}
        onChange={handleChange}
        placeholder="Enter secure password"
      />
      <button onClick={toggleVisibility}>
        {visible ? 'Hide' : 'Show'}
      </button>
      <p>Strength: {getStrength(password)}</p>
    </div>
  );
}

export default PasswordInput;