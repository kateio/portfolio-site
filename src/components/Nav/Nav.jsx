import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../i18n/useLanguage'
import ContactsDialog from './ContactsDialog'
import styles from './Nav.module.css'

export default function Nav() {
  const { t, toggleLang } = useLanguage()
  const { pathname } = useLocation()
  const isCase = pathname.startsWith('/case/')
  const [firstName, ...rest] = t.name.split(' ')

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        {isCase ? (
          <Link to="/" className={styles.identity}>
            <span className={styles.tile} aria-hidden="true">
              <span className={styles.arrow}>←</span>
            </span>
            <span className={styles.name}>{t.backToProjects}</span>
          </Link>
        ) : (
          <Link to="/" className={styles.identity} aria-label={t.name}>
            <span className={styles.tile}>
              <img src="/logo.svg" alt="" className={styles.logo} />
            </span>
            <span className={styles.name}>
              {firstName}
              <br />
              {rest.join(' ')}
            </span>
          </Link>
        )}
        <div className={styles.actions}>
          <ContactsDialog buttonClassName={styles.btn} />
          <button type="button" onClick={toggleLang} aria-label={t.switchLabel} className={styles.btn}>
            {t.switchTo}
          </button>
        </div>
      </div>
    </header>
  )
}
