import * as accounts from './actions';
import { Account, AccountState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchAccountMiddleware: Middleware<{}, AccountState> = ({ getState }) => next => async (action: ActionType<typeof accounts>) => {
  next(action);
  if (action.type != getType(accounts.updateAccounts)) {
    return;
  }

  next(accounts.fetchAccounts.request());
  try {
    const response = await fetch('/data/accountadmin.json');
    const accountList: Account[] = await response.json();
    next(accounts.fetchAccounts.success(accountList));
  } catch (e) {
    next(accounts.fetchAccounts.failure(e));
  }
};
