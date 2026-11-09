import { useState } from 'react'
import { GENRES, PLATFORMS, STATUSES, emptyGame } from '../Interfaces/game'
import StarRating from './StarRating'

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  )
}

/**
 * Ekleme ve güncelleme için ortak form.
 * initial verilirse düzenleme modunda açılır.
 */
export default function GameForm({ initial, onSubmit, onCancel }) {
  const isEdit = Boolean(initial)
  const [form, setForm] = useState(() => ({ ...emptyGame(), ...initial }))
  const [errors, setErrors] = useState({})

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Oyun adı zorunlu.'
    else if (form.title.trim().length > 80) next.title = 'En fazla 80 karakter olabilir.'
    const hours = Number(form.hoursPlayed)
    if (Number.isNaN(hours) || hours < 0) next.hoursPlayed = 'Geçerli bir süre gir.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      title: form.title.trim(),
      platform: form.platform,
      genre: form.genre,
      status: form.status,
      rating: Number(form.rating) || 0,
      hoursPlayed: Math.round(Number(form.hoursPlayed) * 10) / 10 || 0,
      notes: form.notes.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field label="Oyun adı" error={errors.title}>
        <input
          autoFocus
          type="text"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="Örn. Hollow Knight"
          className={fieldClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Platform">
          <select
            value={form.platform}
            onChange={(e) => set('platform', e.target.value)}
            className={fieldClass}
          >
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field label="Tür">
          <select
            value={form.genre}
            onChange={(e) => set('genre', e.target.value)}
            className={fieldClass}
          >
            {GENRES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Durum">
          <select
            value={form.status}
            onChange={(e) => set('status', e.target.value)}
            className={fieldClass}
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Oynanan saat" error={errors.hoursPlayed}>
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.hoursPlayed}
            onChange={(e) => set('hoursPlayed', e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-slate-300">Puan</span>
        <StarRating value={form.rating} onChange={(v) => set('rating', v)} size="text-2xl" />
      </div>

      <Field label="Notlar">
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Düşüncelerin, hatırlatmalar..."
          className={`${fieldClass} resize-none`}
        />
      </Field>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-xl bg-ink-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-ink-600"
        >
          Vazgeç
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-500"
        >
          {isEdit ? 'Güncelle' : 'Ekle'}
        </button>
      </div>
    </form>
  )
}
