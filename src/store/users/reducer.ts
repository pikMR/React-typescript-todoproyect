import * as users from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { UserState } from './types';

const defaultState: UserState = {
  searchText: '',
  tagFilters: [],
  users: [],
  favoriteUsers: [],
  rolUser : "default"
}

export default (state = defaultState, action: ActionType<typeof users>): UserState => {
  switch (action.type) {
  case getType(users.setSearchText):
    return {
      ...state,
      searchText: action.payload
    };
  case getType(users.setAuth):
    return{
      ...state,
      rolUser: state.rolUser
    };
  case getType(users.addTagFilter):
    const updatedTagFilters = state.tagFilters
      .concat(action.payload)
      .reduce((updatedList, item) => {
        if (!updatedList.indexOf(item)) {
          updatedList.push(item);
        }
        return updatedList;
      }, <string[]>[]);
    return {
      ...state,
    };
  case getType(users.removeTagFilter):
    return {
      ...state,
      tagFilters: state.tagFilters.filter(tn => tn !== action.payload)
    };
  case getType(users.updateTagFilters):
    return {
      ...state,
      tagFilters: action.payload
    };
  case getType(users.addFavorite):
    const updatedFavoriteUsers = state.favoriteUsers.concat(action.payload).reduce((updatedList, item) => {
        if (updatedList.indexOf(item) === -1) {
          updatedList.push(item);
        }
        return updatedList;
      }, <number[]>[])
    return {
      ...state,
      favoriteUsers: updatedFavoriteUsers
    };
  case getType(users.removeFavorite):
    return {
      ...state,
      favoriteUsers: state.favoriteUsers.filter(fid => fid !== action.payload)
    };
  case getType(users.updateFavoriteFilter):
    return {
      ...state,
      favoriteUsers: action.payload
    };
  case getType(users.fetchUsers.success):
    return {
      ...state,
      users: action.payload
    }
  default:
    return state;
  }
}
