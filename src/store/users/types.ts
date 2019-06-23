export interface User {
    id: number,
    name: string,
    pic: string,
    description: string,
    taskIds: number[],
    tags: string[],
    rol: string
  }

  export interface UserState {
    searchText: string;
    tagFilters: string[];
    users: User[];
    favoriteUsers: number[];
    rolUser : string;
  }

  export interface UserGroup {
    users: User[]
  }
