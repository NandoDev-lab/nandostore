import ProductCard from '../components/ProductCard'
import ProjectShowcase from '../components/ProjectShowcase'
import Section from '../components/Section'
import { accountingAutomationProjects, githubWebsiteProjects } from '../data/projects'

// A home combina blocos editoriais. Os dados continuam fora desta página,
// permitindo trocar a fonte por uma API sem reescrever a apresentação.
export default function Home({ apps, ebooks, onOpen, onNavigate }) {
  const recent = apps.slice(0, 4)
  return <main>
    <section className="hero"><div className="hero-copy"><span className="eyebrow">PORTAL DE PROJETOS</span><h1>Ideias que ganham <em>vida.</em></h1><p>Um espaço para descobrir aplicativos, jogos e leituras criados por PB. Fernando Saldanha.</p><div className="hero-actions"><button className="button primary" onClick={() => onNavigate('apps')}>Explorar aplicativos <span>↗</span></button><button className="button quiet" onClick={() => onNavigate('ebooks')}>Conhecer os e-books</button></div></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-card back"><span>06</span><small>PROJETOS</small></div><div className="hero-card front"><span>01</span><small>LEITURA</small><strong>Gatilhos<br />do pecado</strong></div></div></section>
    <Section title="Em destaque" kicker="Seleção editorial"><div className="featured-grid">{apps.filter((item) => item.featured).slice(0, 3).map((item) => <ProductCard key={item.id} item={item} onOpen={onOpen} />)}</div></Section>
    <Section title="Mais recentes" kicker="Catálogo"><div className="product-grid">{recent.map((item) => <ProductCard key={item.id} item={item} onOpen={onOpen} />)}</div></Section>
    <section className="split-banner"><div><span className="eyebrow">EM BREVE</span><h2>Uma biblioteca para<br /><em>pausar e pensar.</em></h2></div><div className="banner-book"><span>G</span><strong>Gatilhos<br />do pecado</strong><small>PB. Fernando Saldanha</small></div><button className="button light" onClick={() => onOpen(ebooks[0])}>Ver e-book <span>↗</span></button></section>
    <Section title="Meus projetos" kicker="Universo NandoStore" action={<button className="text-button" onClick={() => onNavigate('apps')}>Ver catálogo completo ↗</button>}><div className="project-strip">{apps.map((item, index) => <button key={item.id} className="project-chip" onClick={() => onOpen(item)}><span className={`mini-symbol symbol-${index % 4}`}>{item.name.slice(0, 1)}</span><span>{item.name}</span></button>)}</div></Section>
    <ProjectShowcase eyebrow="AUTOMAÇÃO CONTÁBIL" title="Automação contábil com Python" description="Demonstrações de ferramentas e fluxos de automação para rotinas contábeis." projects={accountingAutomationProjects} icon="Py" />
    <ProjectShowcase eyebrow="WEB NO GITHUB" title="Sites criados no GitHub" description="Uma vitrine para sites desenvolvidos e publicados através do GitHub." projects={githubWebsiteProjects} icon="<>" />
  </main>
}
