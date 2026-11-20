import { useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { typograph } from '../../lib/typograph'
import styles from './CaseStudy.module.css'
import ScreenViewer from './ScreenViewer'

export default function CaseStudy({ caseData, study }) {
  const { t } = useLanguage()
  const { title, year, tags } = caseData
  const [viewer, setViewer] = useState({ group: null, index: null })

  const screensOf = (group) =>
    group.screens.map((name, i) => ({
      src: `${study.dir}/${name}.png`,
      alt: `${title}: ${group.title}, ${i + 1}`,
    }))
  const openGroup = viewer.group === null ? null : study.groups[viewer.group]

  return (
    <div className={styles.layout}>
      <aside className={styles.info}>
        <div className={styles.infoInner}>
          <span className={styles.year}>{year}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{typograph(study.lead)}</p>

          {tags && (
            <ul className={styles.tags}>
              {tags.map((tag) => (
                <li key={tag} className={styles.tag}>{typograph(tag)}</li>
              ))}
            </ul>
          )}

          <div className={styles.role}>
            <span className={styles.label}>{t.caseRole}</span>
            <p className={styles.roleText}>{typograph(study.role)}</p>
          </div>
        </div>
      </aside>

      <div className={styles.gallery}>
        <section className={`${styles.tile} ${styles.textTile}`}>
          <div className={styles.textCol}>
            <h2 className={styles.label}>{t.caseTask}</h2>
            <p className={styles.bodyText}>{typograph(study.task)}</p>
          </div>
          <div className={styles.textCol}>
            <h2 className={styles.label}>{t.caseProcess}</h2>
            <ol className={styles.steps}>
              {study.process.map((step) => (
                <li key={step} className={styles.step}>{typograph(step)}</li>
              ))}
            </ol>
          </div>
        </section>

        {study.groups.map((group, g) => (
          <section
            key={group.title}
            className={`${styles.tile} ${group.half ? styles.tileHalf : ''}`}
          >
            <header className={styles.tileHead}>
              <h2 className={styles.label}>{group.title}</h2>
              {group.text && (
                <p className={styles.tileText}>{typograph(group.text)}</p>
              )}
            </header>
            <div
              className={styles.screens}
              style={{ '--count': group.screens.length }}
            >
              {screensOf(group).map((screen, i) => (
                <button
                  key={screen.src}
                  type="button"
                  className={styles.screenButton}
                  onClick={() => setViewer({ group: g, index: i })}
                  aria-label={`${t.openScreen}: ${screen.alt}`}
                >
                  <img
                    src={screen.src}
                    alt=""
                    className={styles.screen}
                    loading="lazy"
                    width={375}
                    height={812}
                  />
                </button>
              ))}
            </div>
          </section>
        ))}

        <section className={`${styles.tile} ${styles.outcomeTile}`}>
          <h2 className={styles.label}>{t.caseOutcome}</h2>
          <p className={styles.bodyText}>{typograph(study.outcome)}</p>
        </section>
      </div>

      <ScreenViewer
        screens={openGroup ? screensOf(openGroup) : []}
        index={viewer.index}
        onChange={(index) => setViewer((v) => ({ ...v, index }))}
        onClose={() => setViewer({ group: null, index: null })}
      />
    </div>
  )
}
