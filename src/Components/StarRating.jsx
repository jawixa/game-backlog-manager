/**
 * 1-5 yıldızlı puanlama. onChange verilmezse salt okunur gösterir.
 * Aynı yıldıza tekrar tıklamak puanı sıfırlar.
 */
export default function StarRating({ value = 0, onChange, size = 'text-lg' }) {
  const readOnly = typeof onChange !== 'function'

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${size}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Puan: ${value} / 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value
        const color = active ? 'text-amber-400' : 'text-ink-600'

        if (readOnly) {
          return (
            <span key={star} className={color} aria-hidden="true">
              ★
            </span>
          )
        }

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} yıldız`}
            onClick={() => onChange(star === value ? 0 : star)}
            className={`${color} cursor-pointer leading-none transition hover:scale-110 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-accent-400`}
          >
            ★
          </button>
        )
      })}
    </div>
  )
}
