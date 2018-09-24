import { combineReducers } from 'redux'
import apps from './apps'
import auth from './auth'
import ui from './ui'

const reducers = combineReducers({
  apps,
  auth,
  ui
})

export default reducers
