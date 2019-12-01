import {
    GET_POSTS_BEGIN,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE
  } from '../actions/post';
  
  const initialState = {
    isGettingPosts: false,
    getPostsError: undefined,
    posts: []
  };
  
  const postReducer = function(state = initialState, { type, payload }) {
    switch (type) {
      case GET_POSTS_BEGIN:
        return {
          ...state,
          ...{ isGettingPosts: true, getPostsError: undefined }
        };
      case GET_POSTS_SUCCESS:
        return {
          ...state,
          ...{
            isGettingPosts: false,
            getPostsError: undefined,
            posts: payload.data
          }
        };
      case GET_POSTS_FAILURE:
        return {
          ...state,
          ...{
            isGettingPosts: false,
            getPostsError: payload.error,
            posts: []
          }
        };
      default:
        return state;
    }
  };
  
  export default postReducer;
  