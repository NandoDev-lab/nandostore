import MediaPlaceholder from './MediaPlaceholder'
import { useLanguage } from '../i18n/useLanguage.js'

// Card compartilhado por aplicativos e jogos. O callback onOpen mantém a
// navegação fora do componente, facilitando reutilização e testes.
export default function ProductCard({ item, onOpen }) {
  const { t } = useLanguage()
  const fullDescription = item.fullDescription || item.description
  const description = fullDescription || t('pendingDescription')
  const shouldContinueReading = Boolean(fullDescription) && fullDescription.length > 90
  const descriptionExcerpt = shouldContinueReading
    ? `${fullDescription.slice(0, 90).replace(/\s+\S*$/, '').trimEnd()}…`
    : description

  return <article className="product-card">
    {item.status === 'Em construção' && <div className="construction-banner">{t('statusBuilding')}</div>}
    <MediaPlaceholder item={item} />
    <div className="product-copy">
      <span className="eyebrow">{item.type === 'game' ? t('game') : t('app')}</span>
      <h3>{item.name}</h3>
      <p className="product-description">
        <span className="description-excerpt">{descriptionExcerpt}</span>
        {shouldContinueReading && <button className="continue-reading" onClick={() => onOpen(item)}>{t('continueReading')}</button>}
      </p>
      <div className="card-meta"><span>{item.category || t('pendingCategory')}</span><span>{item.platform || t('pending')}</span></div>
      <div className="card-actions"><button className="text-button" onClick={() => onOpen(item)}>{t('details')} <span aria-hidden="true">↗</span></button>{item.googlePlay && <a className="text-button" href={item.googlePlay} target="_blank" rel="noreferrer">Google Play <span aria-hidden="true">↗</span></a>}</div>
    </div>
  </article>
}
