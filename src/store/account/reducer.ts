import * as account from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { AccountState,Account } from "./types";

const defaultState: AccountState = {
    searchText: '',
    tagFilters: [],
    account: {
      id: 0,
      name: '',
      pic: '',
      description: '',
      taskIds: [],
      tags: [],
      rol: '',
      correo:''
    }
}

export type AccountAction = ActionType<typeof account>;

export default (state = defaultState, action: AccountAction):
AccountState => {
  switch (action.type) {
    /*case getType(action.fetchAccount):
      return {
        ...state,
        account: action.payload
      }*/
    default:
      return state;
  }
};
