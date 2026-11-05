import { Link } from 'react-router-dom'
import { useState } from 'react'
import useTodoStore from '../store/useTodoStore.js'
import TaskForm from '../components/TaskForm.jsx'
import SelectableTaskList from '../components/SelectableTaskList.jsx'
import sortTasksByDue from '../utils/sortTasksByDue.js'

export default function Tasks() {
  const groups = useTodoStore(state => state.groups)
  const tasks = useTodoStore(state => state.tasks)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const clearAllDone = useTodoStore(state => state.clearAllDone)
  const doneCount = tasks.filter(task => task.done).length
  const pendingCount = tasks.length - doneCount

  const visibleTasks = sortTasksByDue(tasks.filter(task => {
    const matchesText = task.text.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === 'all' || (status === 'done' ? task.done : !task.done)
    return matchesText && matchesStatus
  }))

  return (
    <div className="page-inner">
      <h2 className="page-heading">My Tasks</h2>
      <p className="page-description">Add, edit, finish, and delete tasks.</p>
      {groups.length > 0 ? (
        <TaskForm />
      ) : <Link to="/groups" className="page-link">Create a task group first →</Link>}
      <div className="task-tools">
        <input
          className="paper-input"
          aria-label="Search tasks"
          placeholder="Search tasks..."
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </div>
      <div className="group-filter" role="group" aria-label="Filter tasks by status">
        <button
          type="button"
          aria-pressed={status === 'all'}
          className={'filter-tab' + (status === 'all' ? ' active' : '')}
          onClick={() => setStatus('all')}
        >
          All ({tasks.length})
        </button>
        <button
          type="button"
          aria-pressed={status === 'pending'}
          className={'filter-tab' + (status === 'pending' ? ' active' : '')}
          onClick={() => setStatus('pending')}
        >
          Not Done ({pendingCount})
        </button>
        <button
          type="button"
          aria-pressed={status === 'done'}
          className={'filter-tab' + (status === 'done' ? ' active' : '')}
          onClick={() => setStatus('done')}
        >
          Done ({doneCount})
        </button>
      </div>
      <p className="sort-hint">Nearest due dates first · Tasks without dates last</p>
      <SelectableTaskList
        key={status + ':' + search}
        tasks={visibleTasks}
        doneCount={doneCount}
        scopeName="My Tasks"
        clearCompleted={clearAllDone}
        getGroupName={task => groups.find(group => group.id === task.groupId)?.name || 'Other'}
      />
    </div>
  )
}
