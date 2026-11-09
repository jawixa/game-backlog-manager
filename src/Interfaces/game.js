/**
 * Oyun veri modeli ve sabitler.
 * (Projede TypeScript yok; "Interfaces" klasörü JSDoc tipleri ve sabitleri barındırır.)
 *
 * @typedef {'backlog' | 'playing' | 'completed' | 'dropped' | 'wishlist'} GameStatus
 *
 * @typedef {Object} Game
 * @property {string} id            Benzersiz kimlik
 * @property {string} title         Oyun adı
 * @property {string} platform      Platform (PC, PS5, Switch ...)
 * @property {string} genre         Tür
 * @property {GameStatus} status    Oynama durumu
 * @property {number} rating        0 (puansız) - 5 arası puan
 * @property {number} hoursPlayed   Oynanan saat
 * @property {string} notes         Kişisel notlar
 * @property {string} createdAt     ISO tarih
 * @property {string} updatedAt     ISO tarih
 */

/** @type {{ value: GameStatus, label: string, badge: string, dot: string }[]} */
export const STATUSES = [
  {
    value: 'backlog',
    label: 'Sırada',
    badge: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
    dot: 'bg-sky-400',
  },
  {
    value: 'playing',
    label: 'Oynuyorum',
    badge: 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
    dot: 'bg-violet-400',
  },
  {
    value: 'completed',
    label: 'Bitirdim',
    badge: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  {
    value: 'dropped',
    label: 'Bıraktım',
    badge: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
    dot: 'bg-rose-400',
  },
  {
    value: 'wishlist',
    label: 'İstek listesi',
    badge: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    dot: 'bg-amber-400',
  },
]

export const PLATFORMS = [
  'PC',
  'PlayStation 5',
  'PlayStation 4',
  'Xbox Series X|S',
  'Xbox One',
  'Nintendo Switch',
  'Mobil',
  'Diğer',
]

export const GENRES = [
  'Aksiyon',
  'Macera',
  'RPG',
  'Strateji',
  'Simülasyon',
  'Spor / Yarış',
  'Bulmaca',
  'Korku',
  'Platform',
  'Indie',
  'Diğer',
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'En yeni eklenen' },
  { value: 'title', label: 'Ada göre (A-Z)' },
  { value: 'rating', label: 'Puana göre' },
  { value: 'hours', label: 'Oynama süresine göre' },
]

export const getStatus = (value) =>
  STATUSES.find((s) => s.value === value) ?? STATUSES[0]

/** @returns {Omit<Game, 'id' | 'createdAt' | 'updatedAt'>} */
export const emptyGame = () => ({
  title: '',
  platform: PLATFORMS[0],
  genre: GENRES[0],
  status: 'backlog',
  rating: 0,
  hoursPlayed: 0,
  notes: '',
})
