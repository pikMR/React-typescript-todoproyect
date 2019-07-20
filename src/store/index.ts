import { StateType } from 'typesafe-actions';
import { Middleware } from 'redux';

import rootReducer from './root-reducer';

import { fetchLocationsMiddleware } from './locations/middleware';
import { fetchUsersMiddleware } from './users/middleware';
import { fetchTasksMiddleware } from './tasks/middleware';
import { fetchAccountMiddleware } from './account/middleware';

import * as locationsSelectors from './locations/selectors';
import * as usersSelectors from './users/selectors';

import * as locationsActions from './locations/actions';
import * as usersActions from './users/actions';
import * as tasksActions from './tasks/actions';
import * as accountActions from './account/actions';

export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const selectors = {
  users: usersSelectors,
  locations: locationsSelectors
};

export const actions = {
  users: usersActions,
  locations: locationsActions,
  tasks: tasksActions,
  account: accountActions
};

export const middlewares: Middleware[] = [
  fetchLocationsMiddleware,
  fetchUsersMiddleware,
  fetchTasksMiddleware,
  fetchAccountMiddleware
]

export type RootState = StateType<typeof rootReducer>;
