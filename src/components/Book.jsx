import BookNavigation from './BookNavigation.jsx'

export default function Book({ open, groups, onToggle, children }) {
  if (!open) {
    return (
      <button className="closed-book" type="button" onClick={onToggle} title="Open the book">
        <img src="/images/book-closed.png" alt="Closed antique book" />
        <span>Click to open your to-do list</span>
      </button>
    )
  }

  return (
    <div className="book-stage book-appear">
      <img className="book-picture" src="/images/book-open.png" alt="" />
      <div className="book-content">
        <button className="close-book" type="button" onClick={onToggle} aria-label="Close book">×</button>
        <BookNavigation groups={groups} />
        <section className="book-right" aria-label="Current to-do list page">
          {children}
        </section>
      </div>
    </div>
  )
}
