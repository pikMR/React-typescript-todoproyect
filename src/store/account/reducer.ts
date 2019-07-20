import * as accounts from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { AccountState } from "./types";

const defaultState: AccountState = {
  accounts: []
}

//export type AccountAction = ActionType<typeof accounts>;
// default (state = defaultState, action: AccountAction):

export default (state = defaultState, action: ActionType<typeof accounts>): AccountState => {
  //#4
  switch (action.type) {
    case getType(accounts.fetchAccounts.success):
            console.log("------> fetchAccounts.success | reducer.ts :D ACCOUNT");
      return {
        ...state,
        accounts: action.payload
      }
      // case getType(accounts.updateAccounts) :
      //     const updateAccounts = state.accounts.concat(action.payload);
      //     return {
      //         ...state,
      //         accounts: updateAccounts
      //     }
    default:
          console.log("------> default reducer.ts :D ACCOUNT");
      return state;
  }
};
