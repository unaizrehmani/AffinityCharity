export const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://social-charity-server.herokuapp.com';
