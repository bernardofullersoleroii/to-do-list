# Laboratory 4 — Demonstration Guide

This document is separate from the source code. All JSX, JS, and CSS files contain no explanation comments.

## What to do in the browser

1. Launch the website. The crow should be standing, and the book should remain closed.
2. Click the crow. Watch the scroll fall and the crow leave toward the top right.
3. Open the fallen scroll, read the guide, move it with the drag handle, and close it.
4. Click the closed book to open the application. The book should **not** open automatically.
5. Open Task Groups. Create at least two groups.
6. In each group add a task. Confirm that only the selected group's tasks are shown.
7. Mark a task Done, then Not Done. Watch the orange progress bar and dashboard statistics update.
8. In My Tasks, press Select Tasks, select several unfinished tasks, and press Mark Selected Done. Try Delete Selected and show the confirmation popup. In a group, repeat the selection process to prove it is limited to that group.
9. Use Clear All Done in a group and show its confirmation popup. Use Cancel first to show that nothing is removed. The My Tasks version clears completed tasks across all groups.
10. Edit a task, then delete another task.
11. Navigate between Dashboard, My Tasks, Task Groups, and Developers without a full page reload.
12. On Dashboard, show the sample user retrieved using Axios. Then visit User Information to see more sample users.
13. Click Refresh Users to show the loading state. Disconnect from the internet before clicking Refresh Users to demonstrate error handling, then reconnect and retry.
14. Refresh the page to confirm that tasks and groups remain saved through Zustand persist. The crow introduction resets, so open its guide again to access the book.

## Important files to show

- `src/store/useTodoStore.js`: Zustand, `create()`, `set()`, CRUD functions, `persist()`.
- `src/api/users.js`: Axios, `axios.create()`, `api.get()` requests to DummyJSON.
- `src/pages/Users.jsx`: `useState`, `useEffect`, fetching, loading, error, retry, user profiles.
- `src/pages/Dashboard.jsx`: Task counts from Zustand, one overall progress bar, and the timed Welcome message.
- `src/components/DashboardUser.jsx`: Axios featured user with loading, error, and retry states.
- `src/components/ProgressBar.jsx`: Percent calculation and progress bar width.
- `src/components/TaskForm.jsx`: Task input, `onChange`, `onSubmit`.
- `src/components/TaskItem.jsx`: Done/Not Done, editing and deleting via `onClick`; selection checkbox in bulk mode.
- `src/components/SelectableTaskList.jsx`: Select All Shown, bulk Done/Not Done, confirmed bulk delete, and confirmed Clear All Done.
- `src/router.jsx`: `Routes`, `Route`, dynamic route `/groups/:groupId` and `/users`.
- `src/components/BookNavigation.jsx`: `NavLink` and current route styling.
- `src/pages/GroupTasks.jsx`: `useParams` for a selected group.
- `src/App.jsx`: Crow scroll and closed-book unlocking behavior.
- `src/pages/Guide.jsx` and `src/hooks/useDrag.js`: Movable parchment guide.

## Explain the two new concepts

**Zustand:** Instead of storing all task data inside one component and passing it down through many props, we use one shared store. Pages get the current tasks directly with `useTodoStore(state => state.tasks)`, and actions such as `toggleTask()` update the store. Components using that state update automatically. The `persist` middleware saves groups and tasks so they remain after refresh.

**Axios:** We use Axios to send an HTTP GET request to DummyJSON for sample user data. The website displays a loading message while the request runs, displays the returned users when it succeeds, and displays an error with a retry button if it fails. DummyJSON data does not contain or modify our own tasks.

## Before submission

- Test desktop and mobile sizes.
- Run `npm run build`.
- Check every required route, including refreshing `/users` directly on Vercel.
- Make sure `.gitignore` excludes `node_modules`, `dist`, and `.vercel`.
- Confirm the public URL works and that Developer names are correct.

**Lab 4 rubric note:** The Dashboard now displays an Axios-loaded sample user and supports loading, error, and retry. The full Users list remains on `/users`.
