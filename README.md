# Task Manager — QA Automation Take-Home Assessment

Welcome! This assessment is designed to take **60–90 minutes**. It uses a small
Task Manager web app with an existing Playwright automation framework.

## What's in this repo

- `app/` — a React + TypeScript Task Manager web app (view, create, edit,
  delete, search tasks; each task has a status of `Open`, `In Progress`, or
  `Done`).
- `api/` — a mock REST API powered by [json-server](https://github.com/typicode/json-server),
  seeded with sample tasks (`api/db.seed.json`).
- `tests/` — an existing Playwright automation framework:
  - `tests/pages/` — Page Object Model
  - `tests/e2e/` — UI end-to-end tests
  - `tests/api/` — API tests
- `playwright.config.ts` — Playwright configuration (auto-starts the app and
  API for you).

## Prerequisites

- Node.js 18+ and npm

## Setup

```bash
npm install
npx playwright install chromium
```

That's it — one `npm install` at the root installs everything (the app is an
npm workspace).

## Running things locally

Run the app manually and poke around in the browser:

```bash
npm run api   # starts the mock API on http://localhost:3001 (resets sample data each time)
npm run dev   # in a second terminal, starts the app on http://localhost:5173
```

Run the Playwright test suite (this automatically starts the API and app for
you — no need to start them manually first):

```bash
npm test
```

Other useful commands:

```bash
npm run test:headed   # run tests with a visible browser
npm run test:ui       # open Playwright's UI mode (great for debugging)
npm run report        # open the last HTML test report
```

## Your assignment

Fork this repository into your own GitHub account, then complete the
following tasks. Commit your work as you go with clear commit messages.

### Task A — Fix the two failing tests (required)

Run `npm test`. You'll see **two failing tests**. For each one:

1. Investigate the root cause.
2. Fix it.
3. Write a short explanation of the root cause in `SOLUTION.md` (see template
   below) — e.g., what was wrong and why the test failed.

Do **not** just make the test pass by loosening assertions — fix the actual
underlying problem so the test still meaningfully verifies behavior.

### Task B — Write one new test (required)

Add a new Playwright test that covers a scenario **not already tested** in
`tests/e2e/`. Look for a gap in coverage. Use the existing Page Object Model
(`tests/pages/TaskManagerPage.ts`) and extend it if needed. Follow the same
conventions used in the existing tests (reliable locators, no hardcoded
waits, `expect(...)` assertions that auto-retry).

### Task C — Add API validation for task creation (required)

In `tests/api/`, add a test that creates a task via `POST /tasks` on the mock
API (`http://localhost:3001`) and validates:

- The response **status code**.
- The **response payload** shape.
- That key task attributes (`title`, `description`, `status`) match what was
  submitted.

There's a `// TODO (Task C)` comment in `tests/api/tasks-api.spec.ts` marking
where to start.

### Task D — Report a bug or improvement (required)

While exploring the app, identify **at least one** real bug, usability issue,
or improvement opportunity (it does not need to be related to the failing
tests). Document it in `SOLUTION.md`:

- What you observed
- Steps to reproduce (if it's a bug)
- Why it matters
- A suggested fix or improvement

You do not need to fix it — just document it clearly. (You're welcome to fix
it too if you have time left over.)

## Deliverables

1. Your fixed code (two previously-failing tests now passing).
2. One new Playwright test (Task B).
3. One new API validation test (Task C).
4. A `SOLUTION.md` file at the repo root containing:
   - Root cause explanation for each of the two failing tests (Task A).
   - Your bug/usability/improvement write-up (Task D).
5. All tests passing via `npm test`.

A `SOLUTION_TEMPLATE.md` is included — copy it to `SOLUTION.md` and fill it
in.

## Submission instructions

1. Fork this repository to your own **personal** GitHub account.
2. Do your work on a branch (or `main`) in your fork.
3. Make sure `npm test` passes fully before submitting.
4. Send us the link to your fork (and open a pull request within your fork
   if you'd like to show a diff view), along with your completed
   `SOLUTION.md`.

## Notes

- Please don't spend more than ~90 minutes on this. If you run out of time,
  prioritize Task A, then note what you would still do in `SOLUTION.md`.
- Use your best judgment and communicate your reasoning — how you think
  through a problem matters as much as the final code.
- Good luck!
