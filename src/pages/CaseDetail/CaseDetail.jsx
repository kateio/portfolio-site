import { useParams, Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import styles from './CaseDetail.module.css'

export default function CaseDetail() {
  const { id } = useParams()
  const caseData = cases.find((c) => c.id === id)

  if (!caseData) {
    return (
      <main className={styles.notFound}>
        <p>Case not found.</p>
        <Link to="/">← Back to home</Link>
      </main>
    )
  }

  const { index, title, subtitle, year, description, tags, coverSeed, images } = caseData

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroMeta}>
          <span className={styles.index}>{index}</span>
          <div className={styles.heroTags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <span className={styles.year}>{year}</span>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.cover}>
        <img
          src={`https://picsum.photos/seed/${coverSeed}/1400/800`}
          alt={title}
          className={styles.coverImg}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.sideSection}>
            <span className={styles.sideLabel}>Year</span>
            <span className={styles.sideValue}>{year}</span>
          </div>
          <div className={styles.sideSection}>
            <span className={styles.sideLabel}>Disciplines</span>
            <div className={styles.sideTags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.sideTag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.sideSection}>
            <span className={styles.sideLabel}>Role</span>
            <span className={styles.sideValue}>Lead Product Designer</span>
          </div>
        </div>

        <div className={styles.content}>
          {description.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>{paragraph}</p>
          ))}

          <div className={styles.imageGrid}>
            {images.map((seed, i) => (
              <img
                key={seed}
                src={`https://picsum.photos/seed/${seed + i}/800/560`}
                alt={`${title} detail ${i + 1}`}
                className={styles.contentImg}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.nav}>
        <Link to="/" className={styles.navBack}>
          ← All projects
        </Link>

        {(() => {
          const currentIndex = cases.findIndex((c) => c.id === id)
          const next = cases[(currentIndex + 1) % cases.length]
          return (
            <Link to={`/case/${next.id}`} className={styles.navNext}>
              <span className={styles.navNextLabel}>Next project</span>
              <span className={styles.navNextTitle}>{next.title} →</span>
            </Link>
          )
        })()}
      </div>
    </main>
  )
}
