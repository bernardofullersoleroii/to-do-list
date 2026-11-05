import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { readSaved, starterGroups, starterTasks } from '../data/starterData.js'

const newId = () => crypto.randomUUID()

const useTodoStore = create(
  persist(
    (set) => ({
      groups: readSaved('witch-groups', starterGroups),
      tasks: readSaved('witch-tasks', starterTasks),

      addGroup: (name) => set(state => ({
        groups: [
          ...state.groups,
          { id: newId(), name }
        ]
      })),

      renameGroup: (id, name) => set(state => ({
        groups: state.groups.map(group =>
          group.id === id ? { ...group, name } : group
        )
      })),

      deleteGroup: (id) => set(state => ({
        groups: state.groups.filter(group => group.id !== id),
        tasks: state.tasks.filter(task => task.groupId !== id)
      })),

      addTask: (groupId, text, due) => set(state => ({
        tasks: [
          ...state.tasks,
          {
            id: newId(),
            groupId,
            text,
            due,
            done: false
          }
        ]
      })),

      toggleTask: (id) => set(state => ({
        tasks: state.tasks.map(task =>
          task.id === id
            ? { ...task, done: !task.done }
            : task
        )
      })),

      editTask: (id, text, due) => set(state => ({
        tasks: state.tasks.map(task =>
          task.id === id
            ? { ...task, text, due }
            : task
        )
      })),

      deleteTask: (id) => set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),

      clearDone: (groupId) => set(state => ({
        tasks: state.tasks.filter(task =>
          task.groupId !== groupId || !task.done
        )
      })),

      clearAllDone: () => set(state => ({
        tasks: state.tasks.filter(task => !task.done)
      })),

      setTasksDone: (ids, done) => set(state => {
        const selected = new Set(ids)
        return {
          tasks: state.tasks.map(task =>
            selected.has(task.id) ? { ...task, done } : task
          )
        }
      }),

      deleteTasks: (ids) => set(state => {
        const selected = new Set(ids)
        return {
          tasks: state.tasks.filter(task => !selected.has(task.id))
        }
      })
    }),
    {
      name: 'lab4-todo-storage',
      partialize: state => ({
        groups: state.groups,
        tasks: state.tasks
      })
    }
  )
)

export default useTodoStore
