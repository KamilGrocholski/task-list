import { useMemo, useState } from 'react'

import { useTasks } from '../hooks/useTasks'
import TaskItem from './TaskItem'
import TextField from './TextField'
import { type Filter } from '../types'
import ShouldRender from './ShouldRender'
import TaskListFilterPanel from './TaskListFilterPanel'
import { filterTasks } from '../utils/tasks'
import { useDebounce } from '../hooks/useDebounce'

import { AnimatePresence } from 'framer-motion'

const TaskList: React.FC = () => {
    const { tasks } = useTasks()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const debouncedSearchQuery = useDebounce(searchQuery)
    const [filter, setFilter] = useState<Filter>('all')

    const filteredTasks = useMemo(() => {
        return filterTasks(tasks, { searchQuery: debouncedSearchQuery, filter })
    }, [tasks, filter, debouncedSearchQuery])

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
