import Hero from '../../components/Hero/Hero'
import Cases from '../../components/Cases/Cases'
import styles from './Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Cases />
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerBlock}>
              <span className={styles.footerLabel}>Telegram</span>
              <span className={styles.footerValue}>@katiogansen</span>
            </div>
            <div className={styles.footerBlock} style={{ marginTop: 32 }}>
              <span className={styles.footerLabel}>Email</span>
              <span className={styles.footerValue}>kate.iogansen@gmail.com</span>
            </div>
          </div>
          <span className={styles.footerRight}>© 2025</span>
        </div>
      </footer>
    </main>
  )
}
