import { useEffect, useState } from 'react';
import { NewTaskInput, Task, TaskStatus } from './types';
import { createTask, deleteTask, fetchTasks, updateTask } from './api';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { SearchBar } from './components/SearchBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Unable to load tasks. Is the API server running on port 3001?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (input: NewTaskInput) => {
    await createTask(input);
    setIsFormOpen(false);
    await loadTasks();
  };

  const handleUpdate = async (id: string, input: NewTaskInput) => {
    await updateTask(id, input);
    setEditingTask(null);
    setIsFormOpen(false);
    await loadTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    await loadTasks();
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    await updateTask(id, { status });
    await loadTasks();
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <button
          data-testid="new-task-btn"
          className="btn btn-primary"
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(true);
          }}
        >
          + New Task
        </button>
      </header>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {error && (
        <p data-testid="error-message" className="error">
          {error}
        </p>
      )}
      {loading && <p data-testid="loading-message">Loading tasks...</p>}

      {!loading && !error && (
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => {
            setEditingTask(task);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      {isFormOpen && (
        <TaskForm
          initialTask={editingTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={(input) => {
            if (editingTask) {
              return handleUpdate(editingTask.id, input);
            }
            return handleCreate(input);
          }}
        />
      )}
    </div>
  );
}

export default App;
