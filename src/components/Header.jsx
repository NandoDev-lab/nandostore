// Cabeçalho global: recebe estado e callbacks do App, mas não decide rotas.
// Essa fronteira deixa a navegação simples de trocar por React Router no futuro.
export default function Header({ query, setQuery, theme, setTheme, onNavigate }) {
  return <header className="site-header">
    <a className="brand" href="#/" onClick={() => onNavigate('home')}><span className="brand-mark">N</span><span>Nando<span className="brand-accent">Store</span></span></a>
    <nav className="main-nav" aria-label="Navegação principal">
      <button onClick={() => onNavigate('home')}>Início</button><button onClick={() => onNavigate('apps')}>Aplicativos</button><button onClick={() => onNavigate('ebooks')}>E-books</button><button onClick={() => onNavigate('about')}>Sobre</button>
    </nav>
    <div className="header-actions"><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar no catálogo" aria-label="Pesquisar no catálogo" /></label><button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Alternar tema">{theme === 'light' ? '☾' : '☀'}</button></div>
  </header>
}
