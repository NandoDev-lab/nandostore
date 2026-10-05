import EbookCard from '../components/EbookCard'
import ProductCard from '../components/ProductCard'
import Section from '../components/Section'
import { searchItems } from '../utils/catalog'
import { useLanguage } from '../i18n/useLanguage.js'

// Recebe a lista já carregada pelo App. A busca e a normalização ficam em
// catalog.js, incluindo os títulos traduzidos dos e-books.
export default function SearchResults({ items, query, onOpen }) {
  const { t } = useLanguage()
  const results = searchItems(items, query)
  return <Section title={`${t('resultsFor')} “${query}”`} kicker={t('searchLabel')}><div className="product-grid">{results.length ? results.map((item) => item.type === 'ebook' ? <EbookCard key={item.id} item={item} onOpen={onOpen} /> : <ProductCard key={item.id} item={item} onOpen={onOpen} />) : <div className="empty-state"><span>⌕</span><h3>{t('nothing')}</h3><p>{t('tryAnother')}</p></div>}</div></Section>
}
