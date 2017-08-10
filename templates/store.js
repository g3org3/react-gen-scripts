import { applyMiddleware, createStore, compose } from 'redux'

import logger from 'redux-logger'
import freeze from 'redux-freeze'
// import thunk from 'redux-thunk'
// import promise from 'redux-promise-middleware'

import reducer from '../ducks'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(
  // promise(),
  // thunk,
  freeze,
  logger,
))

export default createStore(reducer,middleware)