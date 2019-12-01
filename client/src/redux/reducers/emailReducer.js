import {
    GET_EMAILS_BEGIN,
    GET_EMAILS_SUCCESS,
    GET_EMAILS_FAILURE
  } from '../actions/email';
  
  const initialState = {
    isGettingEmails: false,
    getEmailsError: undefined,
    emails: []
  };
  
  const emailReducer = function(state = initialState, { type, payload }) {
    switch (type) {
      case GET_EMAILS_BEGIN:
        return {
          ...state,
          ...{ isGettingEmails: true, getEmailsError: undefined }
        };
      case GET_EMAILS_SUCCESS:
        return {
          ...state,
          ...{
            isGettingEmails: false,
            getEmailsError: undefined,
            emails: payload.data
          }
        };
      case GET_EMAILS_FAILURE:
        return {
          ...state,
          ...{
            isGettingEmails: false,
            getEmailsError: payload.error,
            emails: []
          }
        };
      default:
        return state;
    }
  };
  
  export default emailReducer;
  