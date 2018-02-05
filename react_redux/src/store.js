import { createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import usersReducer from './reducers/users';
import UserProfile from './reducers/userProfile';

// STORE
export default createStore(
  combineReducers({
      usersReducer,
      UserProfile,
  }),
  applyMiddleware(
    logger,
    promise()
  )
);
