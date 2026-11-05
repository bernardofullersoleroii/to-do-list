import { useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar.jsx'
import DashboardUser from '../components/DashboardUser.jsx'
import useTodoStore from '../store/useTodoStore.js'

export default function Dashboard() {
  const tasks = useTodoStore(state => state.tasks)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const done = tasks.filter(task => task.done).length
  const pending = tasks.length - done

  return (
    <div className="page-inner relative">
      {showWelcome && (
        <div className="dashboard-magic-welcome" aria-hidden="true">
          Welcome!
        </div>
      )}

      <h2 className="page-heading">Dashboard</h2>
      <p className="page-description">
        Welcome! Here's an overview of your to-do list.
      </p>

      <div className="stats-grid grid grid-cols-3 gap-2">
        <div className="stat-card">
          <strong>{tasks.length}</strong>
          <span>Total</span>
        </div>
        <div className="stat-card">
          <strong>{done}</strong>
          <span>Done</span>
        </div>
        <div className="stat-card">
          <strong>{pending}</strong>
          <span>Not Done</span>
        </div>
      </div>

      <div className="dashboard-progress-overview">
        <ProgressBar
          label="Overall task progress"
          total={tasks.length}
          done={done}
        />
      </div>

      <DashboardUser />
    </div>
  )
}
