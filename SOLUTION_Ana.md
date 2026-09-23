# Solution

> Copy this file to `SOLUTION.md` and fill it in as part of your submission.

## Task A — Root cause analysis

### Failing test 1: `<search.spec.ts>` (`<.....\assignment\tests\e2e\search.spec.ts>`)

- **Root cause:**
The search function used for the test (from the TaskManagerPage.ts file) was using wrong locator. Cross-check with the locator used in app (data-testid="search-input") and page object description of the input field.

- **Fix applied:**
Updated getByTestId('task-search-input') to getByTestId('search-input')

### Failing test 2: `<test name>` (`<file path>`)

- **Root cause:**
- **Fix applied:**

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
