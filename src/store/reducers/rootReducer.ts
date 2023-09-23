
import { combineReducers } from 'redux';
import advertisementsReducer from './advertisementsReducer';
import { profileReducer } from './userReducer';
import { API, graphqlOperation } from 'aws-amplify';

const rootReducer = combineReducers({
  advertisements: advertisementsReducer,
  profile: profileReducer,
});

export default rootReducer;
