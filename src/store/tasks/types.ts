export interface Task {
  id: number,
  name: string,
  profilePic: string,
  twitter: string,
  login: string,
  location: string,
  email: string,
  phone: string
}

export interface TaskState {
  tasks: Task[]
}
