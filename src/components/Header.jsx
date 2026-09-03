import { useLanguage } from '../i18n/useLanguage.js'

// Cabeçalho global: recebe estado e callbacks do App, mas não decide rotas.
// Essa fronteira deixa a navegação simples de trocar por React Router no futuro.
export default function Header({ query, setQuery, theme, setTheme, onNavigate }) {
  const { language, setLanguage, t } = useLanguage()
  return <header className="site-header">
    <a className="brand" href="#/" onClick={() => onNavigate('home')}><span className="brand-mark">N</span><span>Nando<span className="brand-accent">Store</span></span></a>
    <nav className="main-nav" aria-label={t('home')}>
      <button onClick={() => onNavigate('home')}>{t('home')}</button><button onClick={() => onNavigate('apps')}>{t('apps')}</button><button onClick={() => onNavigate('ebooks')}>{t('ebooks')}</button><button onClick={() => onNavigate('about')}>{t('about')}</button>
    </nav>
    <div className="header-actions"><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('search')} aria-label={t('search')} /></label><select className="language-select" value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('language')}><option value="pt-BR">{t('portuguese')}</option><option value="en">{t('english')}</option></select><button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={t('theme')}>{theme === 'light' ? '☾' : '☀'}</button></div>
  </header>
}
