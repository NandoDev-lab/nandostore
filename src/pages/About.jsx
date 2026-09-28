import { profile } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage.js'
import ReactMarkdown from 'react-markdown'

// Página institucional com os dados do autor.
export default function About() {
  const { t } = useLanguage()

  return (
    <main className="about-page">
      <span className="eyebrow">{t('aboutAuthor')}</span>

      <h1>
        Fernando<br />
        <em>Saldanha</em>
      </h1>

      <div className="about-content">
        <div className="portrait-placeholder">
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

        <div>
          <h2>{t('aboutTitle')}</h2>

          {profile.biography ? (
            <div className="biography">
              <ReactMarkdown>
                {profile.biography}
              </ReactMarkdown>
            </div>
          ) : (
            <p>{t('biographyPending')}</p>
          )}

          <div className="pending-list">
            {!profile.biography && (
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
        </div>
      </div>
    </main>
  )
}