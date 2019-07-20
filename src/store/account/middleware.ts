import * as accounts from './actions';
import { Account, AccountState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchAccountMiddleware: Middleware<{}, AccountState> = ({ getState }) => next => async (action: ActionType<typeof accounts>) => {
  debugger
  console.log("1............ fetchAccountMiddleware .........");
  next(action);
  //#3.1
  if (action.type != getType(accounts.updateAccounts)) {
    return;
  }

  next(accounts.fetchAccounts.request());
  try {
    console.log("22............ fetchAccountMiddleware .........");
    //#3.3
    const response = await fetch('/data/accountadmin.json');
    const accountList: Account[] = await response.json();
    next(accounts.fetchAccounts.success(accountList));
  } catch (e) {
    console.log("3............ fetchAccountMiddleware .........");
    //#3.4
    next(accounts.fetchAccounts.failure(e));
  }
};
