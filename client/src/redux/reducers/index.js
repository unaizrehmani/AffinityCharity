import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import causeReducer from './causeReducer';
import emailReducer from './emailReducer';

export default combineReducers({
  authentication: authenticationReducer,
  cause: causeReducer,
  email: emailReducer
});
