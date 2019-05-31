import { combineReducers } from 'redux';

import locations from './locations/reducer';
import users from './fishes/reducer';
import branches from './branches/reducer';

const rootReducer = combineReducers({
  locations,
  users,
  branches
});

export default rootReducer;
