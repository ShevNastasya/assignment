import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { API_URL } from '../api/api-config';

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
  test.describe('Task Creation API', () => {
    const alphaNumeric = faker.string.alphanumeric(8);
    const taskName = `Task name ${alphaNumeric}`;
    test('POST /creates a new task', async ({ request }) => {
      const newTaskResponse = await request.post(`${API_URL}/tasks`, {
        data: {
          "title": taskName,
          "description": "This is description of the task",
          "status": "Open",
          "createdAt": "2026-09-24T03:11:54.131Z"
        }
      })
      expect(newTaskResponse.status()).toEqual(201)
      const responseTaskJSON = await newTaskResponse.json()
      expect(responseTaskJSON).toHaveProperty('title')
      expect(responseTaskJSON).toHaveProperty('description')
      expect(responseTaskJSON).toHaveProperty('status')
      expect(responseTaskJSON).toHaveProperty('id')
      expect(responseTaskJSON.title).toBe(taskName)
      expect(responseTaskJSON.description).toBe('This is description of the task')
      expect(responseTaskJSON.status).toBe('Open')
    })
  });
});
