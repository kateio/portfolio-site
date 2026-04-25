import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-7 2h14v2H5v-2z"/>
    </svg>
  )
}

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.identity}>
          <img src="/avatar.png" alt="Екатерина Иогансен" className={styles.avatar} />
          <span className={styles.name}>Екатерина Иогансен</span>
        </Link>
        <div className={styles.actions}>
          <a href="https://t.me/katiogansen" target="_blank" rel="noopener noreferrer" className={styles.btn}>
            tg: @katiogansen
          </a>
          <a href="/resume.pdf" download className={styles.btn}>
            <DownloadIcon />
            Резюме
          </a>
        </div>
      </div>
    </header>
  )
}
