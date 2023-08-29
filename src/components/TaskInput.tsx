import { useRef, useState } from 'react'

import Button from './Button'
import TextField from './TextField'
import { useTasks } from '../hooks/useTasks'

const TaskInput: React.FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const { dispatch } = useTasks()

    const [content, setContent] = useState<string>('')

    function handleSetValue(e: React.ChangeEvent<HTMLInputElement>) {
        setContent(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        dispatch.addTask({ content })
        setContent('')
        inputRef.current?.focus()
    }

    return (
        <form onSubmit={handleSubmit} className="mb-16">
            <div className="group flex w-full flex-row items-center justify-center">
                <TextField
                    ref={inputRef}
                    value={content}
                    onChange={handleSetValue}
                    placeholder="Dodaj nowe zadanie"
                    className="rounded-r-none px-3 py-4 md:text-xl"
                />
                <Button
                    className="rounded-l-none px-3 py-4 md:text-xl"
                    type="submit"
                >
                    Dodaj
                </Button>
            </div>
        </form>
    )
}

export default TaskInput
