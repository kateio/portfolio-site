import { useRef } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import styles from './ContactsDialog.module.css'

const ICONS = {
  linkedin: (
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
    />
  ),
  email: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </g>
  ),
  telegram: (
    <path
      fill="currentColor"
      d="M21.9 4.3 18.8 19c-.2 1-.8 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.7-7.9c.4-.3-.1-.5-.6-.2L6.8 12.9l-4.6-1.4c-1-.3-1-1 .2-1.5l18-6.9c.8-.3 1.6.2 1.5 1.2z"
    />
  ),
  resume: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </g>
  ),
}

export default function ContactsDialog({ buttonClassName }) {
  const { t } = useLanguage()
  const dialogRef = useRef(null)

  const close = () => dialogRef.current.close()

  return (
    <>
      <button type="button" onClick={() => dialogRef.current.showModal()} className={buttonClassName}>
        {t.contacts}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="contacts-title"
        className={styles.dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 id="contacts-title" className={styles.title}>{t.contacts}</h2>
            <button type="button" onClick={close} aria-label={t.closeLabel} className={styles.close}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          {t.contactLinks.map(({ id, label, value, href }) => (
            <a
              key={id}
              href={href}
              target={id === 'email' ? undefined : '_blank'}
              rel={id === 'email' ? undefined : 'noopener noreferrer'}
              onClick={close}
              className={styles.link}
            >
              <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                {ICONS[id]}
              </svg>
              <span className={styles.text}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
              </span>
            </a>
          ))}
        </div>
      </dialog>
    </>
  )
}
