import GameCard from './GameCard'

/**
 * Oyun kartlarını responsive grid olarak listeler; boş durumu da yönetir.
 */
export default function GameList({
  games,
  hasAnyGame,
  onEdit,
  onDelete,
  onStatusChange,
  onAddClick,
}) {
  if (games.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
        <p className="text-4xl" aria-hidden="true">
          🎮
        </p>
        <h3 className="mt-3 text-lg font-semibold text-white">
          {hasAnyGame ? 'Sonuç bulunamadı' : 'Koleksiyonun henüz boş'}
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          {hasAnyGame
            ? 'Arama veya filtreyi değiştirmeyi dene.'
            : 'İlk oyununu ekleyerek backlog yolculuğuna başla.'}
        </p>
        {!hasAnyGame && (
          <button
            type="button"
            onClick={onAddClick}
            className="mt-5 cursor-pointer rounded-xl bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-500"
          >
            + Oyun ekle
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
