import { combineReducers } from 'redux'

// Reducers
// import { default as auth } from './auth'
import { default as appui } from './appui'

// Actions & Types
// export * from './auth'
export * from './appui'

export default combineReducers({
  // auth,
  appui,
})