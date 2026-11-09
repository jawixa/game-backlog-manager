import { useMemo, useState } from 'react'
import ConfirmDialog from '../Components/ConfirmDialog'
import FilterBar from '../Components/FilterBar'
import GameForm from '../Components/GameForm'
import GameList from '../Components/GameList'
import Modal from '../Components/Modal'
import StatsBar from '../Components/StatsBar'
import ToastContainer from '../Components/ToastContainer'
import { useGames } from '../hooks/useGames'
import { useToast } from '../hooks/useToast'
import { getStatus } from '../Interfaces/game'

const sorters = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  title: (a, b) => a.title.localeCompare(b.title, 'tr'),
  rating: (a, b) => b.rating - a.rating || a.title.localeCompare(b.title, 'tr'),
  hours: (a, b) => b.hoursPlayed - a.hoursPlayed,
}

/**
 * Ana sayfa: koleksiyonu listeler, ekleme/düzenleme/silme akışlarını yönetir.
 */
export default function LibraryPage() {
  const { games, addGame, updateGame, deleteGame } = useGames()
  const { toasts, notify, dismiss } = useToast()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('newest')

  // formTarget: null = kapalı, 'new' = ekleme, Game = düzenleme
  const [formTarget, setFormTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const counts = useMemo(() => {
    const c = { all: games.length }
    games.forEach((g) => {
      c[g.status] = (c[g.status] ?? 0) + 1
    })
    return c
  }, [games])

  const visibleGames = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr')
    return games
      .filter((g) => status === 'all' || g.status === status)
      .filter(
        (g) =>
          !q ||
          [g.title, g.genre, g.platform, g.notes].some((field) =>
            field.toLocaleLowerCase('tr').includes(q),
          ),
      )
      .sort(sorters[sort])
  }, [games, search, status, sort])

  const handleSubmit = (data) => {
    if (formTarget === 'new') {
      addGame(data)
      notify(`"${data.title}" koleksiyona eklendi.`)
    } else {
      updateGame(formTarget.id, data)
      notify(`"${data.title}" güncellendi.`)
    }
    setFormTarget(null)
  }

  const handleStatusChange = (game, newStatus) => {
    updateGame(game.id, { status: newStatus })
    notify(`"${game.title}" → ${getStatus(newStatus).label}`, 'info')
  }

  const handleDelete = () => {
    deleteGame(deleteTarget.id)
    notify(`"${deleteTarget.title}" silindi.`, 'error')
    setDeleteTarget(null)
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent-400">🎮 Oyun koleksiyonu & Oynama listesi</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Game Backlog Manager
          </h1>
          <p className="mt-2 max-w-xl text-slate-400">
            Sıradaki oyunlarını, oynadıklarını ve bitirdiklerini tek yerden takip et.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormTarget('new')}
          className="cursor-pointer self-start rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition hover:bg-accent-500 sm:self-auto"
        >
          + Oyun ekle
        </button>
      </header>

      <div className="space-y-6">
        <StatsBar games={games} />
        <FilterBar
          search={search}
          onSearch={setSearch}
          status={status}
          onStatus={setStatus}
          sort={sort}
          onSort={setSort}
          counts={counts}
        />
        <GameList
          games={visibleGames}
          hasAnyGame={games.length > 0}
          onEdit={setFormTarget}
          onDelete={setDeleteTarget}
          onStatusChange={handleStatusChange}
          onAddClick={() => setFormTarget('new')}
        />
      </div>

      <footer className="mt-12 text-center text-xs text-slate-500 flex flex-col gap-1 items-center">
        <p>Veriler tarayıcının LocalStorage alanında saklanır.</p>
        <p>
          Created by <span className="font-medium text-slate-400">Atay Mert (JaWiXa)</span>
        </p>
      </footer>

      {formTarget && (
        <Modal
          title={formTarget === 'new' ? 'Yeni oyun ekle' : 'Oyunu düzenle'}
          onClose={() => setFormTarget(null)}
        >
          <GameForm
            initial={formTarget === 'new' ? null : formTarget}
            onSubmit={handleSubmit}
            onCancel={() => setFormTarget(null)}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Oyunu sil"
          message={`"${deleteTarget.title}" koleksiyonundan kalıcı olarak silinecek. Emin misin?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
