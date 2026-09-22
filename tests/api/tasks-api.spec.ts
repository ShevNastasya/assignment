import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:3001';

test.describe('Tasks API', () => {
  test('GET /tasks returns the list of seeded tasks', async ({ request }) => {
    const response = await request.get(`${API_URL}/tasks`);
    expect(response.status()).toBe(200);

    const tasks = await response.json();
    expect(Array.isArray(tasks)).toBeTruthy();
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[0]).toHaveProperty('title');
    expect(tasks[0]).toHaveProperty('status');
  });

  // TODO (Task C): Add a test here (or in a new file) that creates a task via
  // POST /tasks and validates:
  //   - the response status code
  //   - the shape/structure of the response payload
  //   - that key attributes (title, description, status) match what was submitted
});
