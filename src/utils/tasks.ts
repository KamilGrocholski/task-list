import { type Filter, type Task } from '../types'

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

export function filterTasks(
    tasks: Task[],
    { filter, searchQuery }: { searchQuery: string; filter: Filter },
): Task[] {
    const shouldFilterByIsCompleted = filter !== 'all'
    const shouldFilterOutCompleted = filter === 'active'

    if (!shouldFilterByIsCompleted) {
        return tasks.filter((task) => task.content.includes(searchQuery))
    }

    if (shouldFilterOutCompleted) {
        return tasks.filter((task) => {
            return task.content.includes(searchQuery) && !task.isCompleted
        })
    }

    return tasks.filter((task) => {
        return task.content.includes(searchQuery) && task.isCompleted
    })
}
