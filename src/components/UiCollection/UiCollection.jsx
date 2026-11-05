import { useSyncExternalStore } from 'react'
import { uiItems } from '../../data/uiCollection'
import { useLanguage } from '../../i18n/useLanguage'
import UiVideo from './UiVideo'
import styles from './UiCollection.module.css'

const phoneQuery = window.matchMedia('(max-width: 767px)')

function subscribeToPhoneQuery(onChange) {
  phoneQuery.addEventListener('change', onChange)
  return () => phoneQuery.removeEventListener('change', onChange)
}

function toRows(items, rowSize) {
  const rows = []
  for (let i = 0; i < items.length; i += rowSize) {
    rows.push(items.slice(i, i + rowSize))
  }
  return rows
}

function Row({ items }) {
  const { lang } = useLanguage()

  return (
    <div className={styles.row}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          {item.video && <UiVideo src={item.video} poster={item.poster} label={item.label[lang]} />}
          {item.image && <img src={item.image} alt={item.label[lang]} loading="lazy" className={styles.media} />}
        </div>
      ))}
    </div>
  )
}

export default function UiCollection() {
  const { t } = useLanguage()
  const isPhone = useSyncExternalStore(subscribeToPhoneQuery, () => phoneQuery.matches)
  const [firstRow, ...otherRows] = toRows(uiItems, isPhone ? 1 : 2)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.firstBlock}>
          <h2 className={styles.title}>{t.uiCollection}</h2>
          <Row items={firstRow} />
        </div>
        {otherRows.map((row) => (
          <Row key={row[0].id} items={row} />
        ))}
      </div>
    </section>
  )
}
