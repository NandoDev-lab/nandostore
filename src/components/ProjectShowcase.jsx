import { useLanguage } from '../i18n/useLanguage.js'

// Recebe uma lista com id, name, description, technologies, repository e demo.
// A lista vazia é intencional até que existam projetos e demonstrações reais;
// assim a interface orienta o cadastro sem inventar conteúdo.
export default function ProjectShowcase({ eyebrow, title, description, projects, icon }) {
  const { t } = useLanguage()
  return <section className="project-showcase">
    <div className="showcase-heading"><div className="showcase-icon" aria-hidden="true">{icon}</div><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div></div>
    {projects.length ? <div className="showcase-grid">{projects.map((project) => <article className="showcase-card" key={project.id}><div className="showcase-card-top"><span>{project.technologies?.join(' / ') || t('techPending')}</span><span>{t('project')}</span></div><h3>{project.name}</h3><p>{project.description || t('pendingDescription')}</p><div className="showcase-links">{project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">{t('repository')} ↗</a> : <span>{t('repository')} {t('pending').toLowerCase()}</span>}{project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">{t('demo')} ↗</a> : <span>{t('demo')} {t('pending').toLowerCase()}</span>}</div></article>)}</div> : <div className="showcase-empty"><strong>{t('emptyShowcase')}</strong><span>{t('addProjects')} <code>src/data/projects.js</code>.</span></div>}
  </section>
}
