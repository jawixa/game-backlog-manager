const STYLES = {
  success: 'border-emerald-500/40 bg-emerald-950/90 text-emerald-100',
  error: 'border-rose-500/40 bg-rose-950/90 text-rose-100',
  info: 'border-sky-500/40 bg-sky-950/90 text-sky-100',
}

/**
 * Sağ alt köşede görünen bildirimler (eklendi, silindi vb.).
 */
export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:left-auto sm:right-6 sm:bottom-6"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`animate-toast-in pointer-events-auto flex w-full max-w-sm items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl backdrop-blur sm:w-auto ${STYLES[t.type] ?? STYLES.success}`}
        >
          <span>{t.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            aria-label="Bildirimi kapat"
            className="cursor-pointer text-current/60 hover:text-current"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
