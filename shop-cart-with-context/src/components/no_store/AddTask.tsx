'use client'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRenderCount } from '@/hooks/useRenderCount'
import Header from '../Header'
import { Skeleton } from '../ui/skeleton'

const AddTask = ({ addTask }: { addTask: (text: string) => void }) => {
  const { count, mounted } = useRenderCount()
  const [task, setTask] = useState('')

  return (
    <div className="flex flex-col space-y-2 mb-4 border rounded-2xl shadow-md p-4  w-full ">
      <Header count={count} mounted={mounted} title="Add Todo" />

      <div className="grid w-full max-w-sm items-center gap-1">
        <label htmlFor="text" className="text-sm">
          Todo
        </label>
        <div className="flex flex-row">
          <Input
            id="text"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <Button
            onClick={() => {
              addTask(task)
              setTask('')
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddTask
