'use client'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRenderCount } from '@/hooks/useRenderCount'
import Header from '../Header'
import { Skeleton } from '../ui/skeleton'
import { ITask } from '@/types/ITask'

const UpdateTask = ({
  task,
  updateTask,
  setShowUpdate,
}: {
  task: ITask
  updateTask: (id: string, text: string) => void
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [text, setText] = useState('')

  return (
    <div className="grid w-full max-w-sm items-center gap-1">
      <div className="flex flex-row">
        <Input
          id="text"
          type="text"
          defaultValue={task.text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          onClick={() => {
            updateTask(task.id, text)
            setText('')
            setShowUpdate(false)
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default UpdateTask
