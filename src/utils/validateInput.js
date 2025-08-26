// src/utils/validateInput.js
export const validateInput = (input) => {
  const isValid = /^[a-zA-Z0-9\s.,!?]+$/.test(input);
  return isValid;
};