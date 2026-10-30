import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Book from './components/Book.jsx'
import Crow from './components/Crow.jsx'
import RolledScroll from './components/RolledScroll.jsx'
import BookRoutes, { GuideRoutes } from './router.jsx'
import { readSaved, starterGroups, starterTasks } from './data/starterData.js'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [groups, setGroups] = useState(() => readSaved('witch-groups', starterGroups))
  const [tasks, setTasks] = useState(() => readSaved('witch-tasks', starterTasks))
  const [introDone, setIntroDone] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [crowFlying, setCrowFlying] = useState(false)
  const [crowClicked, setCrowClicked] = useState(false)
  const [scrollState, setScrollState] = useState('hidden')
  const [dropX, setDropX] = useState(150)

  const guideOpen = location.pathname === '/guide'
  const backgroundPage = guideOpen
    ? location.state?.backgroundPage || { pathname: '/' }
    : location

  useEffect(() => {
    const crowTimer = setTimeout(() => setCrowFlying(true), 2400)
    const bookTimer = setTimeout(() => {
      setIntroDone(true)
      setBookOpen(true)
    }, 5000)
    return () => {
      clearTimeout(crowTimer)
      clearTimeout(bookTimer)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('witch-groups', JSON.stringify(groups))
  }, [groups])

  useEffect(() => {
    localStorage.setItem('witch-tasks', JSON.stringify(tasks))
  }, [tasks])

  function addGroup(name) {
    setGroups(old => [...old, { id: crypto.randomUUID(), name }])
  }

  function renameGroup(id, name) {
    setGroups(old => old.map(group => group.id === id ? { ...group, name } : group))
  }

  function deleteGroup(id) {
    setGroups(old => old.filter(group => group.id !== id))
    setTasks(old => old.filter(task => task.groupId !== id))
  }

  function addTask(groupId, text, due) {
    setTasks(old => [...old, { id: crypto.randomUUID(), groupId, text, due, done: false }])
  }

  function toggleTask(id) {
    setTasks(old => old.map(task => task.id === id ? { ...task, done: !task.done } : task))
  }

  function editTask(id, text, due) {
    setTasks(old => old.map(task => task.id === id ? { ...task, text, due } : task))
  }

  function deleteTask(id) {
    setTasks(old => old.filter(task => task.id !== id))
  }

  function clearDone(groupId) {
    setTasks(old => old.filter(task => task.groupId !== groupId || !task.done))
  }

  function clickCrow(event) {
    if (crowClicked || !crowFlying) return
    const rect = event.currentTarget.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    setDropX(Math.max(65, Math.min(window.innerWidth - 65, center)))
    setCrowClicked(true)
    setScrollState('falling')
    setTimeout(() => setScrollState('rolled'), 850)
  }

  function openGuide() {
    const background = {
      pathname: location.pathname === '/guide' ? '/' : location.pathname,
      search: location.search,
      hash: location.hash,
    }
    navigate('/guide', { state: { backgroundPage: background } })
  }

  function closeGuide() {
    const previous = location.state?.backgroundPage
    navigate(previous?.pathname || '/', { replace: true })
  }

  const taskActions = { groups, tasks, addTask, toggleTask, editTask, deleteTask }

  return (
    <main className="scene">
      <div className="sky-vignette" />
      <div className="site-label">HALLOWEEN TO-DO LIST</div>
      <Crow flying={crowFlying} clicked={crowClicked} onCrowClick={clickCrow} />

      {introDone ? (
        <Book open={bookOpen} groups={groups} onToggle={() => setBookOpen(old => !old)}>
          <BookRoutes
            location={backgroundPage}
            groups={groups}
            tasks={tasks}
            taskActions={taskActions}
            addTask={addTask}
            addGroup={addGroup}
            renameGroup={renameGroup}
            deleteGroup={deleteGroup}
            clearDone={clearDone}
          />
        </Book>
      ) : <div className="intro-note">Opening your to-do list...</div>}

      {scrollState !== 'hidden' && (
        <RolledScroll
          dropX={dropX}
          falling={scrollState === 'falling'}
          onOpen={openGuide}
        />
      )}
      {guideOpen && (
        <GuideRoutes onClose={closeGuide} />
      )}
      <div className="scene-footer">ONE TASK AT A TIME</div>
    </main>
  )
}
