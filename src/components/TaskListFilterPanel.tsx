import { type Filter } from '../types'
import Button from './Button'

import clsx from 'clsx'

type TaskListFilterPanelConfig = { selected: Filter; label: string }[]
const taskListFilterPanelConfig: TaskListFilterPanelConfig = [
    { selected: 'all', label: 'Wszystkie' },
    { selected: 'active', label: 'Aktywne' },
    { selected: 'completed', label: 'Ukończone' },
]

const TaskListFilterPanel: React.FC<{
    filter: Filter
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
}> = ({ filter, setFilter }) => {
    return (
        <div className="flex flex-row justify-center gap-3 text-center">
            {taskListFilterPanelConfig.map(({ label, selected }) => {
                const isSelected = filter === selected

                return (
                    <Button
                        variant="void"
                        size="sm"
                        key={label}
                        className={clsx(
                            !isSelected &&
                                'text-rosePine-highlightMed hover:text-rosePine-highlightHigh',
                        )}
                        onClick={() => setFilter(selected)}
                    >
                        {label}
                    </Button>
                )
            })}
        </div>
    )
}

export default TaskListFilterPanel
