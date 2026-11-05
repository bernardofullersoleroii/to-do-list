import { useEffect, useState } from 'react'
import useTodoStore from '../store/useTodoStore.js'

export default function TaskForm({ fixedGroupId = '' }) {
  const groups = useTodoStore(state => state.groups)
  const addTask = useTodoStore(state => state.addTask)
  const [text, setText] = useState('')
  const [groupId, setGroupId] = useState(fixedGroupId || groups[0]?.id || '')
  const [due, setDue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!fixedGroupId && !groups.some(group => group.id === groupId)) {
      setGroupId(groups[0]?.id || '')
    }
  }, [fixedGroupId, groupId, groups])

  const selectedGroup = fixedGroupId || groupId

  function submit(event) {
    event.preventDefault()
    if (!text.trim()) {
      setError('Please enter a task.')
      return
    }
    if (!groups.some(group => group.id === selectedGroup)) {
      setError('Please select a task group.')
      return
    }
    addTask(selectedGroup, text.trim(), due)
    setText('')
    setDue('')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <label className="field-label" htmlFor="task-name">New task</label>
      <input
        id="task-name"
        className="paper-input"
        placeholder="What do you need to do?"
        maxLength={100}
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <div className="task-form-bottom">
        {!fixedGroupId && (
          <select
            className="paper-input group-select"
            aria-label="Task group"
            value={groupId}
            onChange={event => setGroupId(event.target.value)}
          >
            {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        )}
        <input
          type="date"
          className="paper-input due-input"
          aria-label="Deadline (optional)"
          value={due}
          onChange={event => setDue(event.target.value)}
        />
        <button className="action-button" type="submit">+ Add Task</button>
      </div>
      {error && <p className="error-note" role="alert">{error}</p>}
    </form>
  )
}
