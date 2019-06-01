export interface User {
    id: number,
    name: string,
    pic: string,
    description: string,
    branchIds: number[],
    tags: string[]
  }

  export interface UserState {
    searchText: string;
    tagFilters: string[];
    users: User[];
    favoriteUsers: number[];
  }

  export interface UserGroup {
    users: User[]
  }
