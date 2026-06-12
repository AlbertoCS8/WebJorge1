import { PageSeo } from '../components/PageSeo'
import { useLanguage } from '../context/LanguageContext'

export function MediaServicePage() {
  const { t } = useLanguage()

  return (
    <>
      <PageSeo
        title={t('Jorge Media Service', 'Jorge Media Service')}
        description={t(
          'Servicio para medios en Amsterdam con apoyo local de produccion y narrativa.',
          'Media service in Amsterdam with local production and narrative support.',
        )}
      />

      <main className="subpage-main">
        <section className="page-hero page-hero-media">
          <div className="container page-hero-grid">
            <div className="page-hero-copy">
              <p className="eyebrow">{t('Servicio para medios en Amsterdam', 'Media service in Amsterdam')}</p>
              <h1>{t('Apoyo local con historia, acceso y caracter', 'Local production support with story, access and character')}</h1>
              <p className="page-lead">
                {t(
                  'Para creadores, marcas y equipos que quieren algo mas que fondos bonitos: rutas con contexto y logistica con mirada local.',
                  'For creators, brands and teams that want more than pretty backgrounds: routes with context and logistics with local insight.',
                )}
              </p>
              <div className="page-actions">
                <a href="#services" className="btn btn-primary">
                  {t('Ver servicios', 'See services')}
                </a>
              </div>
            </div>
            <div className="page-hero-card media-highlight-card">
              <ul className="feature-list light">
                <li>{t('Ideas de localizaciones segun el tono de la pieza', 'Location ideas that fit your piece tone')}</li>
                <li>{t('Apoyo narrativo con historia y textura local', 'Narrative support with local history and texture')}</li>
                <li>{t('Coordinacion flexible para branded y editorial', 'Flexible coordination for branded and editorial formats')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="services" className="page-section page-surface">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{t('Servicios', 'Services')}</p>
                <h2>{t('Pensado para equipos que necesitan agilidad en terreno', 'Designed for teams that need agility on the ground')}</h2>
              </div>
              <p>
                {t(
                  'El valor no es solo ir del punto A al B: es entender que funciona visualmente y que tiene peso narrativo.',
                  'The value is not only moving from point A to B: it is understanding what works visually and what carries narrative weight.',
                )}
              </p>
            </div>

            <div className="service-grid">
              <article className="service-card">
                <span className="service-number">01</span>
                <h3>Creative scouting</h3>
                <p>{t('Rutas y referencias visuales para una atmosfera concreta.', 'Routes and visual references aligned with a specific atmosphere.')}</p>
              </article>
              <article className="service-card">
                <span className="service-number">02</span>
                <h3>Local fixer support</h3>
                <p>{t('Coordinacion de tiempos, movimientos y decisiones practicas.', 'Coordination of schedules, movement and practical decisions.')}</p>
              </article>
              <article className="service-card">
                <span className="service-number">03</span>
                <h3>Story-led guiding</h3>
                <p>{t('Contexto historico y presencia en ruta cuando la pieza lo requiere.', 'Historical context and on-route presence when the piece needs it.')}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t('Formatos de colaboracion', 'Collaboration formats')}</p>
              <h2>{t('Tres formas de trabajar juntos', 'Three ways of working together')}</h2>
            </div>
            <div className="project-grid">
              <article className="project-card project-card-featured">
                <span className="project-tag">{t('Creadores', 'Creators')}</span>
                <h3>{t('Rutas cinematograficas para reels y vlogs', 'Cinematic walks for reels and vlogs')}</h3>
                <p>{t('Paradas visuales y ritmo pensado para contenido.', 'Visual stops and rhythm designed for content.')}</p>
              </article>
              <article className="project-card">
                <span className="project-tag">{t('Marcas', 'Brands')}</span>
                <h3>{t('Soporte de campana con credibilidad local', 'Campaign support with local credibility')}</h3>
                <p>{t('Ideal para branded content con capa cultural.', 'Ideal for branded content with cultural depth.')}</p>
              </article>
              <article className="project-card">
                <span className="project-tag">{t('Editorial', 'Editorial')}</span>
                <h3>{t('Apoyo para entrevistas y piezas documentales', 'Support for interviews and documentary pieces')}</h3>
                <p>{t('Lectura humana de la ciudad para reportajes.', 'Human city reading for reports and features.')}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section page-dark-band">
          <div className="container page-dark-grid">
            <div>
              <p className="eyebrow eyebrow-light">{t('Por que funciona', 'Why this works')}</p>
              <h2>{t('Amsterdam funciona mejor cuando esta bien contada', 'Amsterdam works better when it is told well')}</h2>
            </div>
            <div className="reason-list">
              <p>{t('El objetivo no es solo mostrar Amsterdam, sino hacerla especifica.', 'The goal is not only to show Amsterdam, but to make it specific.')}</p>
              <p>{t('Produccion fluida, personalidad y contexto real.', 'Smooth production, personality and real context.')}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
