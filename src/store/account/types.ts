export interface Account {
  id: number,
  name: string,
  pic: string,
  description: string,
  taskIds: number[],
  tags: string[],
  rol: string,
  correo:string
}

export interface AccountState {
  searchText: string;
  tagFilters: string[];
  account: Account;
}
