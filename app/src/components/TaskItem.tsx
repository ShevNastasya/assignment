import { Task, TaskStatus } from '../types';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const STATUS_OPTIONS: TaskStatus[] = ['Open', 'In Progress', 'Done'];

export function TaskItem({ task, onEdit, onDelete, onStatusChange }: Props) {
  return (
    <li className="task-item" data-testid={`task-item-${task.id}`}>
      <div className="task-info">
        <span data-testid="task-title" className="task-title">
          {task.title}
        </span>
        <p data-testid="task-description" className="task-description">
          {task.description}
        </p>
      </div>

      <span
        data-testid="task-status-badge"
        className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}
      >
        {task.status}
      </span>

      <select
        data-testid="task-status-select"
        className="status-select"
        aria-label={`Change status for ${task.title}`}
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="task-actions">
        <button data-testid="task-edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button data-testid="task-delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
