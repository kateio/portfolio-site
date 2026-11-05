import { useEffect, useState } from 'react'
import { strings } from './strings'
import { LanguageContext } from './useLanguage'

const STORAGE_KEY = 'lang'

function readSavedLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ru'
  } catch {
    return 'ru'
  }
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLanguage)
  const t = strings[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.documentTitle
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // The language still works for this visit without saved storage.
    }
  }, [lang, t])

  const toggleLang = () => setLang((current) => (current === 'ru' ? 'en' : 'ru'))

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
