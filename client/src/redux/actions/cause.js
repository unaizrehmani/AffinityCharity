import axios from '../../../node_modules/axios/index';

// Types
export const CREATE_CAUSE = 'CREATE_CAUSE';
export const CREATE_CAUSE_BEGIN = 'CREATE_CAUSE_BEGIN';
export const CREATE_CAUSE_SUCCESS = 'CREATE_CAUSE_SUCCESS';
export const CREATE_CAUSE_FAILURE = 'CREATE_CAUSE_FAILURE';

export const GET_CAUSES = 'GET_CAUSES';
export const GET_CAUSES_BEGIN = 'GET_CAUSES_BEGIN';
export const GET_CAUSES_SUCCESS = 'GET_CAUSES_SUCCESS';
export const GET_CAUSES_FAILURE = 'GET_CAUSES_FAILURE';

const { URL } = require('../../util/baseURL');

// Action Creators
export function createCause(formData, userToken) {
  var config = {
    headers: {
      Authorization: 'Bearer ' + userToken,
      'Content-Type': 'multipart/form-data'
    }
  };

  return async dispatch => {
    dispatch(createCauseBegin());
    try {
      const request = await axios.post(`${URL}/api/causes`, formData, config);
      dispatch(createCauseSuccess(request.data));
      return request;
    } catch (error) {
      dispatch(createCauseFailure(error));
      return error;
    }
  };
}

export function getCauses() {
  return async dispatch => {
    dispatch(getCausesBegin());
    try {
      const request = await axios.get(`${URL}/api/causes`);
      dispatch(getCausesSuccess(request.data));
      return request;
    } catch (error) {
      dispatch(getCausesFailure(error));
      return error;
    }
  };
}

// Helpers
const createCauseBegin = () => ({
  type: CREATE_CAUSE_BEGIN
});

const createCauseSuccess = data => ({
  type: CREATE_CAUSE_SUCCESS,
  payload: { data }
});

const createCauseFailure = error => ({
  type: CREATE_CAUSE_FAILURE,
  payload: { error }
});

const getCausesBegin = () => ({
  type: GET_CAUSES_BEGIN
});

const getCausesSuccess = data => ({
  type: GET_CAUSES_SUCCESS,
  payload: { data }
});

const getCausesFailure = error => ({
  type: GET_CAUSES_FAILURE,
  payload: { error }
});
