import { STATUSES, getStatus } from '../Interfaces/game'
import StarRating from './StarRating'

/**
 * Tek bir oyunu gösteren kart. Durumu hızlıca değiştirme, düzenleme ve silme içerir.
 */
export default function GameCard({ game, onEdit, onDelete, onStatusChange }) {
  const status = getStatus(game.status)

  return (
    <article className="group flex flex-col rounded-2xl border border-white/5 bg-ink-800/80 p-5 shadow-lg shadow-black/20 backdrop-blur transition hover:border-accent-500/40">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white" title={game.title}>
            {game.title}
          </h3>
          <p className="mt-0.5 text-sm text-slate-400">
            {game.platform} · {game.genre}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${status.badge}`}
        >
          {status.label}
        </span>
      </header>

      <div className="mt-4 flex items-center justify-between">
        <StarRating value={game.rating} />
        <span className="text-sm text-slate-400">
          <strong className="text-slate-200">{game.hoursPlayed}</strong> saat
        </span>
      </div>

      {game.notes && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {game.notes}
        </p>
      )}

      <footer className="mt-auto flex items-center gap-2 pt-4">
        <select
          value={game.status}
          onChange={(e) => onStatusChange(game, e.target.value)}
          aria-label={`${game.title} durumunu değiştir`}
          className="min-w-0 flex-1 cursor-pointer rounded-lg border border-white/10 bg-ink-700 px-2 py-1.5 text-sm text-slate-200 focus:border-accent-500 focus:outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onEdit(game)}
          className="cursor-pointer rounded-lg bg-ink-700 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:bg-ink-600"
        >
          Düzenle
        </button>
        <button
          type="button"
          onClick={() => onDelete(game)}
          className="cursor-pointer rounded-lg bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
        >
          Sil
        </button>
      </footer>
    </article>
  )
}
