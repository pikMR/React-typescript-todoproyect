import { createAction, createAsyncAction } from 'typesafe-actions';
import { Account } from './types';

export const fetchAccount = createAsyncAction(
  'account/FETCH_REQUEST',
  'account/FETCH_SUCCESS',
  'account/FETCH_FAILURE'
)<void, Account, Error>();

export const updateAccount = createAction('account/UPDATE_ACCOUNT', resolve =>
  (account: Account) => resolve(account)
);
