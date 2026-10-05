// Operações puras sobre os registros: não acessam React, DOM ou localStorage e
// retornam novos arrays quando precisam ordenar ou filtrar o catálogo.
export const allItems = (apps, ebooks) => [...apps, ...ebooks]

// Os e-books conservam o título original para pesquisa e dados editoriais;
// somente a apresentação escolhe a tradução do idioma ativo.
export const getEbookTitle = (item, language) => item.titleTranslations?.[language] || item.title

// A busca usa todos os valores textuais do cadastro para encontrar nomes,
// categorias e palavras-chave sem exigir alterações nos componentes visuais.
export const searchItems = (items, query) => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return items

  return items.filter((item) => {
    // O mapa de traduções é pesquisável, mas outros objetos aninhados não são
    // concatenados implicitamente como `[object Object]`.
    const { titleTranslations = {}, ...searchableFields } = item
    const searchableText = [...Object.values(searchableFields), ...Object.values(titleTranslations)].join(' ').toLowerCase()
    return searchableText.includes(normalizedQuery)
  })
}

// O filtro de tipo é aplicado apenas ao catálogo de aplicativos; e-books têm
// sua própria página e, por isso, não passam por esta função.
export const filterApps = (apps, filter) => apps.filter((item) => filter === 'all' || item.type === filter)

// A data de edição tem prioridade sobre a data de criação. Datas vazias ficam
// depois das cadastradas para que itens sem informação não sejam inventados.
export const sortByRecent = (items) => [...items].sort((first, second) => {
  // A edição mais recente prevalece; sem datas, o sort estável conserva a
  // ordem original dos registros.
  const firstDate = first.updatedAt || first.createdAt
  const secondDate = second.updatedAt || second.createdAt
  if (!firstDate && !secondDate) return 0
  if (!firstDate) return 1
  if (!secondDate) return -1
  return new Date(secondDate) - new Date(firstDate)
})
