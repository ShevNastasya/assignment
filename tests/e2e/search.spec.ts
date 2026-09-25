import { test, expect } from '@playwright/test';
import { TaskManagerPage } from '../pages/TaskManagerPage';

test.describe('Search', () => {
  test('search filters the task list by title', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await taskManager.search('Write report');

    await expect(taskManager.taskRow('Write report')).toBeVisible();
    await expect(taskManager.taskRow('Buy groceries')).toHaveCount(0);
  });

  //Added new test #1
  test('search filters the empty state of the table/ results when no task is found', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await taskManager.search('Task that is not there');
    await expect(taskManager.emptyState()).toBeVisible();
  });

  test('clearing the search shows all tasks again', async ({ page }) => {
    const taskManager = new TaskManagerPage(page);
    await taskManager.goto();

    await taskManager.searchInput.fill('Write report');
    await expect(taskManager.taskRow('Buy groceries')).toHaveCount(0);

    await taskManager.searchInput.fill('');
    await expect(taskManager.taskRow('Buy groceries')).toBeVisible();
  });
});
