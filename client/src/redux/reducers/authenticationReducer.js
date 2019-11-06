import { LOGIN_USER, LOGOUT_USER } from '../actions/authentication';

const authenticationReducer = function(
  state = {
    isLoggedIn: false,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    isAdmin: undefined,
    userToken: undefined,
    userID: undefined
  },
  { type, payload }
) {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        ...{
          isLoggedIn: payload.token ? true : false,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          isAdmin: payload.isAdmin,
          userToken: payload.token,
          userID: payload.id
        }
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...{
          isLoggedIn: false,
          email: undefined,
          firstName: undefined,
          lastName: undefined,
          isAdmin: undefined,
          userToken: undefined,
          userID: undefined
        }
      };
    default:
      return state;
  }
};

export default authenticationReducer;
