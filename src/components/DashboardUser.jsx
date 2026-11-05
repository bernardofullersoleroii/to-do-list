import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedUser } from '../api/users.js'

export default function DashboardUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true

    setLoading(true)
    setError('')

    getFeaturedUser()
      .then(data => {
        if (active) setUser(data)
      })
      .catch(() => {
        if (active) setError('Could not load the sample user.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [retry])

  return (
    <section
      className="mt-3 rounded-lg border border-amber-900/25 bg-amber-50/20 p-3 sm:p-4"
      aria-label="Sample user information"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-bold text-amber-950">Sample User</h3>
        <Link to="/users" className="text-xs text-amber-900 underline hover:text-orange-700">
          See more users
        </Link>
      </div>

      {loading && (
        <p role="status" className="text-xs text-amber-900">
          Loading user information...
        </p>
      )}

      {error && (
        <div role="alert" className="flex flex-wrap items-center gap-2 text-xs text-red-900">
          <span>{error}</span>
          <button
            type="button"
            className="mini-button secondary"
            onClick={() => setRetry(value => value + 1)}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && user && (
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={user.image}
            alt={`${user.firstName} profile`}
            className="h-12 w-12 shrink-0 rounded-full border border-amber-900/25 bg-amber-100 object-cover"
          />
          <div className="min-w-0 flex-1 text-xs text-amber-950">
            <strong className="block text-sm">
              {user.firstName} {user.lastName}
            </strong>
            <span className="block">@{user.username}</span>
            <span className="block break-all text-[11px]">{user.email}</span>
          </div>
        </div>
      )}

      <p className="mt-2 text-[10px] text-amber-900/80">
        Sample information from DummyJSON, loaded using Axios.
      </p>
    </section>
  )
}
