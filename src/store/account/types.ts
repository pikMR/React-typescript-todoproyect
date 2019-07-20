export interface Account {
  id: number,
  correo:string,
  description: string,
  taskIds: number[],
  pic: string,
  tags: string[],
  rol: string,
  dateUpdate: string
}

export interface AccountState {
  accounts: Account[];
}
