import { useEffect, useState } from 'react'

/**
 * useState ile aynı API'ye sahip, değeri LocalStorage'a otomatik yazan hook.
 * Sayfa yenilense bile veri korunur.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Depolama dolu veya kapalıysa uygulama yine de çalışmaya devam eder.
    }
  }, [key, value])

  return [value, setValue]
}
