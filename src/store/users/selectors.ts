import { UserState, User } from './types';

export function allTags(state: UserState) {
  return state.users
    .reduce((all, user) => all.concat(user.tags), <string[]>[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();
}

export function allFiltered(state: UserState) {
  let searchUsers = searchText(state.searchText);
  let searchTags = filterByTag(state.tagFilters);

  return state.users
    .filter(searchUsers)
    .filter(searchTags);
}

export function favoritesFiltered(state: UserState) {
  let searchUsers = searchText(state.searchText);
  let searchTags = filterByTag(state.tagFilters);

  function isFavorite(user: User) {
    return state.favoriteUsers.indexOf(user.id) !== -1;
  }

  return state.users
    .filter(isFavorite)
    .filter(searchUsers)
    .filter(searchTags);
}

function searchText(searchText: string) {
  if (!searchText) {
    return () => true;
  }
  const lowerSearchText = searchText.toLowerCase();
  return (user: User) => user.name.toLowerCase().indexOf(lowerSearchText) !== -1;
}

function filterByTag(tagFilters: string[]) {
  if (tagFilters.length === 0) {
    return () => true;
  }
  return (user: User) => (
    user.tags.some(userTagName => (
      tagFilters.some(tagName => tagName === userTagName)
    ))
  );
}
