export const url = 'http://localhost:5000';

export function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer_${token}` };
}
