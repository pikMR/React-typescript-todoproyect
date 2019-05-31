export interface Fish {
    id: number,
    name: string,
    pic: string,
    description: string,
    branchIds: number[],
    tags: string[]
  }

  export interface FishState {
    searchText: string;
    tagFilters: string[];
    users: Fish[];
    favoriteFishes: number[];
  }

  export interface FishGroup {
    users: Fish[]
  }
