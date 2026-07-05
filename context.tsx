'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { dictionaries, type Dictionary, type Lang } from './dictionary'

interface I18nContextValue {
  lang: Lang
  t: Dictionary
  toggleLang: () => void
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  t: dictionaries.en,
  toggleLang: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (window.localStorage.getItem('smartsafar-lang') as Lang | null) : null
    if (stored === 'ur' || stored === 'en') setLang(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr'
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ur' : 'en'
      window.localStorage.setItem('smartsafar-lang', next)
      return next
    })
  }, [])

  return (
    <I18nContext.Provider value={{ lang, t: dictionaries[lang], toggleLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
