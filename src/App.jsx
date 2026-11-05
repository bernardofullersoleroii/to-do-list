import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Book from './components/Book.jsx'
import Crow from './components/Crow.jsx'
import RolledScroll from './components/RolledScroll.jsx'
import BookRoutes, { GuideRoutes } from './router.jsx'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [bookOpen, setBookOpen] = useState(false)
  const [guideSeen, setGuideSeen] = useState(false)
  const [crowClicked, setCrowClicked] = useState(false)
  const [scrollState, setScrollState] = useState('hidden')
  const [dropX, setDropX] = useState(160)

  const guideOpen = location.pathname === '/guide'
  const backgroundPage = guideOpen
    ? location.state?.backgroundPage || { pathname: '/' }
    : location

  useEffect(() => {
    if (scrollState !== 'falling') return
    const timer = setTimeout(() => setScrollState('rolled'), 850)
    return () => clearTimeout(timer)
  }, [scrollState])

  useEffect(() => {
    if (guideOpen) setGuideSeen(true)
  }, [guideOpen])

  function clickCrow(event) {
    if (crowClicked) return
    const rect = event.currentTarget.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    setDropX(Math.max(55, Math.min(window.innerWidth - 55, center)))
    setCrowClicked(true)
    setScrollState('falling')
  }

  function openGuide() {
    const background = {
      pathname: guideOpen ? '/' : location.pathname,
      search: location.search,
      hash: location.hash,
    }
    setGuideSeen(true)
    navigate('/guide', { state: { backgroundPage: background } })
  }

  function closeGuide() {
    const previous = location.state?.backgroundPage
    navigate(previous?.pathname || '/', { replace: true })
  }

  return (
    <main className="scene">
      <div className="sky-vignette" />
      <Crow flying={crowClicked} onCrowClick={clickCrow} />
      <Book
        open={bookOpen}
        unlocked={guideSeen}
        onToggle={() => guideSeen && setBookOpen(value => !value)}
      >
        <BookRoutes location={backgroundPage} />
      </Book>
      {scrollState !== 'hidden' && (
        <RolledScroll
          dropX={dropX}
          falling={scrollState === 'falling'}
          onOpen={openGuide}
        />
      )}
      {guideOpen && <GuideRoutes onClose={closeGuide} />}
      <div className="scene-footer">ONE TASK AT A TIME</div>
    </main>
  )
}
