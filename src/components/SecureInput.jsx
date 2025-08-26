// frontend/src/components/SecureInput.jsx
import React from 'react';

const SecureInput = ({ value, onChange, ...props }) => {
  const sanitize = (val) => val.replace(/[<>]/g, '');

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => onChange(sanitize(e.target.value))}
    />
  );
};

export default SecureInput;