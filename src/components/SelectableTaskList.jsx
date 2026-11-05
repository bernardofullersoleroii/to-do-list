import { useState } from 'react'
import TaskItem from './TaskItem.jsx'
import useTodoStore from '../store/useTodoStore.js'

export default function SelectableTaskList({
  tasks,
  doneCount,
  scopeName,
  clearCompleted,
  getGroupName
}) {
  const [selecting, setSelecting] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const setTasksDone = useTodoStore(state => state.setTasksDone)
  const deleteTasks = useTodoStore(state => state.deleteTasks)

  const visibleIds = new Set(tasks.map(task => task.id))
  const selectedVisible = selectedIds.filter(id => visibleIds.has(id))
  const everyVisibleSelected = tasks.length > 0 && selectedVisible.length === tasks.length

  function toggleSelecting() {
    setSelecting(value => !value)
    setSelectedIds([])
  }

  function toggleSelection(id) {
    setSelectedIds(current =>
      current.includes(id)
        ? current.filter(value => value !== id)
        : [...current, id]
    )
  }

  function selectAllShown() {
    setSelectedIds(everyVisibleSelected ? [] : tasks.map(task => task.id))
  }

  function changeSelected(done) {
    if (selectedVisible.length === 0) return
    setTasksDone(selectedVisible, done)
    setSelectedIds([])
    setSelecting(false)
  }

  function deleteSelected() {
    const count = selectedVisible.length
    if (count === 0) return
    if (!window.confirm(`Delete ${count} selected task${count === 1 ? '' : 's'} from ${scopeName}? This cannot be undone.`)) {
      return
    }
    deleteTasks(selectedVisible)
    setSelectedIds([])
    setSelecting(false)
  }

  function clearDone() {
    if (doneCount === 0) return
    if (!window.confirm(`Delete all ${doneCount} completed task${doneCount === 1 ? '' : 's'} from ${scopeName}? This cannot be undone.`)) {
      return
    }
    clearCompleted()
    setSelectedIds([])
    setSelecting(false)
  }

  return (
    <>
      <div className="bulk-toolbar">
        <button
          type="button"
          className={'mini-button secondary' + (selecting ? ' selection-active' : '')}
          onClick={toggleSelecting}
          disabled={tasks.length === 0 && !selecting}
          aria-pressed={selecting}
        >
          {selecting ? 'Cancel Selection' : 'Select Tasks'}
        </button>
        <button
          type="button"
          className="mini-button danger"
          onClick={clearDone}
          disabled={doneCount === 0}
        >
          Clear All Done ({doneCount})
        </button>
      </div>

      {selecting && (
        <div className="selection-actions">
          <div className="selection-summary">
            <span>{selectedVisible.length} selected</span>
            <button type="button" onClick={selectAllShown} disabled={tasks.length === 0}>
              {everyVisibleSelected ? 'Deselect All' : 'Select All Shown'}
            </button>
          </div>
          <div className="selection-buttons">
            <button
              type="button"
              className="mini-button"
              onClick={() => changeSelected(true)}
              disabled={selectedVisible.length === 0}
            >
              Mark Selected Done
            </button>
            <button
              type="button"
              className="mini-button secondary"
              onClick={() => changeSelected(false)}
              disabled={selectedVisible.length === 0}
            >
              Mark Not Done
            </button>
            <button
              type="button"
              className="mini-button danger"
              onClick={deleteSelected}
              disabled={selectedVisible.length === 0}
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      <div className="scroll-list" aria-live="polite">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            groupName={getGroupName ? getGroupName(task) : undefined}
            selecting={selecting}
            selected={selectedVisible.includes(task.id)}
            onSelect={() => toggleSelection(task.id)}
          />
        ))}
        {tasks.length === 0 && <p className="empty-state">No tasks match this view.</p>}
      </div>
    </>
  )
}
