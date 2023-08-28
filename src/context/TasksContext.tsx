import { createContext } from 'react'

import { type Task } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateTaskId, sortTasks } from '../utils/tasks'

type AddTask = (payload: Pick<Task, 'content'>) => void
type RemoveTask = (payload: Pick<Task, 'id'>) => void
type EditTask = (payload: Pick<Task, 'id' | 'isCompleted' | 'content'>) => void

type TasksContextType = {
    tasks: Task[]
    dispatch: {
        addTask: AddTask
        removeTask: RemoveTask
        editTask: EditTask
    }
}

export const TasksContext = createContext({} as TasksContextType)

const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])

    const addTask: AddTask = (payload) => {
        const newTask: Task = {
            id: generateTaskId(),
            isCompleted: false,
            content: payload.content,
        }
        const newTasks = [newTask, ...tasks]
        sortTasks(newTasks)
        setTasks(newTasks)
    }

    const removeTask: RemoveTask = (payload) => {
        const newTasks = tasks.filter((task) => task.id !== payload.id)
        sortTasks(newTasks)
        setTasks(newTasks)
    }

    const editTask: EditTask = (payload) => {
        const newTasks: Task[] = tasks.map((task) => {
            if (task.id === payload.id) {
                return {
                    id: task.id,
                    isCompleted: payload.isCompleted,
                    content: payload.content,
                }
            }
            return task
        })
        sortTasks(newTasks)
        setTasks(newTasks)
    }

    return (
        <TasksContext.Provider
            value={{
                tasks,
                dispatch: {
                    addTask,
                    removeTask,
                    editTask,
                },
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider
