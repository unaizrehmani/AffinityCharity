import { CREATE_CAUSE_BEGIN, CREATE_CAUSE_SUCCESS, CREATE_CAUSE_FAILURE } from '../actions/cause';

const initialState = {
    isCreatingCause: false,
    createCauseError: undefined,
    cause: undefined,
    causes: []
}

const causeReducer = function( state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_CAUSE_BEGIN:
        return { 
            ...state, 
            ...{ isCreatingCause: true, createCauseError: undefined,} 
        }
      case CREATE_CAUSE_SUCCESS:
        return {
        ...state,
            ...{
              isCreatingCause: false,
              createCauseError: undefined,
              cause: payload.data,
            }
        }
      case CREATE_CAUSE_FAILURE:
        //set fetching to false, unload any past data and load error
        return {
          ...state,
          ...{
            isCreatingCause: false,
            createCauseError: payload.error,
          }
        }
    default:
      return state;
  }
};

export default causeReducer;
