import { useEffect } from 'react'

/**
 * Erişilebilir basit modal: Esc ile kapanır, arka plana tıklayınca kapanır.
 */
export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="animate-fade-in fixed inset-0 z-40 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-900 p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="cursor-pointer rounded-lg px-2 py-1 text-slate-400 transition hover:bg-ink-700 hover:text-white"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
