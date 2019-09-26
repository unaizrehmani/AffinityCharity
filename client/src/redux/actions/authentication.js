// Types
export const LOGIN_USER = "LOGIN_USER";

// Action Creators
export function loginUser(username, password) {
  return {
    type: LOGIN_USER,
    payload: {
      username: username,
      password: password
    }
  };
}
