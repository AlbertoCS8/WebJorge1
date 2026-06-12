import { PageSeo } from '../components/PageSeo'
import { useLanguage } from '../context/LanguageContext'

export function AboutUsPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageSeo
        title={t('Nuevo Mundo - Sobre Nosotros', 'Nuevo Mundo - About Us')}
        description={t(
          'Conoce Nuevo Mundo, el proyecto detras de los tours y servicios de Jorge en Amsterdam.',
          'Learn about Nuevo Mundo, the project behind Jorge tours and services in Amsterdam.',
        )}
      />

      <main className="subpage-main">
        <section className="page-hero page-hero-company">
          <div className="container page-hero-grid">
            <div className="page-hero-copy">
              <p className="eyebrow">{t('Sobre la empresa', 'About the company')}</p>
              <h1>{t('Nuevo Mundo nace para contar Amsterdam con mas cuidado e intencion', 'Nuevo Mundo was created to tell Amsterdam with more care and intention')}</h1>
              <p className="page-lead">
                {t(
                  'Detras de los tours hay una idea mas amplia: crear experiencias elegantes y humanas en tours publicos, privados y colaboraciones.',
                  'Behind the tours there is a broader idea: creating elegant and human experiences in public tours, private routes and collaborations.',
                )}
              </p>
              <div className="page-actions">
                <a href="#story" className="btn btn-primary">
                  {t('Leer nuestra historia', 'Read our story')}
                </a>
              </div>
            </div>
            <div className="page-hero-card">
              <span className="page-card-kicker">{t('Lo que nos define', 'What defines us')}</span>
              <ul className="feature-list light">
                <li>{t('Experiencias cuidadas en lugar de rutas genericas', 'Carefully designed experiences instead of generic routes')}</li>
                <li>{t('Narrativa con raiz historica y local', 'Strong narrative rooted in local history')}</li>
                <li>{t('Relacion directa con cada viajero o colaborador', 'Direct relationship with each traveler and collaborator')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="story" className="page-section page-surface">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{t('Nuestra historia', 'Our story')}</p>
                <h2>{t('Un proyecto personal con punto de vista propio', 'A personal project with its own point of view')}</h2>
              </div>
              <p>
                {t(
                  'Nuevo Mundo crece desde la forma de guiar de Jorge: cercana pero cuidada, entretenida pero rigurosa.',
                  'Nuevo Mundo grows from Jorge way of guiding: close yet refined, entertaining yet rigorous.',
                )}
              </p>
            </div>

            <div className="service-grid">
              <article className="service-card">
                <span className="service-number">01</span>
                <h3>Craft over volume</h3>
                <p>{t('No se trata de hacer mas tours, sino de hacerlos mejor.', 'It is not about doing more tours, but doing them better.')}</p>
              </article>
              <article className="service-card">
                <span className="service-number">02</span>
                <h3>A recognizable style</h3>
                <p>{t('Historia, cultura local y estetica en un tono editorial.', 'History, local culture and aesthetics in an editorial tone.')}</p>
              </article>
              <article className="service-card">
                <span className="service-number">03</span>
                <h3>Flexible growth</h3>
                <p>{t('El proyecto crece sin perder su voz.', 'The project can grow without losing its voice.')}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t('Que hacemos', 'What we do')}</p>
              <h2>{t('Tres lineas de trabajo, una forma de entender la ciudad', 'Three lines of work, one way to understand the city')}</h2>
            </div>
            <div className="project-grid">
              <article className="project-card project-card-featured">
                <span className="project-tag">{t('Tours publicos', 'Public tours')}</span>
                <h3>{t('Rutas accesibles con personalidad', 'Accessible routes with personality')}</h3>
                <p>{t('Rutas compartidas para descubrir Amsterdam con criterio.', 'Shared routes to discover Amsterdam properly.')}</p>
              </article>
              <article className="project-card">
                <span className="project-tag">{t('Tours privados', 'Private tours')}</span>
                <h3>{t('Experiencias a medida', 'Tailored experiences')}</h3>
                <p>{t('Rutas adaptadas a ritmo, intereses y contexto del grupo.', 'Routes adapted to pace, interests and group context.')}</p>
              </article>
              <article className="project-card">
                <span className="project-tag">Media</span>
                <h3>{t('Soporte para creadores y marcas', 'Support for creators and brands')}</h3>
                <p>{t('Produccion local y narrativa para piezas con peso.', 'Local production and storytelling for high-impact pieces.')}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section page-dark-band">
          <div className="container page-dark-grid">
            <div>
              <p className="eyebrow eyebrow-light">{t('Filosofia', 'Philosophy')}</p>
              <h2>{t('No vendemos Amsterdam como postal', 'We do not sell Amsterdam as a postcard')}</h2>
            </div>
            <div className="reason-list">
              <p>{t('Hay espacio para belleza, pero tambien para contexto.', 'There is room for beauty, but also for context.')}</p>
              <p>{t('Nuevo Mundo mantiene esa coherencia mientras crece.', 'Nuevo Mundo keeps this coherence while it grows.')}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
