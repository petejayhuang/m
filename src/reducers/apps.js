import { FETCH_ALL_APPS_SUCCESS } from '../actions/types'

const INITIAL_STATE = []

const userAppsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_APPS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default userAppsReducer
