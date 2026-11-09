import { SORT_OPTIONS, STATUSES } from '../Interfaces/game'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-ink-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

/**
 * Arama kutusu, durum filtre sekmeleri ve sıralama seçimi.
 */
export default function FilterBar({
  search,
  onSearch,
  status,
  onStatus,
  sort,
  onSort,
  counts,
}) {
  const tabs = [{ value: 'all', label: 'Tümü' }, ...STATUSES]

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Oyun, tür veya platform ara..."
            aria-label="Oyun ara"
            className={inputClass}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          aria-label="Sıralama"
          className={`${inputClass} sm:w-56`}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist">
        {tabs.map((t) => {
          const active = status === t.value
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onStatus(t.value)}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                active
                  ? 'bg-accent-600 text-white shadow shadow-accent-600/30'
                  : 'bg-ink-800 text-slate-300 hover:bg-ink-700'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs ${active ? 'text-white/80' : 'text-slate-500'}`}>
                {counts[t.value] ?? 0}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
