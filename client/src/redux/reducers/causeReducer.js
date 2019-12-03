import {
  CREATE_CAUSE_BEGIN,
  CREATE_CAUSE_SUCCESS,
  CREATE_CAUSE_FAILURE,
  GET_CAUSES_BEGIN,
  GET_CAUSES_SUCCESS,
  GET_CAUSES_FAILURE,
  GET_USER_EMAIL_BEGIN,
  GET_USER_EMAIL_SUCCESS,
  GET_USER_EMAIL_FAILURE
} from '../actions/cause';

const initialState = {
  isCreatingCause: false,
  createCauseError: undefined,
  isGettingCauses: false,
  getCausesError: undefined,
  isGettingUserEmail: false,
  getUserEmailError: undefined,
  causes: [],
  email: undefined
};

const causeReducer = function(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_CAUSE_BEGIN:
      return {
        ...state,
        ...{ isCreatingCause: true, createCauseError: undefined }
      };
    case CREATE_CAUSE_SUCCESS:
      return {
        ...state,
        ...{
          isCreatingCause: false,
          createCauseError: undefined,
          causes: [...state.causes, payload.data]
        }
      };
    case CREATE_CAUSE_FAILURE:
      return {
        ...state,
        ...{
          isCreatingCause: false,
          createCauseError: payload.error
        }
      };
    case GET_CAUSES_BEGIN:
      return {
        ...state,
        ...{ isGettingCauses: true, getCausesError: undefined }
      };
    case GET_CAUSES_SUCCESS:
      return {
        ...state,
        ...{
          isGettingCauses: false,
          getCausesError: undefined,
          causes: payload.data
        }
      };
    case GET_CAUSES_FAILURE:
      return {
        ...state,
        ...{
          isGettingCauses: false,
          getCausesError: payload.error,
          causes: []
        }
      };
    case GET_USER_EMAIL_BEGIN:
      return {
        ...state,
        ...{ isGettingUserEmail: true, getUserEmailError: undefined }
      };
    case GET_USER_EMAIL_SUCCESS:
      return {
        ...state,
        ...{
          isGettingUserEmail: false,
          getUserEmailError: undefined,
          email: payload.data.email
        }
      };
    case GET_USER_EMAIL_FAILURE:
      return {
        ...state,
        ...{
          isGettingUserEmail: false,
          getUserEmailError: payload.error
        }
      };
    default:
      return state;
  }
};

export default causeReducer;
