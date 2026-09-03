// Reúne operações puras do catálogo. Como estas funções não conhecem React,
// elas podem ser testadas isoladamente e futuramente substituídas por uma API.
export const allItems = (apps, ebooks) => [...apps, ...ebooks]

// A busca usa todos os valores textuais do cadastro para encontrar nomes,
// categorias e palavras-chave sem exigir alterações nos componentes visuais.
export const searchItems = (items, query) => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return items

  return items.filter((item) => Object.values(item).join(' ').toLowerCase().includes(normalizedQuery))
}

// O filtro de tipo é aplicado apenas ao catálogo de aplicativos; e-books têm
// sua própria página e, por isso, não passam por esta função.
export const filterApps = (apps, filter) => apps.filter((item) => filter === 'all' || item.type === filter)

// A data de edição tem prioridade sobre a data de criação. Datas vazias ficam
// depois das cadastradas para que itens sem informação não sejam inventados.
export const sortByRecent = (items) => [...items].sort((first, second) => {
  const firstDate = first.updatedAt || first.createdAt
  const secondDate = second.updatedAt || second.createdAt
  if (!firstDate && !secondDate) return 0
  if (!firstDate) return 1
  if (!secondDate) return -1
  return new Date(secondDate) - new Date(firstDate)
})
