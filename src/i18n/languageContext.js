import { createContext } from 'react'

// Declara o contexto sem valor inicial utilizável. Provider e hook ficam
// separados para manter o Fast Refresh do React sem avisos.
export const LanguageContext = createContext(null)
