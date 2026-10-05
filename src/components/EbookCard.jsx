import MediaPlaceholder from './MediaPlaceholder'
import { useLanguage } from '../i18n/useLanguage.js'
import { getEbookTitle } from '../utils/catalog.js'

// O título respeita o idioma ativo, com fallback para o título original. O
// rótulo de idioma original deixa claro que o conteúdo do e-book é em pt-BR.
export default function EbookCard({ item, onOpen }) {
  const { t, language } = useLanguage()
  const title = getEbookTitle(item, language)
  return <article className="product-card ebook-card">
    <div className="ebook-cover"><MediaPlaceholder item={item} label={title} /></div>
    <div className="product-copy">
      <span className="eyebrow">{t('ebook')}</span>
      <h3>{title}</h3>
      <p>{item.author}</p>
      <div className="card-meta"><span>{item.category || t('pendingCategory')}</span><span>{t('digital')}</span><span>{t('originalLanguage')}</span></div>
      <button className="text-button" onClick={() => onOpen(item)}>{t('readDetails')} <span aria-hidden="true">↗</span></button>
    </div>
  </article>
}
