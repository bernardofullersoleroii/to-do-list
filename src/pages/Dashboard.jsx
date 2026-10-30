import { Link } from 'react-router-dom'
import TaskForm from '../components/TaskForm.jsx'

export default function Dashboard({ groups, tasks, addTask }) {
  const done = tasks.filter(task => task.done).length
  const pending = tasks.length - done
  const nextTasks = tasks.filter(task => !task.done).slice(0, 3)

  return (
    <div className="page-inner">
      <div className="eyebrow">WELCOME BACK</div>
      <h2 className="page-heading">Dashboard</h2>
      <p className="page-description">Organize your tasks and track your progress.</p>
      <div className="stats-grid">
        <div className="stat-card"><strong>{tasks.length}</strong><span>Total</span></div>
        <div className="stat-card"><strong>{done}</strong><span>Done</span></div>
        <div className="stat-card"><strong>{pending}</strong><span>Not Done</span></div>
      </div>
      <div className="section-label">QUICK ADD</div>
      {groups.length > 0 ? (
        <TaskForm groups={groups} addTask={addTask} />
      ) : (
        <p className="small-note">Create a group first. <Link to="/groups">Open Task Groups</Link></p>
      )}
      <div className="section-label">NEXT TASKS</div>
      <div className="dashboard-tasks">
        {nextTasks.length > 0 ? nextTasks.map(task => (
          <div className="dashboard-line" key={task.id}>
            <span>{task.text}</span>
            <Link to={'/groups/' + task.groupId}>View</Link>
          </div>
        )) : <p className="small-note">No pending tasks.</p>}
      </div>
      <Link className="page-link" to="/tasks">View all tasks →</Link>
    </div>
  )
}
