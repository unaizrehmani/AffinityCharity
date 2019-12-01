import axios from '../../../node_modules/axios/index';

// Types
export const GET_EMAILS = 'GET_EMAILS';
export const GET_EMAILS_BEGIN = 'GET_EMAILS_BEGIN';
export const GET_EMAILS_SUCCESS = 'GET_EMAILS_SUCCESS';
export const GET_EMAILS_FAILURE = 'GET_EMAILS_FAILURE';

const { URL } = require('../../util/baseURL');

// Action Creators
export function getEmails(id) {
  return async dispatch => {
    dispatch(getEmailsBegin());
    try {
      const request = await axios.get(`${URL}/api/email/${id}`);
      dispatch(getEmailsSuccess(request.data));
      return request;
    } catch (error) {
      dispatch(getEmailsFailure(error));
      return error;
    }
  };
}

// Helpers

const getEmailsBegin = () => ({
  type: GET_EMAILS_BEGIN
});

const getEmailsSuccess  = data => ({
  type: GET_EMAILS_SUCCESS,
  payload: { data }
});

const getEmailsFailure  = error => ({
  type: GET_EMAILS_FAILURE,
  payload: { error }
});
