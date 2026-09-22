import { Task, TaskStatus } from '../types';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskList({ tasks, onEdit, onDelete, onStatusChange }: Props) {
  if (tasks.length === 0) {
    return <p data-testid="empty-state">No tasks found.</p>;
  }

  return (
    <ul data-testid="task-list" className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}
