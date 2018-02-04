import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/user';

// STORE
export default const createStore(
  userReducer,
  applyMiddleware(
    logger,
    promise()
  )
);
