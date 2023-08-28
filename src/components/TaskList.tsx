import { useMemo, useState } from 'react'

import { useTasks } from '../hooks/useTasks'
import TaskItem from './TaskItem'
import TextField from './TextField'
import { type Filter } from '../types'
import ShouldRender from './ShouldRender'

import { AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const TaskList: React.FC = () => {
    const { tasks } = useTasks()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filter, setFilter] = useState<Filter>('all')

    const filteredTasks = useMemo(() => {
        const shouldRunFilter = filter !== 'all'
        const shouldFilterOutCompleted = filter === 'active'

        if (!shouldRunFilter) {
            return tasks.filter((task) => task.content.startsWith(searchQuery))
        }

        if (shouldFilterOutCompleted) {
            return tasks.filter((task) => {
                return task.content.startsWith(searchQuery) && !task.isCompleted
            })
        }

        return tasks.filter((task) => {
            return task.content.startsWith(searchQuery) && task.isCompleted
        })
    }, [tasks, searchQuery, filter])

    return (
        <div className="flex flex-col gap-3">
            <TaskListFilterPanel filter={filter} setFilter={setFilter} />
            <TextField
                placeholder="Szukaj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className="flex flex-col gap-1 overflow-x-hidden" role="list">
                <ShouldRender if={!tasks.length}>
                    <p className="text-center text-xs font-semibold">
                        Nie masz jeszcze żadnego zadania, dodaj coś.
                    </p>
                </ShouldRender>
                <ShouldRender if={tasks.length && !filteredTasks.length}>
                    <p className="text-center text-xs font-semibold">
                        Brak zadań z takim opisem.
                    </p>
                </ShouldRender>
                <ShouldRender if={filteredTasks.length}>
                    <AnimatePresence>
                        {filteredTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </AnimatePresence>
                </ShouldRender>
            </ul>
        </div>
    )
}

export default TaskList

const TaskListFilterPanel: React.FC<{
    filter: Filter
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
}> = ({ filter, setFilter }) => {
    return (
        <div className="flex flex-row justify-center gap-3 text-center">
            <button
                className={clsx(
                    `${filter !== 'all' && 'text-rosePine-highlightHigh'}`,
                )}
                onClick={() => setFilter('all')}
            >
                Wszystkie
            </button>
            <button
                className={clsx(
                    `${
                        filter !== 'completed' && 'text-rosePine-highlightHigh'
                    }`,
                )}
                onClick={() => setFilter('completed')}
            >
                Ukończone
            </button>
            <button
                className={clsx(
                    `${filter !== 'active' && 'text-rosePine-highlightHigh'}`,
                )}
                onClick={() => setFilter('active')}
            >
                Aktywne
            </button>
        </div>
    )
}
