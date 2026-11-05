export default function ProgressBar({ total, done, label = 'Progress' }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  const pending = total - done

  return (
    <div className="progress-block">
      <div className="progress-label">
        <span>{label}</span>
        <strong>{percent}%</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: percent + '%' }} />
      </div>
      <div className="progress-counts">
        <span>{done} Done</span>
        <span>{pending} Not Done</span>
      </div>
    </div>
  )
}
