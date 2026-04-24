import { Link } from 'react-router-dom'
import styles from './CaseCard.module.css'

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  )
}

export default function CaseCard({ caseData }) {
  const { id, title, year, isNDA, shortDesc, tags, mockupImage, mockupBg } = caseData

  return (
    <div className={styles.card} style={{ '--mockup-bg': mockupBg || '#f0e8e5' }}>
      <div className={styles.imageArea}>
        {mockupImage ? (
          <img
            src={mockupImage}
            alt={`${title} mockup`}
            className={styles.mockupImg}
          />
        ) : (
          <div className={styles.mockupPlaceholder} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          {isNDA && (
            <span className={styles.nda}>
              <LockIcon />
              NDA
            </span>
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{shortDesc}</p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {!isNDA && (
          <Link to={`/case/${id}`} className={styles.viewLink}>
            View case →
          </Link>
        )}
      </div>
    </div>
  )
}
