import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import causeReducer from './causeReducer';
import postReducer from './postReducer';

export default combineReducers({
  authentication: authenticationReducer,
  cause: causeReducer,
  post: postReducer
});
