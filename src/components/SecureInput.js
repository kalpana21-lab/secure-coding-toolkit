// src/components/SecureInput.js
import React from 'react';
import DOMPurify from 'dompurify';

const SecureInput = ({ value, onChange, ...props }) => {
  const handleChange = (e) => {
    const sanitized = DOMPurify.sanitize(e.target.value);
    onChange(sanitized);
  };

  return <input value={value} onChange={handleChange} {...props} />;
};

export default SecureInput;