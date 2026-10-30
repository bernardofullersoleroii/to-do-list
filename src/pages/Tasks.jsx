import { Link } from 'react-router-dom'
import { useState } from 'react'
import TaskForm from '../components/TaskForm.jsx'
import TaskItem from '../components/TaskItem.jsx'

export default function Tasks({ groups, tasks, addTask, toggleTask, editTask, deleteTask }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const visibleTasks = tasks.filter(task => {
    const matchesText = task.text.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === 'all' || (status === 'done' ? task.done : !task.done)
    return matchesText && matchesStatus
  })

  return (
    <div className="page-inner">
      <h2 className="page-heading">My Tasks</h2>
      <p className="page-description">Add, edit, finish, and delete tasks.</p>
      {groups.length > 0 ? (
        <TaskForm groups={groups} addTask={addTask} />
      ) : <Link to="/groups" className="page-link">Create a task group first →</Link>}
      <div className="task-tools">
        <input
          className="paper-input"
          aria-label="Search tasks"
          placeholder="Search tasks..."
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <select
          className="paper-input"
          aria-label="Filter task status"
          value={status}
          onChange={event => setStatus(event.target.value)}
        >
          <option value="all">All tasks</option>
          <option value="pending">Not Done</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="scroll-list" aria-live="polite">
        {visibleTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            groupName={groups.find(group => group.id === task.groupId)?.name || 'Other'}
            toggleTask={toggleTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
        {visibleTasks.length === 0 && <p className="empty-state">No tasks found.</p>}
      </div>
    </div>
  )
}
