export default function Crow({ flying, onCrowClick }) {
  if (!flying) {
    return (
      <button
        className="standing-crow"
        type="button"
        onClick={onCrowClick}
        title="Click the crow to receive the guide"
        aria-label="Click the crow to drop the user guide scroll"
      >
        <img src="/images/crow-standing.png" alt="" />
        <span className="speech-bubble">
          <strong>Caww caww!</strong>
          <small>Click me for the guide</small>
        </span>
      </button>
    )
  }

  return (
    <div className="crow-flight" aria-hidden="true">
      <img src="/images/crow-flying.png" alt="" />
    </div>
  )
}
