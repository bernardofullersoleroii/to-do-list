import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Tasks from './pages/Tasks.jsx'
import Groups from './pages/Groups.jsx'
import GroupTasks from './pages/GroupTasks.jsx'
import Guide from './pages/Guide.jsx'
import Developers from './pages/Developers.jsx'

export default function BookRoutes({ location, groups, tasks, taskActions, addTask, addGroup, renameGroup, deleteGroup, clearDone }) {
  return (

<Routes location={location}>
  <Route
    path="/"
    element={<Dashboard groups={groups} tasks={tasks} addTask={addTask} />}
  />
  <Route
    path="/tasks"
    element={<Tasks {...taskActions} />}
  />
  <Route
    path="/groups"
    element={<Groups groups={groups} tasks={tasks} addGroup={addGroup} renameGroup={renameGroup} deleteGroup={deleteGroup} />}
  />
  <Route
    path="/groups/:groupId"
    element={<GroupTasks {...taskActions} clearDone={clearDone} />}
  />
  <Route
    path="/developers"
    element={<Developers />}
  />
</Routes>
  )
}

export function GuideRoutes({ onClose }) {
  return (
    <Routes>
      <Route path="/guide" element={<Guide onClose={onClose} />} />
    </Routes>
  )
}
