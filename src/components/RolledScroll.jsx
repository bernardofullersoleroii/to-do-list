import useDrag from '../hooks/useDrag.js'

export default function RolledScroll({ dropX, falling, onOpen }) {
  const drag = useDrag()
  const style = drag.position
    ? { left: drag.position.left, top: drag.position.top, bottom: 'auto', transform: 'none' }
    : { left: dropX + 'px' }

  function handleClick() {
    if (drag.moved.current) {
      drag.moved.current = false
      return
    }
    if (!falling) onOpen()
  }

  return (
    <button
      className={'fallen-scroll' + (falling ? ' scroll-fall' : '')}
      style={style}
      type="button"
      disabled={falling}
      title="Drag this scroll or click to open the guide"
      aria-label="Drag or open the user guide scroll"
      onPointerDown={event => drag.startDrag(event, event.currentTarget)}
      onPointerMove={drag.moveDrag}
      onPointerUp={drag.stopDrag}
      onPointerCancel={drag.stopDrag}
      onClick={handleClick}
    >
      <img src="/images/scroll-rolled.png" alt="Rolled parchment" draggable="false" />
      {!falling && <span>Open Guide</span>}
    </button>
  )
}
