import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../api/users.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  const uniqueUsers = users.filter((user, index, list) => {
    const name = `${user.firstName} ${user.lastName}`.toLowerCase()
    return list.findIndex(person =>
      `${person.firstName} ${person.lastName}`.toLowerCase() === name
    ) === index
  })

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    getUsers()
      .then(data => {
        if (active) setUsers(data)
      })
      .catch(() => {
        if (active) {
          setError('Failed to retrieve users from DummyJSON. Please try again.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [reload])

  return (
    <div className="page-inner">
      <h2 className="page-heading">User Information</h2>
      <p className="page-description">Sample user profiles retrieved from DummyJSON with Axios.</p>
      <div className="user-actions">
        <button
          className="mini-button"
          type="button"
          onClick={() => setReload(value => value + 1)}
        >
          Refresh Users
        </button>
        <Link to="/" className="page-link">Back to Dashboard</Link>
      </div>
      {loading && <div className="loading-users" role="status">Loading user information...</div>}
      {error && (
        <div className="api-error" role="alert">
          <p>{error}</p>
          <button
            className="mini-button"
            type="button"
            onClick={() => setReload(value => value + 1)}
          >
            Try Again
          </button>
        </div>
      )}
      {!loading && !error && (
        <div className="users-list scroll-list">
          {uniqueUsers.map(user => (
            <div className="user-card" key={user.id}>
              <img src={user.image} alt={user.firstName + ' profile'} loading="lazy" />
              <div className="user-card-info">
                <strong>{user.firstName} {user.lastName}</strong>
                <span>@{user.username}</span>
                <small>{user.email}</small>
              </div>
            </div>
          ))}
          {users.length === 0 && <p className="empty-state">No users were returned.</p>}
        </div>
      )}
      <p className="small-note">These are demonstration profiles, not the users of this to-do list.</p>
    </div>
  )
}
