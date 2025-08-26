// src/utils/passwordStrength.js
import { isStrongPassword } from './validation';

export function getPasswordStrength(pwd) {
  if (pwd.length < 6) return 'Weak';
  if (isStrongPassword(pwd)) return 'Strong';
  return 'Medium';
}