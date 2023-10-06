'use client'

import React, { useEffect, useState } from 'react'
import { ITask } from '@/types/ITask'
import { useRenderCount } from '@/hooks/useRenderCount'
import Header from '../Header'
import ItemList from './ItemList'

const ListTask = ({
  tasks,
  toggleCompleted,
  removeTodo,
  updateTask,
}: {
  tasks: ITask[]
  toggleCompleted: (id: string) => void
  removeTodo: (id: string) => void
  updateTask: (id: string, text: string) => void
}) => {
  const { count, mounted } = useRenderCount()

  return (
    <section className="flex flex-col w-full space-y-2 border rounded-2xl shadow-md p-4 ">
      <Header count={count} title="List todo" mounted={mounted} />
      {tasks.length === 0 ? (
        <p>No todo</p>
      ) : (
        tasks.map((task) => (
          <ItemList
            key={task.id}
            task={task}
            toggleCompleted={toggleCompleted}
            removeTodo={removeTodo}
            updateTask={updateTask}
          />
        ))
      )}
      {/* <pre>{JSON.stringify(tasks)}</pre> */}
    </section>
  )
}

export default ListTask
