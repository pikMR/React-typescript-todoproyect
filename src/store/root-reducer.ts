import { combineReducers } from 'redux';

import locations from './locations/reducer';
import users from './users/reducer';
import tasks from './tasks/reducer';
import account from './account/reducer';

const rootReducer = combineReducers({
  locations,
  users,
  tasks,
  account
});

export default rootReducer;
