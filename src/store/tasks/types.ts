export interface Task {
  id: number,
  name: string,
  profilePic: string,
  twitter: string,
  about: string,
  location: string,
  email: string,
  phone: string
}

export interface TaskState {
  tasks: Task[]
}
