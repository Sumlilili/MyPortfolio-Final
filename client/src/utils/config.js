// Debug environment variables
console.log('Environment Variables Debug:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('All Vite env vars:', import.meta.env);

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log('Using API_BASE_URL:', API_BASE_URL);
