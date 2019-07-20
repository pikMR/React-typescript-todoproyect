import { createAction, createAsyncAction } from 'typesafe-actions';
import { Account } from './types';

export const fetchAccounts = createAsyncAction(
  'accounts/FETCH_REQUEST',
  'accounts/FETCH_SUCCESS',
  'accounts/FETCH_FAILURE'
)<void, Account[], Error>();

export const updateAccounts = createAction('accounts/UPDATE_ACCOUNTS', resolve =>
// #2
  () => resolve()
);

export const editAccount = createAction('accounts/EDIT_ACCOUNT', resolve =>
// #2
  (account: Account) => resolve(account)
);
