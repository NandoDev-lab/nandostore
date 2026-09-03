import EbookCard from '../components/EbookCard'
import ProductCard from '../components/ProductCard'
import Section from '../components/Section'
import { searchItems } from '../utils/catalog'
import { useLanguage } from '../i18n/useLanguage.js'

// A página de pesquisa recebe a lista já carregada e só cuida da apresentação.
// A regra de correspondência fica em utils/catalog.js para ser reaproveitada.
export default function SearchResults({ items, query, onOpen }) {
  const { t } = useLanguage()
  const results = searchItems(items, query)
  return <Section title={`${t('resultsFor')} “${query}”`} kicker={t('searchLabel')}><div className="product-grid">{results.length ? results.map((item) => item.type === 'ebook' ? <EbookCard key={item.id} item={item} onOpen={onOpen} /> : <ProductCard key={item.id} item={item} onOpen={onOpen} />) : <div className="empty-state"><span>⌕</span><h3>{t('nothing')}</h3><p>{t('tryAnother')}</p></div>}</div></Section>
}
