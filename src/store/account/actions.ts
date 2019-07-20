import { createAction, createAsyncAction } from 'typesafe-actions';
import { Account } from './types';

export const fetchAccounts = createAsyncAction(
  'accounts/FETCH_REQUEST',
  'accounts/FETCH_SUCCESS',
  'accounts/FETCH_FAILURE'
)<void, Account[], Error>();

export const updateAccounts = createAction('accounts/UPDATE_ACCOUNTS', resolve =>
  () => resolve()
);

export const editAccount = createAction('accounts/EDIT_ACCOUNT', resolve =>
  (account: Account) => resolve(account)
);
