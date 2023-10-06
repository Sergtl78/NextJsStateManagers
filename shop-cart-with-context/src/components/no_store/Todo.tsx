'use client'

import React, { useState } from 'react'
import AddTask from './AddTask'
import ListTask from './ListTask'
import { ITask } from '@/types/ITask'

type Props = {
  initialTasks: ITask[]
}

const Todo = ({ initialTasks }: Props) => {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)

  const addTask = (textInput: string) => {
    setTasks([
      { id: Date.now().toString(), text: textInput, completed: false },
      ...tasks,
    ])
  }
  const updateTask = (id: string, text: string) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              text,
            }
          : item
      )
    )
  }
  const toggleCompleted = (id: string) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    )
  }
  const removeTodo = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  return (
    <div className="flex flex-col mt-10 w-full max-w-lg">
      <h2 className="h2">No store</h2>
      <p>Без использования State menages</p>
      <AddTask addTask={addTask} />
      <ListTask
        tasks={tasks}
        toggleCompleted={toggleCompleted}
        removeTodo={removeTodo}
        updateTask={updateTask}
      />
    </div>
  )
}

export default Todo
