import './App.css'

import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

function App() {
    return (
        <main className="mx-auto flex w-full max-w-xl flex-col justify-center overflow-y-scroll px-2 py-24">
            <h1 className="mb-12 text-center text-6xl font-bold md:text-7xl">
                task-list
            </h1>
            <TaskInput />
            <TaskList />
        </main>
    )
}

export default App
