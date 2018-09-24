import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CHECK_ACCESS_TOKEN_VALID_SUCCESS,
  CHECK_ACCESS_TOKEN_VALID_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  tokenValid: false,
  loggedIn: false
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, loggedIn: true }
    case LOGIN_USER_FAILURE:
      return { ...state, loggedIn: false }
    case CHECK_ACCESS_TOKEN_VALID_SUCCESS:
      return { ...state, tokenValid: true }
    case CHECK_ACCESS_TOKEN_VALID_FAILURE:
      return { loggedIn: false, tokenValid: false }
    default:
      return state
  }
}

export default authReducer
