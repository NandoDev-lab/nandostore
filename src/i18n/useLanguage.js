import { useContext } from 'react'
import { LanguageContext } from './languageContext.js'

// Hook de leitura do idioma atual, separado do provider para facilitar testes.
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  return context
}
