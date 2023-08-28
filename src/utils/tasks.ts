import { type Task } from '../types'

export function generateTaskId(): Task['id'] {
    return Date.now()
}

export function sortTasks(tasks: Task[]): void {
    tasks.sort((a, b) => {
        return (
            Number(a.isCompleted) - Number(b.isCompleted) ||
            a.content.localeCompare(b.content)
        )
    })
}
