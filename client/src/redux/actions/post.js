import axios from '../../../node_modules/axios/index';

// Types
export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_BEGIN = 'GET_POSTS_BEGIN';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

const { URL } = require('../../util/baseURL');

// Action Creators
export function getPosts(id) {
  return async dispatch => {
    dispatch(getPostsBegin());
    try {
      const request = await axios.get(`${URL}/api/posts/${id}`);
      dispatch(getPostsSuccess(request.data));
      return request;
    } catch (error) {
      dispatch(getPostsFailure(error));
      return error;
    }
  };
}

// Helpers

const getPostsBegin = () => ({
  type: GET_POSTS_BEGIN
});

const getPostsSuccess  = data => ({
  type: GET_POSTS_SUCCESS,
  payload: { data }
});

const getPostsFailure  = error => ({
  type: GET_POSTS_FAILURE,
  payload: { error }
});
