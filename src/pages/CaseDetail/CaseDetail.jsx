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

  const { title, description, sections } = caseData

  const currentIndex = cases.findIndex((c) => c.id === id)
  const next = cases[(currentIndex + 1) % cases.length]
  const hasNextPage = Boolean(next.sections)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.aboutCard}>
          <span className={styles.aboutLabel}>О проекте</span>
          <div className={styles.description}>
            {description.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </div>
        </div>

        {sections && sections.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} — ${i + 1}`}
            className={styles.sectionImg}
            loading="lazy"
          />
        ))}
      </div>

      <div className={styles.bottomNav}>
        <Link to="/" className={styles.navBack}>← All projects</Link>
        {hasNextPage && (
          <Link to={`/case/${next.id}`} className={styles.navNext}>
            <span className={styles.navNextLabel}>Next project</span>
            <span className={styles.navNextTitle}>{next.title} →</span>
          </Link>
        )}
      </div>
    </main>
  )
}
