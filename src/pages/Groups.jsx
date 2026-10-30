import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Groups({ groups, tasks, addGroup, renameGroup, deleteGroup }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState('')
  const [newName, setNewName] = useState('')

  function createGroup(event) {
    event.preventDefault()
    const value = name.trim()
    if (!value) return setError('Please enter a group name.')
    if (groups.some(group => group.name.toLowerCase() === value.toLowerCase())) {
      return setError('That group already exists.')
    }
    addGroup(value)
    setName('')
    setError('')
  }

  function saveGroup(event) {
    event.preventDefault()
    const value = newName.trim()
    if (!value) return setError('Group name cannot be empty.')
    if (groups.some(group => group.id !== editingId && group.name.toLowerCase() === value.toLowerCase())) {
      return setError('That group already exists.')
    }
    renameGroup(editingId, value)
    setEditingId('')
    setError('')
  }

  function removeGroup(id) {
    if (window.confirm('Delete this group and all tasks inside it?')) deleteGroup(id)
  }

  return (
    <div className="page-inner">
      <h2 className="page-heading">Task Groups</h2>
      <p className="page-description">Create categories to organize your tasks.</p>
      <form className="task-form" onSubmit={createGroup}>
        <label className="field-label" htmlFor="group-name">Create a group</label>
        <div className="task-form-bottom">
          <input
            id="group-name"
            className="paper-input"
            maxLength={35}
            placeholder="e.g. School Activities"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <button className="action-button" type="submit">+ Add Group</button>
        </div>
      </form>
      {error && <p className="error-note" role="alert">{error}</p>}
      <div className="scroll-list">
        {groups.map(group => (
          <div className="group-card" key={group.id}>
            {editingId === group.id ? (
              <form className="edit-form" onSubmit={saveGroup}>
                <input
                  className="paper-input"
                  aria-label="Rename group"
                  value={newName}
                  onChange={event => setNewName(event.target.value)}
                  maxLength={35}
                />
                <div className="edit-actions">
                  <button className="mini-button" type="submit">Save</button>
                  <button className="mini-button secondary" type="button" onClick={() => setEditingId('')}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="group-info">
                  <Link to={'/groups/' + group.id}>{group.name}</Link>
                  <small>{tasks.filter(task => task.groupId === group.id).length} tasks</small>
                </div>
                <div className="group-actions">
                  <Link className="mini-button" to={'/groups/' + group.id}>Open</Link>
                  <button className="mini-button secondary" type="button" onClick={() => {
                    setEditingId(group.id)
                    setNewName(group.name)
                  }}>Edit</button>
                  <button className="mini-button danger" type="button" onClick={() => removeGroup(group.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
        {groups.length === 0 && <p className="empty-state">Create your first group above.</p>}
      </div>
    </div>
  )
}
