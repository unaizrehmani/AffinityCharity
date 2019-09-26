// Types
export const LOGIN_USER = "LOGIN_USER";

// Action Creators
export function loginUser(data) {
  return {
    type: LOGIN_USER,
    payload: {
      firstName: data.firstName,
      lastName: data.lastName,
      isAdmin: data.isAdmin,
      email: data.email,
      token: data.token
    }
  };
}
