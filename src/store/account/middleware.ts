import * as account from './actions';
import { Account, AccountState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchAccountMiddleware: Middleware<{}, AccountState> = ({ getState }) => next => async (action: ActionType<typeof account>) => {
  next(action);

  if (action.type != getType(account.updateAccount)) {
    return;
  }

  next(account.fetchAccount.request());
  try {
    const response = await fetch('/data/accountadmin.json');
    const sessionList: Account = await response.json();
    next(account.fetchAccount.success(sessionList));
  } catch (e) {
    next(account.fetchAccount.failure(e));
  }
};
