import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('language') || 'en'
    } catch {
      return 'en'
    }
  })

  function setLang(lang) {
    setLanguage(lang)
    try {
      localStorage.setItem('language', lang)
    } catch {}
  }

  return (
    <LanguageContext.Provider value={{ language, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
