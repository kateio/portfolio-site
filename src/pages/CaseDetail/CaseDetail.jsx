import { useParams, Link } from 'react-router-dom'
import { cases, localizeCase } from '../../data/cases'
import { useLanguage } from '../../i18n/useLanguage'
import styles from './CaseDetail.module.css'

export default function CaseDetail() {
  const { id } = useParams()
  const { lang, t } = useLanguage()
  const caseData = cases.find((c) => c.id === id)

  if (!caseData) {
    return (
      <main className={styles.notFound}>
        <p>{t.caseNotFound}</p>
        <Link to="/">{t.backHome}</Link>
      </main>
    )
  }

  const { title, description, sections } = localizeCase(caseData, lang)

  const currentIndex = cases.findIndex((c) => c.id === id)
  const next = localizeCase(cases[(currentIndex + 1) % cases.length], lang)
  const hasNextPage = Boolean(next.sections)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.aboutCard}>
          <span className={styles.aboutLabel}>{t.aboutProject}</span>
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
        <Link to="/" className={styles.navBack}>{t.allProjects}</Link>
        {hasNextPage && (
          <Link to={`/case/${next.id}`} className={styles.navNext}>
            <span className={styles.navNextLabel}>{t.nextProject}</span>
            <span className={styles.navNextTitle}>{next.title} →</span>
          </Link>
        )}
      </div>
    </main>
  )
}
