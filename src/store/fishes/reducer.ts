import * as users from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { FishState } from './types';

const defaultState: FishState = {
  searchText: '',
  tagFilters: [],
  users: [],
  favoriteFishes: []
}

export default (state = defaultState, action: ActionType<typeof users>): FishState => {
  switch (action.type) {
  case getType(users.setSearchText):
    return {
      ...state,
      searchText: action.payload
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
    const updatedFavoriteFishes = state.favoriteFishes.concat(action.payload).reduce((updatedList, item) => {
        if (updatedList.indexOf(item) === -1) {
          updatedList.push(item);
        }
        return updatedList;
      }, <number[]>[])
    return {
      ...state,
      favoriteFishes: updatedFavoriteFishes
    };
  case getType(users.removeFavorite):
    return {
      ...state,
      favoriteFishes: state.favoriteFishes.filter(fid => fid !== action.payload)
    };
  case getType(users.updateFavoriteFilter):
    return {
      ...state,
      favoriteFishes: action.payload
    };
  case getType(users.fetchFishes.success):
    return {
      ...state,
      users: action.payload
    }
  default:
    return state;
  }
}
