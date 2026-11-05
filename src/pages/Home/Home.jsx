import Hero from '../../components/Hero/Hero'
import Cases from '../../components/Cases/Cases'
import UiCollection from '../../components/UiCollection/UiCollection'
import { useLanguage } from '../../i18n/useLanguage'
import styles from './Home.module.css'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className={styles.main}>
      <Hero />
      <Cases />
      <UiCollection />
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerBlock}>
              <span className={styles.footerLabel}>{t.footerTelegram}</span>
              <a href="https://t.me/katiogansen" target="_blank" rel="noopener noreferrer" className={styles.footerValue}>@katiogansen</a>
            </div>
            <div className={styles.footerBlock} style={{ marginTop: 32 }}>
              <span className={styles.footerLabel}>{t.footerEmail}</span>
              <a href="mailto:kate.iogansen@gmail.com" className={styles.footerValue}>kate.iogansen@gmail.com</a>
            </div>
          </div>
          <span className={styles.footerRight}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  )
}
