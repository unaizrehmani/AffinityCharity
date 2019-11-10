import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import causeReducer from './causeReducer';

export default combineReducers({
  authentication: authenticationReducer,
  cause: causeReducer
});
