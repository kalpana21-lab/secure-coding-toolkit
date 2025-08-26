// src/components/SecureTextInput.jsx
import React, { useState } from 'react';

function SecureTextInput({ label, maxLength = 100, onChange }) {
  const [value, setValue] = useState('');

  const sanitize = (input) => {
    return input.replace(/[<>]/g, ''); // Basic XSS prevention
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const clean = sanitize(raw).slice(0, maxLength);
    setValue(clean);
    onChange && onChange(clean);
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={`Max ${maxLength} chars`}
      />
    </div>
  );
}

export default SecureTextInput;