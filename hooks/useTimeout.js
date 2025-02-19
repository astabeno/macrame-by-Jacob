import { useEffect, useState } from 'react'

export function useTimeout(duration) {
  const [visible, setVisible] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])
  
  return visible
}