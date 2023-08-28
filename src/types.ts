export type Task = {
    id: number
    content: string
    isCompleted: boolean
}

export type Filter = 'all' | 'completed' | 'active'

export type EditableTaskField = 'content' | 'isCompleted'
