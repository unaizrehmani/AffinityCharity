// Types
export const CREATE_CAUSE = 'CREATE_CAUSE';
export const CREATE_CAUSE_BEGIN = 'CREATE_CAUSE_BEGIN'
export const CREATE_CAUSE_SUCCESS = 'CREATE_CAUSE_SUCCESS'
export const CREATE_CAUSE_FAILURE = 'CREATE_CAUSE_FAILURE'

// Action Creators
export function createCause(cause, userToken) {
    let config = {
        headers: { 'Authorization' : "bearer " + userToken}
    }

    let bodyParameters = {
        name: cause.name,
        location: cause.location,
        description: cause.description,
        image: cause.image,
    }

    return async dispatch => {
      dispatch(createCauseBegin())
      try {
        await axios.post(
          'https://social-charity-server.herokuapp.com/api/causes', {
            bodyParameters,
            config
          }
        ).then((response) => {
            dispatch(createCauseSuccess(response.data))
            return response
        })
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
