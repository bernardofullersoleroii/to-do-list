import { useState } from 'react'
import useTodoStore from '../store/useTodoStore.js'

export default function TaskItem({ task, groupName, selecting = false, selected = false, onSelect }) {
  const toggleTask = useTodoStore(state => state.toggleTask)
  const editTask = useTodoStore(state => state.editTask)
  const deleteTask = useTodoStore(state => state.deleteTask)
  const [editing, setEditing] = useState(false)
  const [newText, setNewText] = useState(task.text)
  const [newDue, setNewDue] = useState(task.due || '')

  function saveTask(event) {
    event.preventDefault()
    if (!newText.trim()) return
    editTask(task.id, newText.trim(), newDue)
    setEditing(false)
  }

  if (editing) {
    return (
      <form className="edit-form" onSubmit={saveTask}>
        <input
          className="paper-input"
          aria-label="Edit task"
          value={newText}
          maxLength={100}
          onChange={event => setNewText(event.target.value)}
        />
        <input
          type="date"
          className="paper-input"
          aria-label="Edit deadline"
          value={newDue}
          onChange={event => setNewDue(event.target.value)}
        />
        <div className="edit-actions">
          <button className="mini-button" type="submit">Save</button>
          <button className="mini-button secondary" type="button" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </form>
    )
  }

  return (
    <div className={'task-card' + (selected ? ' task-selected' : '')}>
      {selecting && (
        <label className="task-select-label">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            aria-label={'Select ' + task.text}
          />
        </label>
      )}
      {!selecting && (
        <button
          className={'status-button' + (task.done ? ' done' : '')}
          type="button"
          onClick={() => toggleTask(task.id)}
          aria-label={task.done ? 'Mark as Not Done' : 'Mark as Done'}
        >
          {task.done ? '✓' : '○'}
        </button>
      )}
      <div className="task-info">
        <strong className={task.done ? 'task-finished' : ''}>{task.text}</strong>
        <small>
          {task.done ? 'Done' : 'Not Done'}
          {groupName ? ' • ' + groupName : ''}
          {task.due ? ' • Due ' + task.due : ''}
        </small>
      </div>
      {!selecting && (
        <>
          <button
            className="mini-button secondary"
            type="button"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="mini-button danger"
            type="button"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}
