import { profile } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage.js'
import ReactMarkdown from 'react-markdown'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa'

const profileIcons = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  'E-mail': FaEnvelope,
}

// Página institucional com os dados do autor.
export default function About() {
  const { t, language } = useLanguage()
  const biography = profile.biographyTranslations[language] || profile.biography

  return (
    <main className="about-page">
      <div className="about-profile">
        <div className="about-visual">
          <div className="about-portrait">
            {profile.photo ? (
              <img
                className="about-photo"
                src={profile.photo}
                alt={profile.name}
              />
            ) : (
              'FS'
            )}
          </div>

          <div className="profile-links">
            {[...profile.socialLinks, ...profile.professionalLinks].map((link) => {
              const Icon = profileIcons[link.label]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <section className="about-copy">
          <span className="eyebrow">{t('aboutAuthor')}</span>
          <h1>Fernando <em>Saldanha</em></h1>
          <h2>{t('aboutTitle')}</h2>

          {biography ? (
            <div className="biography">
              <ReactMarkdown>
                {biography}
              </ReactMarkdown>
            </div>
          ) : (
            <p>{t('biographyPending')}</p>
          )}

          <div className="pending-list">
            {!biography && (
              <span>{t('pendingBiography')}</span>
            )}

            {!profile.photo && (
              <span>{t('pendingPhoto')}</span>
            )}

            {!profile.socialLinks.length && (
              <span>{t('pendingSocial')}</span>
            )}

            {!profile.professionalLinks.length && (
              <span>{t('pendingContact')}</span>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}