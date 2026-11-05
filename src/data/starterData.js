export const starterGroups = [
  { id: 'school', name: 'School Activities' },
  { id: 'personal', name: 'Personal Tasks' },
]

export const starterTasks = [
  { id: 1, groupId: 'school', text: 'Finish the React laboratory', done: false, due: '' },
  { id: 2, groupId: 'personal', text: 'Plan tomorrow’s activities', done: true, due: '' },
]

export function readSaved(key, starter) {
  try {
    const value = localStorage.getItem(key)
    const saved = value ? JSON.parse(value) : starter
    return Array.isArray(saved) ? saved : starter
  } catch {
    return starter
  }
}
