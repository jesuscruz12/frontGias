// src/utils/passwordUtils.js
const commonPatterns = ['123', '123456', 'qwerty', 'password', 'abc123', '111111', 'aaa', 'qqq'];

export const checkPasswordStrength = (password) => {
  let strength = 0;
  const suggestions = [];

  if (password.length >= 8) strength++;
  else suggestions.push('Debe tener al menos 8 caracteres');

  if (/[A-Z]/.test(password)) strength++;
  else suggestions.push('Debe incluir al menos una letra mayúscula');

  if (/[a-z]/.test(password)) strength++;
  else suggestions.push('Debe incluir al menos una letra minúscula');

  if (/[0-9]/.test(password)) strength++;
  else suggestions.push('Debe incluir al menos un número');

  if (/[\W]/.test(password)) strength++;
  else suggestions.push('Debe incluir al menos un carácter especial');

  if (commonPatterns.some((pattern) => password.toLowerCase().includes(pattern))) {
    strength = 1;
    suggestions.push('No debe contener patrones secuenciales como "12345" o "qwerty"');
  }

  return { strength, suggestions };
};
