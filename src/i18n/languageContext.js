import { createContext } from 'react'

// Contexto privado do idioma. O provider e o hook ficam em arquivos distintos
// para manter o Fast Refresh do React sem avisos.
export const LanguageContext = createContext(null)
