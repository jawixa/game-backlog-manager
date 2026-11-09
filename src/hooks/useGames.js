import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'game-backlog-manager:games'

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const SEED = [
  {
    title: 'The Witcher 3: Wild Hunt',
    platform: 'PC',
    genre: 'RPG',
    status: 'playing',
    rating: 5,
    hoursPlayed: 42,
    notes: 'Blood and Wine DLC sırada.',
  },
  {
    title: 'Hades',
    platform: 'Nintendo Switch',
    genre: 'Indie',
    status: 'completed',
    rating: 5,
    hoursPlayed: 38,
    notes: '',
  },
  {
    title: 'Elden Ring',
    platform: 'PlayStation 5',
    genre: 'RPG',
    status: 'backlog',
    rating: 0,
    hoursPlayed: 0,
    notes: 'Arkadaş tavsiyesi, tatilde başla.',
  },
].map((g, i) => {
  const now = new Date(Date.now() - i * 60_000).toISOString()
  return { ...g, id: uid(), createdAt: now, updatedAt: now }
})

/**
 * Oyun listesi için CRUD işlemleri. Veri LocalStorage'da tutulur.
 */
export function useGames() {
  const [games, setGames] = useLocalStorage(STORAGE_KEY, SEED)

  // CREATE
  const addGame = useCallback(
    (data) => {
      const now = new Date().toISOString()
      const game = { ...data, id: uid(), createdAt: now, updatedAt: now }
      setGames((prev) => [game, ...prev])
      return game
    },
    [setGames],
  )

  // UPDATE
  const updateGame = useCallback(
    (id, changes) => {
      setGames((prev) =>
        prev.map((g) =>
          g.id === id
            ? { ...g, ...changes, updatedAt: new Date().toISOString() }
            : g,
        ),
      )
    },
    [setGames],
  )

  // DELETE
  const deleteGame = useCallback(
    (id) => {
      setGames((prev) => prev.filter((g) => g.id !== id))
    },
    [setGames],
  )

  const resetGames = useCallback(() => setGames([]), [setGames])

  return { games, addGame, updateGame, deleteGame, resetGames }
}
