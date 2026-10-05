import LinkButton from '../components/LinkButton'
import MediaPlaceholder from '../components/MediaPlaceholder'
import { useLanguage } from '../i18n/useLanguage.js'
import { getEbookTitle } from '../utils/catalog.js'

// Renderiza campos e ações conforme `item.type`. Links vazios não geram botões;
// para e-books, o título acompanha o idioma e a plataforma de venda substitui
// metadados editoriais que não são usados pelo catálogo atual.
export default function Detail({ item, onBack, onFeedback }) {
  const { t, language } = useLanguage()
  const isBook = item.type === 'ebook'
  const title = isBook ? getEbookTitle(item, language) : item.name || item.title
  const fields = isBook ? [['Autor', item.author], ['Categoria', item.category], ['Formato', item.format], [t('availableAt'), item.platform || t('unpublished')]] : [['Categoria', item.category], ['Plataforma', item.platform], ['Status', item.status], ['Versão', item.version], ['Tamanho', item.size], ['Atualização', item.updatedAt]]
  return (
    <main className="detail-page">
      <button className="back-button" onClick={onBack}>← {t('back')}</button>
      <div className="detail-top">
        <MediaPlaceholder item={item} large label={title} />
        <div className="detail-intro">
          {item.status === 'Em construção' && <div className="construction-banner detail-banner">{t('statusBuilding')}</div>}
          <span className="eyebrow">{isBook ? t('ebookLabel') : item.type === 'game' ? t('gameLabel') : t('appLabel')}</span>
          <h1>{title}</h1>
          <p className="lead">{isBook ? item.author : item.description || t('pendingDescription')}</p>
          <div className="detail-actions">
            {(isBook ? item.purchaseLink : item.download) && (
              <LinkButton href={isBook ? item.purchaseLink : item.download}>
                {isBook ? t('buy') : t('download')} <span>↗</span>
              </LinkButton>
            )}
            {!isBook && item.googlePlay && <LinkButton href={item.googlePlay}>Google Play</LinkButton>}
            {isBook && item.sample && <LinkButton href={item.sample}>{t('sample')}</LinkButton>}
            <button className="button quiet" onClick={onFeedback}>{t('share')} ↗</button>
          </div>
        </div>
      </div>
      <div className="detail-body">
        <div>
          <h2>{isBook ? t('synopsis') : t('aboutProject')}</h2>
          <p>{isBook ? item.synopsis : item.fullDescription || item.description || t('unavailable')}</p>
        </div>
        <aside>
          <h3>{t('information')}</h3>
          {fields.map(([label, value]) => <div className="info-row" key={label}><span>{label}</span><strong>{value || t('pending')}</strong></div>)}
        </aside>
      </div>
      {!isBook && (
        <div className="screenshots">
          <h2>{t('screenshots')}</h2>
          <div className="screenshot-row">
            {item.screenshots.length
              ? item.screenshots.map((image) => <img key={image} src={image} alt={`Tela de ${item.name}`} />)
              : <div className="screenshot-empty">{t('screenshotsPending')}</div>}
          </div>
        </div>
      )}
    </main>
  )
}
