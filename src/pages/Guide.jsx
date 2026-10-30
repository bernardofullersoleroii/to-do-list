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
          <h2>User Guide</h2>
          <p className="scroll-intro">How to use your to-do list</p>
          <ol>
            <li><strong>Create a group.</strong> Open Task Groups, enter a name, and select Add Group.</li>
            <li><strong>Open a group.</strong> Click Open to see only tasks assigned to that group.</li>
            <li><strong>Add a task.</strong> Use Quick Add on the Dashboard, My Tasks, or inside a group. Choose a group when prompted.</li>
            <li><strong>Add a deadline.</strong> Select a date if needed. Deadlines are optional.</li>
            <li><strong>Mark Done.</strong> Click the circle next to a task to mark it Done.</li>
            <li><strong>Mark Not Done.</strong> Click the same circle again to return it to Not Done.</li>
            <li><strong>Edit a task.</strong> Click Edit, change its name or deadline, and click Save.</li>
            <li><strong>Delete a task.</strong> Click Delete beside the task. The task disappears from its group.</li>
            <li><strong>Manage groups.</strong> Edit a group's name or Delete the group. Deleting a group also deletes its tasks.</li>
            <li><strong>Search and filter.</strong> Open My Tasks to search by text or view All, Done, and Not Done tasks.</li>
            <li><strong>Check the dashboard.</strong> The Total, Done, and Not Done counts update when your tasks change.</li>
            <li><strong>Navigate pages.</strong> Use the glowing text links on the left page of the book. The site uses React Router, so navigation does not reload the website.</li>
            <li><strong>Close or reopen the book.</strong> Use X on the open book; click the small closed book to open it again.</li>
            <li><strong>Move this guide.</strong> Drag the top handle with a finger or mouse. Press Reset position to center it.</li>
            <li><strong>Close and reopen this guide.</strong> Close with X. The rolled scroll stays where the crow dropped it; click it again anytime.</li>
            <li><strong>Your tasks stay saved.</strong> Browser storage remembers your tasks and groups after a refresh on this device.</li>
            <li><strong>Developers.</strong> Open Developers from the book to view the complete names and assigned roles of the team.</li>
          </ol>
          <button className="scroll-done" type="button" onClick={onClose}>Close Guide</button>
        </div>
      </section>
    </div>
  )
}
