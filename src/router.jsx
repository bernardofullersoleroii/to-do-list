import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Tasks from './pages/Tasks.jsx'
import Groups from './pages/Groups.jsx'
import GroupTasks from './pages/GroupTasks.jsx'
import Users from './pages/Users.jsx'
import Guide from './pages/Guide.jsx'
import Developers from './pages/Developers.jsx'

export default function BookRoutes({ location }) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:groupId" element={<GroupTasks />} />
      <Route path="/users" element={<Users />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="*" element={
        <div className="page-inner">
          <h2 className="page-heading">Page not found</h2>
          <Link to="/">Back to Dashboard</Link>
        </div>
      } />
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
