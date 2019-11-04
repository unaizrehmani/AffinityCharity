import { CREATE_CAUSE } from '../actions/cause';

const causeReducer = function(
  state = {
    name: undefined,
    location: undefined,
    description: undefined
  },
  { type, payload }
) 
{
  switch (type) {
    case CREATE_CAUSE:
      return {
        ...state,
        ...{
          isLoggedIn: payload.token ? true : false,
          title: payload.title,
          location: payload.location,
          description: payload.description,
          image: payload.image,
          userToken: payload.token
        }
      };
    default:
      return state;
  }
};

export default causeReducer;
