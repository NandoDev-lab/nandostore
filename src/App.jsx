import { useEffect, useState } from 'react'
import { apps } from './data/apps'
import { ebooks } from './data/ebooks'
import Header from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Detail from './pages/Detail'
import About from './pages/About'
import SearchResults from './pages/SearchResults'
import { allItems as getAllItems } from './utils/catalog'
import './App.css'

// App é o ponto de composição da aplicação. Estado global, tema e rota ficam
// aqui; cada regra visual e página mora em seu próprio módulo.
const catalogItems = getAllItems(apps, ebooks)

// O hash evita erro 404 ao recarregar páginas em hospedagem estática. O formato
// /app/id e /ebook/id também torna cada detalhe compartilhável por URL.
const readHash = () => window.location.hash.slice(2) || 'home'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nandostore-theme') || 'light')
  const [query, setQuery] = useState('')
  const [route, setRoute] = useState(readHash)
  const [selected, setSelected] = useState(null)

  // Persistir o tema no navegador mantém a preferência entre visitas sem
  // exigir backend ou conta de usuário.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('nandostore-theme', theme)
  }, [theme])

  // Toda mudança de hash passa por um único ponto, inclusive quando o usuário
  // usa os botões voltar/avançar do navegador.
  useEffect(() => {
    const handleHash = () => {
      const nextRoute = readHash()
      const [kind, id] = nextRoute.split('/')
      setRoute(nextRoute)
      setSelected(kind === 'app' || kind === 'ebook' ? catalogItems.find((item) => item.id === id) || null : null)
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Navegação de seção limpa a busca e a seleção atual para evitar estados
  // antigos aparecendo depois que o usuário muda de área.
  const navigate = (next) => {
    setSelected(null)
    setQuery('')
    window.location.hash = `/${next}`
  }

  const openItem = (item) => {
    window.location.hash = `/${item.type}/${item.id}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const content = selected
    ? <Detail item={selected} onBack={() => navigate('home')} />
    : route === 'apps' ? <Catalog type="apps" apps={apps} ebooks={ebooks} onOpen={openItem} />
      : route === 'ebooks' ? <Catalog type="ebooks" apps={apps} ebooks={ebooks} onOpen={openItem} />
        : route === 'about' ? <About />
          : query ? <main><SearchResults items={catalogItems} query={query} onOpen={openItem} /></main>
            : <Home apps={apps} ebooks={ebooks} onOpen={openItem} onNavigate={navigate} />

  return <div className="app-shell"><Header query={query} setQuery={setQuery} theme={theme} setTheme={setTheme} onNavigate={navigate} />{content}<footer><span>© {new Date().getFullYear()} NandoStore</span><span>Projetos de PB. Fernando Saldanha</span><button onClick={() => navigate('about')}>Sobre o portal ↗</button></footer></div>
}
