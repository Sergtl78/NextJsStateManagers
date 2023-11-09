import { useEffect, useRef, useState } from 'react'

export const useRenderCount = () => {
  const countRef = useRef(0)

  countRef.current++
  const count = countRef.current
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return { count, mounted }
}
