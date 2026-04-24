import CaseCard from '../CaseCard/CaseCard'
import { cases } from '../../data/cases'
import styles from './Cases.module.css'

export default function Cases() {
  return (
    <section className={styles.section}>
      {cases.map((c) => (
        <CaseCard key={c.id} caseData={c} />
      ))}
    </section>
  )
}
