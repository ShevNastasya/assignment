import { test, expect } from '@playwright/test';
import { TaskManagerPage } from '../pages/TaskManagerPage';
import { faker } from '@faker-js/faker';
import { API_URL } from '../api/api-config';

test.describe('Task management', () => {
  test('displays the seeded list of tasks', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await expect(taskManager.taskRow('Write report')).toBeVisible();
    await expect(taskManager.taskRow('Buy groceries')).toBeVisible();
  });

  // added name randomizer to be able to get unique test name for clean up part
  test.describe('Task creation', () => {
    const alphaNumeric = faker.string.alphanumeric(8);
    const taskName = `Prepare demo ${alphaNumeric}`;
    test('creates a new task', async ({ page }) => {
      const taskManager = new TaskManagerPage(page);
      await taskManager.goto();

      await taskManager.createTask(taskName, 'Set up the environment for the client demo', 'Open');
      await expect(taskManager.taskStatusBadge(taskName)).toHaveText('Open');
    });

    // added afterEach hook to clean up created tasks since it creates dublicates with each run and fails test
    test.afterEach(async ({ request }) => {
      const response = await request.get(`${API_URL}/tasks`);
      const tasks = await response.json();

      const taskToDelete = tasks.find(
        (task: { id: string; title: string }) => task.title === taskName
      );

      if (taskToDelete) {
        await request.delete(`${API_URL}/tasks/${taskToDelete.id}`);
      }
    });
  });

  test('edits an existing task', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await taskManager.editTask('Fix login bug', {
      description: 'Users cannot log in using SSO providers.',
      status: 'In Progress',
    });

    await expect(taskManager.taskStatusBadge('Fix login bug')).toHaveText('In Progress');
    await expect(taskManager.taskRow('Fix login bug')).toContainText('Users cannot log in using SSO providers.');
  });

  test('deletes a task', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await taskManager.createTask('Temporary task', 'This task will be deleted', 'Open');
    await taskManager.deleteTask('Temporary task');
  });
});
