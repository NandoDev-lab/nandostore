import { profile } from '../data/profile'

// Página institucional com campos honestamente pendentes até que o autor
// forneça biografia, foto, redes sociais e dados profissionais.
export default function About() {
  return <main className="about-page"><span className="eyebrow">O AUTOR</span><h1>PB. Fernando<br /><em>Saldanha</em></h1><div className="about-content"><div className="portrait-placeholder">{profile.photo ? <img className="about-photo" src={profile.photo} alt={profile.name} /> : 'FS'}</div><div><h2>Um espaço para projetos com propósito.</h2><p>{profile.biography || 'Esta página está preparada para receber a biografia, foto, redes sociais, contatos e links profissionais do autor.'}</p><div className="pending-list">{!profile.biography && <span>Biografia pendente</span>}{!profile.photo && <span>Foto pendente</span>}{!profile.socialLinks.length && <span>Redes sociais pendentes</span>}{!profile.professionalLinks.length && <span>Contato pendente</span>}</div></div></div></main>
}
