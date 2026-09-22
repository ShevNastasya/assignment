export type TaskStatus = 'Open' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface NewTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
}
