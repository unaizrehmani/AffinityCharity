// Types
export const LOGIN_USER = "LOGIN_USER";

// Action Creators
export function loginUser(firstName, lastName, isAdmin, email, token) {
  return {
    type: LOGIN_USER,
    payload: {
      firstName: firstName,
      lastName: lastName,
      isAdmin: isAdmin,
      email: email,
      token: token
    }
  };
}
