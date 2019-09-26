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
          user: payload.username,
          userToken: payload.token
        }
      };
    default:
      return state;
  }
};

export default authenticationReducer;
