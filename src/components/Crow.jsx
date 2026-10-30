export default function Crow({ flying, clicked, onCrowClick }) {
  if (!flying) {
    return (
      <div className="standing-crow">
        <img src="/images/crow-standing.png" alt="Standing black crow" />
        <div className="speech-bubble">
          <strong>Caww caww!</strong>
          <small>Welcome!</small>
        </div>
      </div>
    )
  }

  return (
    <button
      className="crow-flight"
      type="button"
      onClick={onCrowClick}
      disabled={clicked}
      title={clicked ? 'Flying crow' : 'Click the crow for the user guide'}
      aria-label={clicked ? 'Flying crow' : 'Click the crow for the user guide'}
    >
      <img src="/images/crow-flying.png" alt="" />
    </button>
  )
}
