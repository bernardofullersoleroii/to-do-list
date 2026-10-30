import { useRef, useState } from 'react'

export default function useDrag() {
  const [position, setPosition] = useState(null)
  const dragging = useRef(null)
  const moved = useRef(false)

  function startDrag(event, element) {
    if (event.button !== 0) return
    const rect = element.getBoundingClientRect()
    dragging.current = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    }
    moved.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event) {
    if (!dragging.current) return
    const drag = dragging.current
    const dx = event.clientX - drag.x
    const dy = event.clientY - drag.y
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved.current = true
    const left = Math.max(0, Math.min(window.innerWidth - drag.width, drag.left + dx))
    const top = Math.max(0, Math.min(window.innerHeight - drag.height, drag.top + dy))
    setPosition({ left, top })
  }

  function stopDrag() {
    dragging.current = null
  }

  function resetPosition() {
    setPosition(null)
  }

  return { position, moved, startDrag, moveDrag, stopDrag, resetPosition }
}
