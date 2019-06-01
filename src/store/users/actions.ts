import { createAction, createAsyncAction } from 'typesafe-actions';
import { User } from './types';

export const fetchUsers = createAsyncAction(
  'users/FETCH_REQUEST',
  'users/FETCH_SUCCESS',
  'users/FETCH_FAILURE'
)<void, User[], Error>();

export const updateUsers = createAction('users/UPDATE_USERS', resolve =>
  () => resolve()
);

export const setSearchText = createAction('users/SET_SEARCH_TEXT', resolve =>
  (searchText: string) => resolve(searchText)
);

export const addTagFilter = createAction('users/ADD_TAG_FILTER', resolve =>
  (trackName: string) => resolve(trackName)
);

export const removeTagFilter = createAction('users/REMOVE_TAG_FILTER', resolve =>
  (trackName: string) => resolve(trackName)
);

export const updateTagFilters = createAction('users/UPDATE_TAG_FILTERS', resolve =>
  (trackNames: string[]) => resolve(trackNames)
);

export const addFavorite = createAction('users/ADD_FAVORITE', resolve =>
  (userId: number) => resolve(userId)
);

export const removeFavorite = createAction('users/REMOVE_FAVORITE', resolve =>
  (userId: number) => resolve(userId)
);

export const updateFavoriteFilter = createAction('users/UPDATE_FAVORITE_FILTER', resolve =>
  (userIds: number[]) => resolve(userIds)
);
