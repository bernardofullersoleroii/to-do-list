# Halloween Themed To-Do List

## Group members

- Bernardo F. Solero II — Creative Direction, UI/UX Design and Animation
- Rojan Javier — Frontend Development
- Esrihel Monares — Routing, Testing and Deployment

## Open in VS Code

1. Extract the ZIP.
2. Open the `lab3-solero-javier-monares` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the localhost address printed by Vite.

To use inside an already running Vite project, stop the server and replace `src`, `public`, `index.html`, `package.json`, `vite.config.js`, and `vercel.json` with the corresponding files from this ZIP. Then run `npm install` and `npm run dev` again.

## React source file organization

| File | Purpose |
| --- | --- |
| `src/main.jsx` | Creates React root and BrowserRouter |
| `src/App.jsx` | Handles shared React state, CRUD functions, and Halloween scene |
| `src/router.jsx` | Defines Dashboard, Tasks, Groups, Group Tasks, Guide, and Developers routes using React Router DOM |
| `src/pages/Dashboard.jsx` | Dashboard and Quick Add Task |
| `src/pages/Tasks.jsx` | All tasks, search, status filter |
| `src/pages/Groups.jsx` | Create, read, rename, and delete groups |
| `src/pages/GroupTasks.jsx` | Selected group route, task controls |
| `src/pages/Developers.jsx` | Team names and role assignments |
| `src/components/TaskForm.jsx` | Reusable form to add tasks |
| `src/components/TaskItem.jsx` | Reusable task row with Done, Edit, Delete |
| `src/components/Book.jsx` | Open and closed book images and their layout |
| `src/components/BookNavigation.jsx` | Text-only page navigation |
| `src/components/Crow.jsx` | Standing welcome crow and animated flying crow |
| `src/components/RolledScroll.jsx` | Dropped scroll that remains visible and can move |
| `src/pages/Guide.jsx` | Required `/guide` route with full guide inside draggable parchment |
| `src/hooks/useDrag.js` | Simple mouse/touch drag functionality |
| `src/data/starterData.js` | Initial demo groups/tasks and saved-data reader |
| `src/style.css` | Tailwind and the visual theme and animations |

There are **no explanatory comments inside the source code**, as requested. A separate presentation cheat sheet can be created later.

## Required routes

- `/` — Dashboard
- `/groups` — Task Groups
- `/groups/:groupId` — Tasks belonging to selected group
- `/guide` — Guide displayed inside the movable parchment scroll (intentionally hidden from main menu)
- `/developers` — Developers
- `/tasks` — Additional All Tasks page

## Guide interaction

Wait for the five-second introduction. Click the flying crow to drop the rolled paper. Click the paper to open `/guide`. Drag the parchment using the small **Hold and drag to move** area. The page behind it remains usable. Choose **Reset position** to center it and **X** or **Close Guide** to close it. The dropped rolled paper remains where it landed or was dragged.

The flying crow always remains behind the open book. The intro does not have a skip button.

## Data storage

Groups and tasks are saved in browser localStorage. They persist after refresh in that browser but do not sync between devices. The storage keys are `witch-groups` and `witch-tasks` to preserve compatibility with the earlier project version. This is just an internal storage label; the interface is an ordinary to-do list.

## Vercel

Push the project to GitHub and import it into Vercel. Use Vite as the framework preset. The included `vercel.json` rewrites all app routes to `index.html`, allowing a refreshed `/groups/...` or `/developers` URL to load correctly.

## Image placeholders

The `public/images` folder contains the original working PNG placeholders supplied during design. Replace with properly licensed, watermark-free artwork before public publishing where necessary. Keep filenames the same to avoid changing source paths.
