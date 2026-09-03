import { profile } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage.js'

// Página institucional com campos honestamente pendentes até que o autor
// forneça biografia, foto, redes sociais e dados profissionais.
export default function About() {
  const { t } = useLanguage()
  return <main className="about-page"><span className="eyebrow">{t('aboutAuthor')}</span><h1>PB. Fernando<br /><em>Saldanha</em></h1><div className="about-content"><div className="portrait-placeholder">{profile.photo ? <img className="about-photo" src={profile.photo} alt={profile.name} /> : 'FS'}</div><div><h2>{t('aboutTitle')}</h2><p>{profile.biography || t('biographyPending')}</p><div className="pending-list">{!profile.biography && <span>{t('pendingBiography')}</span>}{!profile.photo && <span>{t('pendingPhoto')}</span>}{!profile.socialLinks.length && <span>{t('pendingSocial')}</span>}{!profile.professionalLinks.length && <span>{t('pendingContact')}</span>}</div></div></div></main>
}
