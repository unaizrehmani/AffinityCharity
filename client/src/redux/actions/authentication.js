// Types
export const LOGIN_USER = "LOGIN_USER";

// Action Creators
export function loginUser(username, token) {
  return {
    type: LOGIN_USER,
    payload: {
      username: username,
      token
    }
  };
}
