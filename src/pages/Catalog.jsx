import { useState } from 'react'
import { categories } from '../data/categories'
import { filterApps } from '../utils/catalog'
import EbookCard from '../components/EbookCard'
import ProductCard from '../components/ProductCard'
import { useLanguage } from '../i18n/useLanguage.js'

// `type` seleciona o catálogo de e-books ou o de apps/jogos. O filtro fica local
// à página; os componentes de card continuam compartilhados com a Home.
export default function Catalog({ type, apps, ebooks, onOpen }) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const list = type === 'ebooks' ? ebooks : filterApps(apps, filter)
  return <main className="catalog-page"><div className="page-intro"><span className="eyebrow">{type === 'ebooks' ? t('readings') : t('projects')}</span><h1>{type === 'ebooks' ? t('ebooks') : `${t('apps')} ${t('connector')} ${t('game').toLowerCase()}`}</h1><p>{type === 'ebooks' ? t('readingDescription') : t('projectDescription')}</p></div>{type !== 'ebooks' && <div className="filter-row">{categories.map((category) => <button className={filter === category.id ? 'filter active' : 'filter'} key={category.id} onClick={() => setFilter(category.id)}>{category.id === 'all' ? t('all') : category.id === 'app' ? t('apps') : category.id === 'game' ? t('game') : t('ebooks')}</button>)}</div>}<div className="product-grid catalog-grid">{list.map((item) => type === 'ebooks' ? <EbookCard key={item.id} item={item} onOpen={onOpen} /> : <ProductCard key={item.id} item={item} onOpen={onOpen} />)}</div></main>
}
