# Laboratory 4 — Halloween To-Do List

Group: Bernardo F. Solero II, Rojan Javier, Esrihel Monares

## Setup in VS Code

1. Extract the folder and open `lab4-solero-javier-monares` in VS Code.
2. In the terminal run `npm install`.
3. Run `npm run dev`.
4. Open the localhost address shown by Vite.
5. Run `npm run build` before deployment.

## Introduction

The book starts closed. Click the standing crow, then click its dropped scroll and read/open the guide. Close the guide. The book is now unlocked, but only opens when clicked. After the first click, the crow flies away behind the book. The rolled scroll remains draggable and can be reopened.

## Routes

- `/` Dashboard
- `/tasks` Task list
- `/groups` Category management
- `/groups/:groupId` Individual group task list
- `/guide` Draggable parchment guide (opened via scroll)
- `/users` Sample user information from DummyJSON
- `/developers` Group members

## Where to find code

- `src/store/useTodoStore.js`: Zustand state store; add/edit/delete tasks and groups; persist middleware.
- `src/api/users.js`: Axios requests to DummyJSON user endpoints.
- `src/pages/Users.jsx`: Loading, error, retry, and sample profiles.
- `src/components/DashboardUser.jsx`: A compact Axios sample user on Dashboard with loading, error, and retry states.
- `src/pages/Dashboard.jsx`: Zustand task counts, one overall progress bar, and a fading cursive Welcome message.
- `src/components/ProgressBar.jsx`: Reusable orange task progress bar.
- `src/router.jsx`: React Router DOM routes.
- `src/components/BookNavigation.jsx`: NavLink navigation.
- `src/pages/GroupTasks.jsx`: useParams and group-specific tasks.
- `src/components/TaskForm.jsx`: useState and onSubmit.
- `src/components/TaskItem.jsx`: onClick events to edit, complete, and delete tasks; a selection checkbox in bulk mode.
- `src/App.jsx`: Crow click, guide route, and locked book entry sequence.
- `src/hooks/useDrag.js`: Mouse/touch drag behavior.
- `src/pages/Guide.jsx`: Complete instructions.
- `src/components/SelectableTaskList.jsx`: Shared select-and-bulk-actions controls used in My Tasks and Group Tasks.

## Existing Laboratory 3 tasks

On the same browser, the Zustand store starts by reading the old `witch-tasks` and `witch-groups` keys if no Laboratory 4 store has been saved yet. Do not manually delete browser storage before upgrading if you want to retain your earlier tasks.

## Requirements and notes

- Axios is used only to request sample user information from `https://dummyjson.com/users` and `https://dummyjson.com/users/9`.
- Tasks and task groups are stored and shared using Zustand, not DummyJSON.
- The browser must be online to retrieve API sample users. The to-do list itself continues working offline.
- The project uses React, Tailwind CSS, React Router DOM, Zustand, Axios, and custom CSS for the Halloween artwork.
- All code files are intentionally free of explanatory comments; prepare explanations separately for presentation.

## GitHub and Vercel

This is a new folder for Laboratory 4. You can create a new repository or commit its files to your existing repository. Before pushing, make sure `.gitignore` excludes `node_modules`, `dist`, and `.vercel`.

Push from inside the project directory:

```
git init
git add .
git commit -m "Laboratory 4 - Axios and Zustand upgrade"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

If the origin remote already exists, do not add it a second time. Vercel should use the default Vite framework, install command `npm install`, and build command `npm run build`.


## Quality-of-life update

- Task groups have **All**, **Not Done**, and **Done** filters with live counts.
- Tasks are ordered by earliest due date (oldest overdue first, then upcoming); tasks with no due date appear last.
- The My Tasks list follows that due-date order.
- The scroll guide uses shorter, simpler instructions.
- The page-top `HALLOWEEN TO-DO LIST · LABORATORY 4` label was removed. The book and Halloween theme remain unchanged.

If you already use Lab 4, replace the `src` directory from this download and keep your existing `public` image folder. Then run `npm install` and `npm run dev`.


## Latest changes

- My Tasks now uses visible All, Not Done, and Done filter buttons with live counts.
- Group filters, nearest-deadline sorting, and everything added in the previous update are preserved.
- The Users screen avoids displaying repeated full names if sample records have duplicate names.
- DummyJSON users appear on the User Information page, and a separate featured sample user appears on the Dashboard.
- JSX, JS, and CSS files have consistent two-space indentation.


## Latest updates: bulk task management

- **My Tasks** and each **selected Task Group** include Select Tasks and Clear All Done.
- Select Tasks shows checkboxes. Use Select All Shown to select only tasks visible under the current All / Not Done / Done filter, then Mark Selected Done, Mark Not Done, or Delete Selected.
- Bulk deletion and Clear All Done require a confirmation popup. Clear All Done in a group affects only that group. Clear All Done in My Tasks affects all completed tasks in the app.
- The Dashboard shows the overall progress bar and totals only, without redundant My Tasks / Group Tasks progress bars, Quick Add, or upcoming task previews. A compact Axios user card meets the Lab 4 Dashboard API requirement.
- No application source-code comments were added.

## Dashboard design and Lab 4 requirements

The Dashboard contains a short fading cursive Welcome animation, followed by a permanent welcome/overview sentence, the Total/Done/Not Done counts, and one Overall task progress bar. It also shows a compact DummyJSON sample user fetched with Axios, with loading, error, and retry states. The full User Information list remains available at `/users`. Tailwind utility classes style the dashboard layout and sample user card alongside custom CSS used for the Halloween artwork.
