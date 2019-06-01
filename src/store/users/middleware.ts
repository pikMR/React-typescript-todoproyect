import * as users from './actions';
import { User, UserState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchUsersMiddleware: Middleware<{}, UserState> = ({ getState }) => next => async (action: ActionType<typeof users>) => {
  next(action);

  if (action.type != getType(users.updateUsers)) {
    return;
  }

  next(users.fetchUsers.request());
  try {
    const response = await fetch('/data/users.json');
    const userList: User[] = await response.json();
    next(users.fetchUsers.success(userList));
  } catch (e) {
    next(users.fetchUsers.failure(e));
  }
};
