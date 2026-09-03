import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'

export default function FeedbackModal({ item, open, onClose }) {
  const { t } = useLanguage()
  const [shared, setShared] = useState(false)
  if (!open) return null

  const isApp = item && item.type !== 'ebook'
  const title = item ? item.name || item.title : 'NandoStore'
  const url = item ? `${window.location.origin}${window.location.pathname}#/${item.type}/${item.id}` : window.location.href

  const share = async () => {
    const shareData = { title, text: t(isApp ? 'shareAppText' : 'shareSiteText'), url }
    if (navigator.share) await navigator.share(shareData).catch(() => {})
    else {
      await navigator.clipboard?.writeText(url)
      setShared(true)
    }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
      <button className="modal-close" onClick={onClose} aria-label={t('close')}>×</button>
      <span className="eyebrow">{t('feedbackEyebrow')}</span>
      <h2 id="feedback-title">{item ? t('feedbackAppTitle') : t('feedbackTitle')}</h2>
      <p>{item ? t('feedbackAppDescription').replace('{name}', title) : t('feedbackDescription')}</p>
      <div className="feedback-actions">
        {isApp && item.googlePlay ? <a className="button primary" href={item.googlePlay} target="_blank" rel="noreferrer" onClick={onClose}>{t('rateApp')} <span>↗</span></a> : <button className="button primary" onClick={onClose}>{t('positiveRating')} <span>♥</span></button>}
        <button className="button secondary" onClick={share}>{shared ? t('copied') : t('share')} <span>↗</span></button>
      </div>
      <button className="modal-later" onClick={onClose}>{t('maybeLater')}</button>
    </section>
  </div>
}