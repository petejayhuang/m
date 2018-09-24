const errors = (state, action) => {
  if (action.error) {
    // log to error service
    console.log('ERROR', action.error)
  }
  return state
}

export default errors
