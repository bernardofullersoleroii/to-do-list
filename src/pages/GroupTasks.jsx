import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TaskForm from '../components/TaskForm.jsx'
import SelectableTaskList from '../components/SelectableTaskList.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import useTodoStore from '../store/useTodoStore.js'
import sortTasksByDue from '../utils/sortTasksByDue.js'

export default function GroupTasks() {
  const { groupId } = useParams()
  const [status, setStatus] = useState('all')
  const groups = useTodoStore(state => state.groups)
  const tasks = useTodoStore(state => state.tasks)
  const clearDone = useTodoStore(state => state.clearDone)
  const group = groups.find(item => item.id === groupId)

  if (!group) {
    return (
      <div className="page-inner">
        <h2 className="page-heading">Group not found</h2>
        <Link to="/groups" className="page-link">Back to Groups</Link>
      </div>
    )
  }

  const groupTasks = tasks.filter(task => task.groupId === groupId)
  const completed = groupTasks.filter(task => task.done).length
  const unfinished = groupTasks.length - completed
  const filteredTasks = sortTasksByDue(groupTasks.filter(task => {
    if (status === 'done') return task.done
    if (status === 'pending') return !task.done
    return true
  }))

  return (
    <div className="page-inner">
      <Link className="back-link" to="/groups">← Task Groups</Link>
      <h2 className="page-heading group-heading">{group.name}</h2>
      <p className="page-description">{completed} of {groupTasks.length} tasks completed</p>
      <ProgressBar label={group.name + ' progress'} total={groupTasks.length} done={completed} />
      <TaskForm key={groupId} fixedGroupId={groupId} />
      <div className="group-filter" role="group" aria-label="Filter tasks by status">
        <button
          type="button"
          aria-pressed={status === 'all'}
          className={'filter-tab' + (status === 'all' ? ' active' : '')}
          onClick={() => setStatus('all')}
        >
          All ({groupTasks.length})
        </button>
        <button
          type="button"
          aria-pressed={status === 'pending'}
          className={'filter-tab' + (status === 'pending' ? ' active' : '')}
          onClick={() => setStatus('pending')}
        >
          Not Done ({unfinished})
        </button>
        <button
          type="button"
          aria-pressed={status === 'done'}
          className={'filter-tab' + (status === 'done' ? ' active' : '')}
          onClick={() => setStatus('done')}
        >
          Done ({completed})
        </button>
      </div>
      <p className="sort-hint">Nearest due dates first · Tasks without dates last</p>
      <SelectableTaskList
        key={groupId + ':' + status}
        tasks={filteredTasks}
        doneCount={completed}
        scopeName={group.name}
        clearCompleted={() => clearDone(groupId)}
      />
    </div>
  )
}
