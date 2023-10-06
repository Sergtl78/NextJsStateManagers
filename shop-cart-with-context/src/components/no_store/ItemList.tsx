'use client'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { ITask } from '@/types/ITask'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { useRenderCount } from '@/hooks/useRenderCount'
import { cn } from '@/lib/utils'
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons'
import UpdateTask from './UpdateTask'

const ItemList = ({
  task,
  toggleCompleted,
  updateTask,
  removeTodo,
}: {
  task: ITask
  toggleCompleted: (id: string) => void
  removeTodo: (id: string) => void
  updateTask: (id: string, text: string) => void
}) => {
  const { count, mounted } = useRenderCount()
  const [showUpdate, setShowUpdate] = useState(false)

  const [checked, setChecked] = useState(task.completed)
  return (
    <div className="flex flex-row  px-4 py-2 border rounded-2xl w-full items-center justify-between">
      <div className=" flex flex-row space-x-2 items-center">
        <Checkbox
          id={task.id}
          checked={checked}
          onCheckedChange={() => {
            setChecked(!checked)
            toggleCompleted(task.id)
          }}
        />
        <label
          htmlFor={task.id}
          className="text-sm font-medium leading-none hover:cursor-pointer "
        >
          <span className={cn(task.completed ? 'line-through' : '')}>
            {task.text}
          </span>
        </label>
      </div>
      <div className="flex flex-row items-center space-x-2">
        {showUpdate ? (
          <UpdateTask
            task={task}
            updateTask={updateTask}
            setShowUpdate={setShowUpdate}
          />
        ) : (
          <div className="flex flex-row items-center space-x-2">
            {mounted ? (
              <span className="text-sm">Render: {count}</span>
            ) : (
              <Skeleton className="w-20 h-6" />
            )}
            <Button
              size={'icon'}
              variant={'ghost'}
              onClick={() => setShowUpdate(!showUpdate)}
              className="text-xl font-bold hover:text-destructive"
            >
              <Pencil1Icon />
            </Button>
          </div>
        )}
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => removeTodo(task.id)}
          className="text-xl font-bold hover:text-destructive"
        >
          <Cross1Icon />
        </Button>
      </div>
    </div>
  )
}

export default ItemList
