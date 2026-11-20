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
      desktop: Boolean(group.desktop),
    }))
  const openGroup = viewer.group === null ? null : study.groups[viewer.group]

  return (
    <div className={styles.layout}>
      <aside className={styles.info}>
        <div className={styles.infoInner}>
          <span className={styles.year}>{year}</span>
          <h1 className={styles.title}>{typograph(title)}</h1>
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
            className={`${styles.tile} ${group.half ? styles.tileHalf : ''} ${group.desktop ? styles.tileDesktop : ''}`}
          >
            <header className={styles.tileHead}>
              <h2 className={styles.label}>{group.title}</h2>
              {group.text && (
                <p className={styles.tileText}>{typograph(group.text)}</p>
              )}
            </header>
            <div
              className={styles.screens}
              // Phone rows keep at least 4 columns so a 2-screen row in a
              // full-width tile doesn't blow the phones up
              style={{ '--count': group.desktop ? 1 : group.half ? group.screens.length : Math.max(group.screens.length, 4) }}
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
                    width={group.desktop ? 1600 : 375}
                    height={group.desktop ? 1013 : 812}
                  />
                </button>
              ))}
            </div>
          </section>
        ))}

        <section className={`${styles.tile} ${styles.outcomeTile}`}>
          <h2 className={styles.label}>{t.caseOutcome}</h2>
          {Array.isArray(study.outcome) ? (
            <ul className={styles.metrics}>
              {study.outcome.map((m) => (
                <li key={m.value} className={styles.metric}>
                  <span className={styles.metricValue}>{typograph(m.value)}</span>
                  <span className={styles.metricText}>{typograph(m.text)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.bodyText}>{typograph(study.outcome)}</p>
          )}
          {study.outcomeNote && (
            <p className={styles.metricNote}>{typograph(study.outcomeNote)}</p>
          )}
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
