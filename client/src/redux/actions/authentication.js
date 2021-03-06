// Types
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action Creators
export function loginUser(firstName, lastName, isAdmin, email, token, id) {
  return {
    type: LOGIN_USER,
    payload: {
      firstName,
      lastName,
      isAdmin,
      email,
      token,
      id
    }
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: {}
  };
}
