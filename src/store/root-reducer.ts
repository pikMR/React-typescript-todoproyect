import { combineReducers } from 'redux';

import locations from './locations/reducer';
import users from './users/reducer';
import tasks from './tasks/reducer';

const rootReducer = combineReducers({
  locations,
  users,
  tasks
});

export default rootReducer;
