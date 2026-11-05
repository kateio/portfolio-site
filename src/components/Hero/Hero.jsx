import { useLanguage } from '../../i18n/useLanguage'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          {t.heroRole}
          <br />
          {t.heroExperience}
          <span className={styles.secondary}>{t.heroText}</span>
        </h1>
      </div>
    </section>
  )
}
