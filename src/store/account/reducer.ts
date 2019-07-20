import * as accounts from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { AccountState } from "./types";

const defaultState: AccountState = {
  accounts: []
}

export default (state = defaultState, action: ActionType<typeof accounts>): AccountState => {
  switch (action.type) {
    case getType(accounts.fetchAccounts.success):
      return {
        ...state,
        accounts: action.payload
      }
    default:
      return state;
  }
};
