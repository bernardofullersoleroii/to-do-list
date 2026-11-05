import { NavLink } from 'react-router-dom'
import useTodoStore from '../store/useTodoStore.js'

export default function BookNavigation() {
  const groups = useTodoStore(state => state.groups)
  const links = [
    { path: '/', label: 'Dashboard', end: true },
    { path: '/tasks', label: 'My Tasks' },
    { path: '/groups', label: 'Task Groups' },
    { path: '/users', label: 'User Information' },
    { path: '/developers', label: 'Developers' },
  ]

  return (
    <section className="book-left">
      <div className="book-brand">
        <div className="eyebrow">HALLOWEEN EDITION</div>
        <h1>To-Do List</h1>
        <p>Keep your day organized.</p>
      </div>
      <div className="nav-title">CONTENTS</div>
      <nav className="book-nav" aria-label="Book navigation">
        {links.map(link => (
          <NavLink
            key={link.path}
            end={link.end}
            to={link.path}
            className={({ isActive }) => 'book-link' + (isActive ? ' selected' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="book-side-note">{groups.length} task groups</div>
    </section>
  )
}
