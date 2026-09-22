import { FormEvent, useState } from 'react';
import { NewTaskInput, Task, TaskStatus } from '../types';

interface Props {
  initialTask: Task | null;
  onSubmit: (input: NewTaskInput) => void;
  onCancel: () => void;
}

const STATUS_OPTIONS: TaskStatus[] = ['Open', 'In Progress', 'Done'];

export function TaskForm({ initialTask, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? 'Open');
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError(null);
    onSubmit({ title: title.trim(), description: description.trim(), status });
  };

  return (
    <div className="modal-overlay" data-testid="task-form-modal">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>{initialTask ? 'Edit Task' : 'New Task'}</h2>

        <label htmlFor="form-title-input">Title</label>
        <input
          id="form-title-input"
          data-testid="form-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && (
          <p data-testid="title-error" className="error">
            {titleError}
          </p>
        )}

        <label htmlFor="form-description-input">Description</label>
        <textarea
          id="form-description-input"
          data-testid="form-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="form-status-select">Status</label>
        <select
          id="form-status-select"
          data-testid="form-status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="form-actions">
          <button type="button" data-testid="form-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" data-testid="form-submit-btn" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
