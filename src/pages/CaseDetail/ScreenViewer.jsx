import { useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import styles from './ScreenViewer.module.css'

// Full-size view of one screen with prev/next within its group.
// `screens` is a list of { src, alt }; `index` is the open one.
export default function ScreenViewer({ screens, index, onChange, onClose }) {
  const { t } = useLanguage()
  const dialogRef = useRef(null)
  const isOpen = index !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const hasMany = screens.length > 1
  const go = (step) => onChange((index + step + screens.length) % screens.length)

  const onKeyDown = (e) => {
    if (!hasMany) return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  // A click on the backdrop (the dialog itself, not its content) closes it.
  const onClick = (e) => {
    if (e.target === dialogRef.current) dialogRef.current.close()
  }

  const screen = isOpen ? screens[index] : null

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {screen && (
        <div className={styles.stage}>
          {hasMany && (
            <button
              type="button"
              className={styles.arrow}
              onClick={() => go(-1)}
              aria-label={t.prevScreen}
            >
              ←
            </button>
          )}

          <img src={screen.src} alt={screen.alt} className={styles.image} />

          {hasMany && (
            <button
              type="button"
              className={styles.arrow}
              onClick={() => go(1)}
              aria-label={t.nextScreen}
            >
              →
            </button>
          )}
        </div>
      )}

      {hasMany && isOpen && (
        <span className={styles.counter}>
          {index + 1} / {screens.length}
        </span>
      )}

      <button
        type="button"
        className={styles.close}
        onClick={() => dialogRef.current.close()}
        aria-label={t.closeLabel}
      >
        ✕
      </button>
    </dialog>
  )
}
