export const URL =
  process.env.REACT_APP_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://social-charity-server.herokuapp.com';
