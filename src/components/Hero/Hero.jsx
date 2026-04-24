import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          <span className={styles.dark}>Product Designer</span>
          <br />
          <span className={styles.muted}>Проектирую интерфейсы, участвую в&nbsp;исследованиях, активно использую AI в&nbsp;работе</span>
        </h1>
      </div>
    </section>
  )
}
