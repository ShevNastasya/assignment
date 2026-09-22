import { NewTaskInput, Task } from './types';

const BASE_URL = 'http://localhost:3001';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) {
    throw new Error(`Failed to fetch tasks (${res.status})`);
  }
  return res.json();
}

export async function createTask(input: NewTaskInput): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, createdAt: new Date().toISOString() }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create task (${res.status})`);
  }
  return res.json();
}

export async function updateTask(id: string, updates: Partial<NewTaskInput>): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error(`Failed to update task (${res.status})`);
  }
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Failed to delete task (${res.status})`);
  }
}
