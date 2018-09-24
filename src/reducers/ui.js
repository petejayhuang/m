const INITIAL_STATE = {
  requesting: {
    auth: false,
    users: false,
    apps: false
  }
}

const requestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default requestsReducer
