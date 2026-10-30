import { Link, useParams } from 'react-router-dom'
import TaskForm from '../components/TaskForm.jsx'
import TaskItem from '../components/TaskItem.jsx'

export default function GroupTasks({ groups, tasks, addTask, toggleTask, editTask, deleteTask, clearDone }) {
  const { groupId } = useParams()
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

  function clearCompleted() {
    if (window.confirm('Delete the completed tasks in this group?')) clearDone(groupId)
  }

  return (
    <div className="page-inner">
      <Link className="back-link" to="/groups">← Task Groups</Link>
      <h2 className="page-heading group-heading">{group.name}</h2>
      <p className="page-description">{completed} of {groupTasks.length} tasks completed</p>
      <TaskForm key={groupId} groups={groups} fixedGroupId={groupId} addTask={addTask} />
      <div className="scroll-list">
        {groupTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
        {groupTasks.length === 0 && <p className="empty-state">No tasks yet.</p>}
      </div>
      {completed > 0 && (
        <button className="clear-button" type="button" onClick={clearCompleted}>Clear completed tasks</button>
      )}
    </div>
  )
}
