import { STATUSES } from '../Interfaces/game'

/**
 * Koleksiyon özeti: toplam oyun, toplam oynama süresi ve duruma göre dağılım.
 */
export default function StatsBar({ games }) {
  const total = games.length
  const hours = games.reduce((sum, g) => sum + (Number(g.hoursPlayed) || 0), 0)
  const completed = games.filter((g) => g.status === 'completed').length
  const rate = total ? Math.round((completed / total) * 100) : 0

  const cards = [
    { label: 'Toplam oyun', value: total },
    { label: 'Toplam süre', value: `${hours} sa` },
    { label: 'Bitirme oranı', value: `%${rate}` },
  ]

  return (
    <section aria-label="İstatistikler" className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-white/5 bg-ink-800/70 px-4 py-3 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{c.value}</p>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
          {STATUSES.map((s) => {
            const count = games.filter((g) => g.status === s.value).length
            return (
              <span key={s.value} className="inline-flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${s.dot}`} aria-hidden="true" />
                {s.label}: <strong className="text-slate-200">{count}</strong>
              </span>
            )
          })}
        </div>
      )}
    </section>
  )
}
