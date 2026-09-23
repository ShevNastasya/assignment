# Solution

## Task A — Root cause analysis

### Failing test 1: `<e2e/search.spec.ts>` (`<.....\assignment\tests\e2e\search.spec.ts>`)

- **Root cause:**
The search function used for the test (from the TaskManagerPage.ts file) was using wrong locator. Cross-check with the locator used in app (data-testid="search-input") and page object description of the input field.

- **Fix applied:**
Updated line 89 (TaskManagerPage.ts) getByTestId('task-search-input') to getByTestId('search-input')

### Failing test 2: `<e2e/task-status.spec.ts>` (`<.....\assignment\tests\e2e\task-status.spec.ts>`)

- **Root cause:**
The assertion used status for comparison that doesn't exist in the app. Was used 'Completed' but app has only Open, In progress and Done statuses

- **Fix applied:**
Updated line 11 (e2e/task-status.spec.ts), toHaveText('Completed') to toHaveText('Done')

## Task B — New test

- **Scenario covered:**
- **Why this scenario matters / why it was missing:**

## Task C — API validation

- **What the new API test verifies:**

## Task D — Bug / usability / improvement report

- **What I observed:**
- **Steps to reproduce (if applicable):**
- **Why it matters:**
- **Suggested fix or improvement:**

## Anything else you'd like us to know

-
