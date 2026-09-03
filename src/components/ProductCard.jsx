import MediaPlaceholder from './MediaPlaceholder'
import { useLanguage } from '../i18n/useLanguage.js'

// Card compartilhado por aplicativos e jogos. O callback onOpen mantém a
// navegação fora do componente, facilitando reutilização e testes.
export default function ProductCard({ item, onOpen }) {
  const { t } = useLanguage()
  return <article className="product-card">
    {item.status === 'Em construção' && <div className="construction-banner">{t('statusBuilding')}</div>}
    <MediaPlaceholder item={item} />
    <div className="product-copy">
      <span className="eyebrow">{item.type === 'game' ? t('game') : t('app')}</span>
      <h3>{item.name}</h3>
      <p>{item.description || t('pendingDescription')}</p>
      <div className="card-meta"><span>{item.category || t('pendingCategory')}</span><span>{item.platform || t('pending')}</span></div>
      <button className="text-button" onClick={() => onOpen(item)}>{t('details')} <span aria-hidden="true">↗</span></button>
    </div>
  </article>
}
