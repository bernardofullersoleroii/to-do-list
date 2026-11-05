import useDrag from '../hooks/useDrag.js'

export default function Guide({ onClose }) {
  const drag = useDrag()
  const style = drag.position
    ? { left: drag.position.left, top: drag.position.top, transform: 'none' }
    : {}

  return (
    <div className="scroll-overlay">
      <section className="scroll-sheet" style={style} role="dialog" aria-label="User guide">
        <img className="scroll-sheet-image" src="/images/scroll-open.png" alt="" />
        <div className="scroll-writing">
          <div
            className="scroll-drag-handle"
            onPointerDown={event => drag.startDrag(event, event.currentTarget.closest('.scroll-sheet'))}
            onPointerMove={drag.moveDrag}
            onPointerUp={drag.stopDrag}
            onPointerCancel={drag.stopDrag}
            title="Drag the guide around the screen"
          >
            Hold and drag to move
          </div>
          <div className="scroll-top-actions">
            <button type="button" onClick={drag.resetPosition}>Reset position</button>
            <button type="button" onClick={onClose} aria-label="Close guide">×</button>
          </div>
          <h2>How to Use</h2>
          <p className="scroll-intro">A quick guide to your to-do list</p>
          <ol>
            <li>
              <strong>Get started:</strong> Click the crow, then click the scroll it drops. Close this guide and tap the book to open your tasks.
            </li>
            <li>
              <strong>Make a group:</strong> Open Task Groups. Type a name, like Assignments, and press Add Group.
            </li>
            <li>
              <strong>Open a group:</strong> Press Open beside the group you want to see.
            </li>
            <li>
              <strong>Add a task:</strong> Type what you need to do and press Add Task. You can add tasks from My Tasks or an open group.
            </li>
            <li>
              <strong>Set a deadline:</strong> Pick a due date if you want. Tasks with the nearest dates appear first; tasks without dates come last.
            </li>
            <li>
              <strong>Filter your tasks:</strong> In My Tasks or a group, choose All, Not Done, or Done to see just the tasks you want.
            </li>
            <li>
              <strong>Finish or undo:</strong> Tap the circle beside a task to mark it Done. Tap it again to mark it Not Done.
            </li>
            <li>
              <strong>Select several tasks:</strong> Press Select Tasks, tick the tasks you want, then mark them Done, mark them Not Done, or delete them. Select All Shown only picks the tasks you can currently see.
            </li>
            <li>
              <strong>Clear completed tasks:</strong> Press Clear All Done in My Tasks or an open group. Confirm the message before anything is deleted.
            </li>
            <li>
              <strong>Change or remove:</strong> Press Edit to change a task, or Delete to remove it.
            </li>
            <li>
              <strong>Check your progress:</strong> The orange progress bar shows how much of each group you have finished.
            </li>
            <li>
              <strong>Switch pages:</strong> Use the links inside the book to open Dashboard, My Tasks, Task Groups, User Information, or Developers.
            </li>
            <li>
              <strong>See sample users:</strong> Open User Information. Axios gets sample profiles from DummyJSON. If it cannot load them, you'll see an error and can try again.
            </li>
            <li>
              <strong>How tasks are saved:</strong> Zustand keeps tasks and groups updated across pages and saves them in this browser.
            </li>
            <li>
              <strong>Move this guide:</strong> Drag the bar at the top. Use Reset position if it gets in the way. Close it with X; the rolled scroll stays available.
            </li>
            <li>
              <strong>Meet the team:</strong> Open Developers to see the group members and their roles.
            </li>
          </ol>
          <button className="scroll-done" type="button" onClick={onClose}>Close Guide</button>
        </div>
      </section>
    </div>
  )
}
