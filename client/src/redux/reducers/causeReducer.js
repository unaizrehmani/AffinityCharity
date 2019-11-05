import {
  CREATE_CAUSE_BEGIN,
  CREATE_CAUSE_SUCCESS,
  CREATE_CAUSE_FAILURE,
  GET_CAUSES_BEGIN,
  GET_CAUSES_SUCCESS,
  GET_CAUSES_FAILURE
} from '../actions/cause';

const initialState = {
  isCreatingCause: false,
  isGettingCauses: false,
  getCausesError: undefined,
  createCauseError: undefined,
  cause: undefined,
  causes: []
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
          cause: payload.data
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
          getCausesError: payload.error
        }
      };
    default:
      return state;
  }
};

export default causeReducer;
