import MediaPlaceholder from './MediaPlaceholder'
import { useLanguage } from '../i18n/useLanguage.js'

// Card específico para livros, separado do card de apps porque seus campos
// principais (autor e formato) pertencem a outro domínio de dados.
export default function EbookCard({ item, onOpen }) {
  const { t } = useLanguage()
  return <article className="product-card ebook-card">
    <MediaPlaceholder item={item} />
    <div className="product-copy">
      <span className="eyebrow">{t('ebook')}</span>
      <h3>{item.title}</h3>
      <p>{item.author}</p>
      <div className="card-meta"><span>{item.category || t('pendingCategory')}</span><span>{t('digital')}</span></div>
      <button className="text-button" onClick={() => onOpen(item)}>{t('readDetails')} <span aria-hidden="true">↗</span></button>
    </div>
  </article>
}
