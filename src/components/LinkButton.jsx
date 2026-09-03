import { useLanguage } from '../i18n/useLanguage'

// Links ausentes são exibidos como estado desabilitado em vez de receber um
// href inválido. Isso comunica claramente o que ainda precisa ser preenchido.
export default function LinkButton({ href, children }) {
  const { t } = useLanguage()
  return href ? <a className="button secondary" href={href} target="_blank" rel="noreferrer">{children}</a> : <span className="button disabled">{t('pendingLink')}</span>
}
