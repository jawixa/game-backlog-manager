import Modal from './Modal'

/**
 * Silme gibi geri alınamaz işlemler için onay penceresi.
 */
export default function ConfirmDialog({ title, message, confirmLabel = 'Sil', onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm leading-relaxed text-slate-300">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-xl bg-ink-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-ink-600"
        >
          Vazgeç
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="cursor-pointer rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
