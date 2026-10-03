import ProductCard from '../components/ProductCard'
import EbookCard from '../components/EbookCard'
import ProjectShowcase from '../components/ProjectShowcase'
import Section from '../components/Section'
import { accountingAutomationProjects, githubWebsiteProjects } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage.js'
import { getEbookTitle, sortByRecent } from '../utils/catalog'

// A home combina blocos editoriais. Os dados continuam fora desta página,
// permitindo trocar a fonte por uma API sem reescrever a apresentação.
export default function Home({ apps, ebooks, bannerBook, onOpen, onNavigate }) {
  const { t, language } = useLanguage()
  const featuredApps = sortByRecent(apps.filter((item) => item.featured)).slice(0, 4)
  const featuredEbooks = sortByRecent(ebooks.filter((item) => item.featured)).slice(0, 4)
  const recentApps = sortByRecent(apps)
  const recentEbooks = sortByRecent(ebooks)
  const renderCard = (item) => item.type === 'ebook' ? <EbookCard key={item.id} item={item} onOpen={onOpen} /> : <ProductCard key={item.id} item={item} onOpen={onOpen} />
  return <main>
    <section className="hero"><div className="hero-copy"><span className="eyebrow">{t('portal')}</span><h1>{t('heroTitle')} <em>{t('life')}</em></h1><p>{t('heroDescription')}</p><div className="hero-actions"><button className="button primary" onClick={() => onNavigate('apps')}>{t('explore')} <span>↗</span></button><button className="button quiet" onClick={() => onNavigate('ebooks')}>{t('discoverBooks')}</button></div></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-card back"><span>06</span><small>{t('projects')}</small></div><div className="hero-card front"><span>01</span><small>{t('readings')}</small><strong>Gatilhos<br />do pecado</strong></div></div></section>
    <Section title={t('featured')} kicker={t('selection')}>
      {featuredApps.length > 0 && <div className="home-catalog-group"><h3>{t('apps')}</h3><div className="featured-grid">{featuredApps.map(renderCard)}</div></div>}
      {featuredEbooks.length > 0 && <div className="home-catalog-group"><h3>{t('ebooks')}</h3><div className="featured-grid">{featuredEbooks.map(renderCard)}</div></div>}
    </Section>
    <Section title={t('recent')} kicker={t('catalog')}>
      {recentApps.length > 0 && <div className="home-catalog-group"><h3>{t('apps')}</h3><div className="product-grid">{recentApps.map(renderCard)}</div></div>}
      {recentEbooks.length > 0 && <div className="home-catalog-group"><h3>{t('ebooks')}</h3><div className="product-grid">{recentEbooks.map(renderCard)}</div></div>}
    </Section>
    {bannerBook && <section className="split-banner"><div><span className="eyebrow">{t('comingSoon')}</span><h2>{t('library')}<br /><em>{t('pauseThink')}</em></h2></div><div className="banner-book"><img src={bannerBook.cover} alt={`Capa de ${getEbookTitle(bannerBook, language)}`} loading="lazy" /></div><button className="button light" onClick={() => onOpen(bannerBook)}>{t('viewBook')} <span>↗</span></button></section>}
    <Section title={t('myProjects')} kicker={t('universe')} action={<button className="text-button" onClick={() => onNavigate('apps')}>{t('fullCatalog')} ↗</button>}><div className="project-strip">{apps.map((item, index) => <button key={item.id} className="project-chip" onClick={() => onOpen(item)}><span className={`mini-symbol symbol-${index % 4}`}>{item.name.slice(0, 1)}</span><span>{item.name}</span></button>)}</div></Section>
    <ProjectShowcase eyebrow={t('accounting')} title={t('accountingTitle')} description={t('accountingDescription')} projects={accountingAutomationProjects} icon="Py" />
    <ProjectShowcase eyebrow={t('github')} title={t('githubTitle')} description={t('githubDescription')} projects={githubWebsiteProjects} icon="<>" />
  </main>
}
