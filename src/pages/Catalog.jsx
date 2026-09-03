import { useState } from 'react'
import { categories } from '../data/categories'
import { filterApps } from '../utils/catalog'
import EbookCard from '../components/EbookCard'
import ProductCard from '../components/ProductCard'

// Catálogo compartilha a grade de cards, mas conserva o filtro de aplicativos
// local à página para não criar estado global desnecessário.
export default function Catalog({ type, apps, ebooks, onOpen }) {
  const [filter, setFilter] = useState('all')
  const list = type === 'ebooks' ? ebooks : filterApps(apps, filter)
  return <main className="catalog-page"><div className="page-intro"><span className="eyebrow">{type === 'ebooks' ? 'LEITURAS' : 'PROJETOS'}</span><h1>{type === 'ebooks' ? 'E-books' : 'Aplicativos e jogos'}</h1><p>{type === 'ebooks' ? 'Leituras para acompanhar ideias que ficam.' : 'Conheça os projetos e acompanhe o que está sendo construído.'}</p></div>{type !== 'ebooks' && <div className="filter-row">{categories.map((category) => <button className={filter === category.id ? 'filter active' : 'filter'} key={category.id} onClick={() => setFilter(category.id)}>{category.label}</button>)}</div>}<div className="product-grid catalog-grid">{list.map((item) => type === 'ebooks' ? <EbookCard key={item.id} item={item} onOpen={onOpen} /> : <ProductCard key={item.id} item={item} onOpen={onOpen} />)}</div></main>
}
