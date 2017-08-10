import { combineReducers } from 'redux'

// Reducers
import auth from './authReducer'
import appui from './appuiReducer'

export default combineReducers({
  auth,
  appui,
})