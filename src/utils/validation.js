// src/utils/validation.js
export function sanitizeInput(input) {
  return input.replace(/[<>]/g, '');
}

export function isStrongPassword(pwd) {
  return pwd.length >= 8 &&
         /[A-Z]/.test(pwd) &&
         /[a-z]/.test(pwd) &&
         /[0-9]/.test(pwd) &&
         /[^A-Za-z0-9]/.test(pwd);
}