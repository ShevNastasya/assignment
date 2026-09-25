import { test, expect } from '@playwright/test';
import { TaskManagerPage } from '../pages/TaskManagerPage';
import { faker } from '@faker-js/faker';
import { API_URL } from '../api/api-config';

test.describe('Task status', () => {
  test('marking a task as Done updates its status badge', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await taskManager.updateTaskStatus('Write report', 'Done');

    await expect(taskManager.taskStatusBadge('Write report')).toHaveText('Done');
  });

  test('marking a task as In Progress updates its status badge', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await taskManager.updateTaskStatus('Plan team offsite', 'In Progress');

    await expect(taskManager.taskStatusBadge('Plan team offsite')).toHaveText('In Progress');
  });

  //Potential test #2
  //Commending out this test since require more time to debug, sometimes cleaning hook is failing due to socket hang up
  // test.describe('Task list and scroll', () => {
  //   const taskNames = [
  //     `Task ${faker.string.alphanumeric(8)}`,
  //     `Task ${faker.string.alphanumeric(8)}`,
  //     `Task ${faker.string.alphanumeric(8)}`
  //   ];
  //   const lastTaskName = taskNames[2];
  //   test('can scroll to the last task', async ({ page }) => {
  //     const taskManager = new TaskManagerPage(page);
  //     await taskManager.goto();

  //     for (const taskName of taskNames) {
  //       await taskManager.createTask(
  //         taskName,
  //         'Test task description',
  //         'Open'
  //       );
  //     }

  //     // Scroll down the page
  //     await page.mouse.wheel(0, 1000);

  //     // cheking that last task is visible
  //     const lastTask = page.getByTestId('task-title').filter({ hasText: lastTaskName });
  //     await lastTask.scrollIntoViewIfNeeded();
  //     await expect(lastTask).toBeVisible();

  //   });

  //   test.afterEach(async ({ request }) => {
  //     const response = await request.get(`${API_URL}/tasks`);
  //     const tasks = await response.json();

  //     for (const taskName of taskNames) {
  //       const taskToDelete = tasks.find(
  //         (task: { id: string; title: string }) => task.title === taskName
  //       );

  //       if (taskToDelete) {
  //         await request.delete(`${API_URL}/tasks/${taskToDelete.id}`);
  //       }
  //     }
  //   });
  // });
});
