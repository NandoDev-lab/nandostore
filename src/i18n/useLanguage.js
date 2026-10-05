import { useContext } from 'react'
import { LanguageContext } from './languageContext.js'

// API consumida pelos componentes: retorna idioma, setter, função t(chave) e
// lista de idiomas. O erro explícito aponta usos fora de LanguageProvider.
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  return context
}
