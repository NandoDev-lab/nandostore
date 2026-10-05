import { supportedLanguages } from '../i18n/languages.js'
import { useLanguage } from '../i18n/useLanguage.js'

// Recebe busca, tema e callback de navegação controlados pelo App. O seletor
// grava o idioma pelo provider; este componente não mantém estado local próprio.
export default function Header({ query, setQuery, theme, setTheme, onNavigate }) {
  const { language, setLanguage, t } = useLanguage()
  return <header className="site-header">
    <a className="brand" href="#/" onClick={() => onNavigate('home')}><span className="brand-mark">N</span><span>Nando<span className="brand-accent">Store</span></span></a>
    <nav className="main-nav" aria-label={t('home')}>
      <button onClick={() => onNavigate('home')}>{t('home')}</button><button onClick={() => onNavigate('apps')}>{t('apps')}</button><button onClick={() => onNavigate('ebooks')}>{t('ebooks')}</button><button onClick={() => onNavigate('about')}>{t('about')}</button>
    </nav>
    <div className="header-actions"><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('search')} aria-label={t('search')} /></label><select className="language-select" value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('language')}>{supportedLanguages.map(([code, label]) => <option value={code} key={code}>{label}</option>)}</select><button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={t('theme')}>{theme === 'light' ? '☾' : '☀'}</button></div>
  </header>
}
