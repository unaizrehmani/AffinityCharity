import axios from '../../../node_modules/axios/index'

// Types
export const CREATE_CAUSE = 'CREATE_CAUSE'
export const CREATE_CAUSE_BEGIN = 'CREATE_CAUSE_BEGIN'
export const CREATE_CAUSE_SUCCESS = 'CREATE_CAUSE_SUCCESS'
export const CREATE_CAUSE_FAILURE = 'CREATE_CAUSE_FAILURE'

// Action Creators
export function createCause(cause, userToken) {
    console.log(userToken)
    var config = {
        headers: {
            'Authorization' : "Bearer " + userToken,
            'Content-Type' : 'application/json'
        }
    }

    return async dispatch => {
      dispatch(createCauseBegin())
      try {
        const request = await axios.post(
          'https://social-charity-server.herokuapp.com/api/causes', 
            cause,
            config
          )
          dispatch(createCauseSuccess(request.data))
          console.log(request)
          console.log(request.data)
          return request
      } catch (error) {
        dispatch(createCauseFailure(error))
        return error
      }
    }
  }

  // Helpers
const createCauseBegin = () => ({
    type: CREATE_CAUSE_BEGIN
  })
  
  const createCauseSuccess = data => ({
    type: CREATE_CAUSE_SUCCESS,
    payload: { data }
  })
  
  const createCauseFailure = error => ({
    type: CREATE_CAUSE_FAILURE,
    payload: { error }
  })
