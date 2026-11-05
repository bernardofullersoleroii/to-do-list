import BookNavigation from './BookNavigation.jsx'

export default function Book({ open, unlocked, onToggle, children }) {
  if (!open) {
    return (
      <button
        className={'closed-book' + (unlocked ? '' : ' book-locked')}
        type="button"
        onClick={onToggle}
        disabled={!unlocked}
        title={unlocked ? 'Open the to-do list' : 'Open the crow guide first'}
      >
        <img src="/images/book-closed.png" alt="Closed antique book" />
        <span>{unlocked ? 'Click to open your to-do list' : 'Click the crow and open the guide first'}</span>
      </button>
    )
  }

  return (
    <div className="book-stage book-appear">
      <img className="book-picture" src="/images/book-open.png" alt="" />
      <div className="book-content">
        <button className="close-book" type="button" onClick={onToggle} aria-label="Close book">×</button>
        <BookNavigation />
        <section className="book-right" aria-label="Current to-do list page">
          {children}
        </section>
      </div>
    </div>
  )
}
