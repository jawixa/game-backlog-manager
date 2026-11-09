import { useCallback, useRef, useState } from 'react'

/**
 * Basit toast bildirim yönetimi.
 * toasts: [{ id, message, type }]
 */
export function useToast(duration = 3000) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (message, type = 'success') => {
      const id = ++counter.current
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => dismiss(id), duration)
    },
    [dismiss, duration],
  )

  return { toasts, notify, dismiss }
}
