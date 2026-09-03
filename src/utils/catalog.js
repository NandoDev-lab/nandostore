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
