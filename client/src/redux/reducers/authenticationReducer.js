import { LOGIN_USER } from "../actions/authentication";

const authenticationReducer = function (
  state = { isLoggedIn: false, user: undefined },
  { type, payload }
) {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        ...{
          isLoggedIn: true,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          isAdmin: payload.isAdmin,
          userToken: payload.token
        }
      };
    default:
      return state;
  }
};

export default authenticationReducer;
