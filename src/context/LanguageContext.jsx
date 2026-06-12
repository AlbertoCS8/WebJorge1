/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'pagina-george-lang'

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'es'
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
  if (savedLanguage === 'es' || savedLanguage === 'en') {
    return savedLanguage
  }

  return window.navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const setLanguage = (nextLanguage) => {
    if (nextLanguage !== 'es' && nextLanguage !== 'en') {
      return
    }

    setLanguageState(nextLanguage)
    window.localStorage.setItem(STORAGE_KEY, nextLanguage)
    document.documentElement.lang = nextLanguage
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (es, en) => (language === 'es' ? es : en),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}
