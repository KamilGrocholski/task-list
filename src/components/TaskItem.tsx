import { useRef, useState } from 'react'

import { type Task } from '../types'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import TextField from './TextField'
import { useTasks } from '../hooks/useTasks'
import Button from './Button'
import Checkbox from './Checkbox'

import { FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [content, setContent] = useState<string>(task.content)
    const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted)

    const contentContainerRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(contentContainerRef, handleEditContent)
    const editInputRef = useRef<HTMLInputElement | null>(null)

    const { dispatch } = useTasks()

    function handleRemove() {
        dispatch.removeTask({ id: task.id })
    }

    function handleEditContent() {
        if (task.content !== content) {
            dispatch.editTask({
                id: task.id,
                content,
                isCompleted,
            })
        }

        editInputRef.current?.blur()
        setIsEditing(false)
    }

    function handleEditIsCompleted() {
        setIsCompleted((prev) => {
            const newIsCompleted = !prev

            dispatch.editTask({
                id: task.id,
                content,
                isCompleted: newIsCompleted,
            })
            return newIsCompleted
        })
    }

    function handleClickOnContentContainer() {
        if (isEditing) return
        setIsEditing(true)
        editInputRef.current?.focus()
    }

    function handleEditInputOnKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
    ) {
        if (e.key === 'Enter') {
            handleEditContent()
        }
    }

    return (
        <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.2 }}
            className="flex flex-row items-center gap-1 rounded-md bg-rosePine-overlay px-3 py-1"
            role="listitem"
        >
            <div className="flex items-center">
                <Checkbox
                    checked={isCompleted}
                    onChange={handleEditIsCompleted}
                />
            </div>
            <div
                className="base-transition flex flex-grow flex-col items-center px-2"
                onClick={handleClickOnContentContainer}
                ref={contentContainerRef}
            >
                {isEditing ? (
                    <TextField
                        ref={editInputRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleEditInputOnKeyDown}
                        sizeField="sm"
                    />
                ) : (
                    <TextField
                        value={content}
                        readOnly
                        className={clsx(
                            isCompleted && 'text-rosePine-subtle line-through',
                        )}
                        sizeField="sm"
                    />
                )}
            </div>
            <div className="flex flex-row items-center">
                <Button
                    variant="void"
                    shape="round"
                    onClick={handleRemove}
                    className="base-transition group rounded-full p-1 hover:bg-rosePine-love"
                >
                    <FaTrash className="base-transition text-rosePine-love group-hover:text-rosePine-overlay" />
                </Button>
            </div>
        </motion.li>
    )
}

export default TaskItem
