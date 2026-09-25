# Solution

## Task A — Root cause analysis

### Failing test 1: `<e2e/search.spec.ts>` (`<.....\assignment\tests\e2e\search.spec.ts>`) and (`<.....\assignment\tests\pages\TaskManagerPage.ts>`)

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
I added tests to the ..\assignment\tests\e2e\search.spec.ts that verify en empty state of the table and proper message as well as new function to look for en empty state locator to TaskManagerPage.ts.

- **Why this scenario matters / why it was missing:**
This scenario help to make sure users see redable message when searched item is not in the list. If for example, message is missing and the page is displayed empty - could be confusing for users or give an idea that app doesn't work.

## Task B — New test 2
Additional test that I created, but had to comment out. Sorry, was short on time to improve it. Basically, on 3rd re-run of the suite test failes due to socket hang up. I left it just to show case what I intended.

- **Scenario covered:**
In ..\assignment\tests\e2e\task-status.spec.ts added scenario that covers scrolling on the page is there are long list of the tasks as well as added check that last task is visible, so users can access it. To do so, I reused new api validation that creates tasks, and created few tasks to have scroll appear and then in after hook deleted created task in order not to polut db.

- **Why this scenario matters / why it was missing:**
This scenario covers detection of common issue with long lists of items, that last item is become not accesible or scroll doesn't work.

## Task C — API validation

- **What the new API test verifies:**
I created validation that with POST request and provided json values creates a new task. And added validation of fields and values. 

## Task D — Bug / usability / improvement report
I had to fix this issues since on reruns of the suite create task case was failing. For this I added aftereach hook that looks for newly created task and deletes this. I reused existing Api GET validation. And to get the unique test id added randomazer to the name creation. 


- **What I observed:**
 That create a new task test (under task-management.spec.ts) creates new task with every run of the suite, that means that multiple dublicates are in the list and one second run- the test fails since assertion doesn't now with which dublicate to compare.

- **Steps to reproduce (if applicable):**
`<e2e/task-management.spec.ts>` (`<.....\assignment\tests\e2e\task-management.spec.ts>`) and (`<.....\assignment\tests\pages\TaskManagerPage.ts>`)
Basically to run the suite more than one time.

- **Why it matters:**
It doesn't follow best practices of creating tests. Ideally all created data in tests should be removed after tests competed intended actions. In this case, it's creates false failure in the suite.

- **Suggested fix or improvement:**
To add delete after creation task asserion verified test. Could be added as after hook. This allows isolation of tests. (see above added aftereach hook for this particular test)

## Anything else you'd like us to know
Also, because I reused API validations I had to move URL in separate file since playwrigh through an error. Usually as improvement I would make URL as an variable and move to config file or similar and real value in some file with values and passwords (which is not part of the repo). But it takes a bit of time.

I would like in future to move those parts (const taskManager = new TaskManagerPage(page);await taskManager.goto();) to before hook, since it's repetition and could be cleaner (and after hook to clean up).

As you asked, I re-run test suite few times to make sure tests are passing.
