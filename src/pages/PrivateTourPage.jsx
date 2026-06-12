import { PageSeo } from '../components/PageSeo'
import { useLanguage } from '../context/LanguageContext'

export function PrivateTourPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageSeo
        title={t('Tour Privado Amsterdam', 'Private Tour Amsterdam')}
        description={t(
          'Tour privado en Amsterdam con ruta personalizada, ritmo flexible y contacto directo.',
          'Private tour in Amsterdam with tailored route, flexible pace and direct contact.',
        )}
      />

      <main className="subpage-main">
        <section className="page-hero page-hero-private">
          <div className="container page-hero-grid">
            <div className="page-hero-copy">
              <p className="eyebrow">{t('Tour privado en Amsterdam', 'Private tour in Amsterdam')}</p>
              <h1>{t('Una ruta hecha para tu ritmo, tus intereses y tu gente', 'A route made for your pace, interests and people')}</h1>
              <p className="page-lead">
                {t(
                  'Sin ritmo de grupo generico ni guion cerrado. Tu marcas prioridades y la experiencia se diseña para encajar contigo.',
                  'No generic group pace and no fixed script. You set priorities and the experience is designed around you.',
                )}
              </p>
              <div className="page-actions">
                <a href="https://wa.me/34662226546" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {t('Pedir disponibilidad', 'Request availability')}
                </a>
              </div>
            </div>
            <div className="page-hero-card private-price-card">
              <span className="page-card-kicker">{t('Ideal para', 'Ideal for')}</span>
              <ul className="feature-list light">
                <li>{t('Parejas, familias y grupos pequenos', 'Couples, families and small groups')}</li>
                <li>{t('Viajeros que quieren un ritmo mas cuidado', 'Travelers wanting a slower, curated pace')}</li>
                <li>{t('Interes en historia, rincones ocultos o rutas tematicas', 'Interest in history, hidden corners or thematic routes')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section page-surface">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{t('La experiencia', 'The experience')}</p>
                <h2>{t('Mas intima, mas flexible, mejor adaptada', 'More intimate, more flexible, better adapted')}</h2>
              </div>
              <p>
                {t(
                  'Un private tour no es la ruta normal con menos personas. Es un producto distinto con ritmo curado y decisiones sobre la marcha para tu grupo.',
                  'A private tour is not the normal route with fewer people. It is a different product with curated pace and route decisions made for your group.',
                )}
              </p>
            </div>

            <div className="service-grid private-benefits-grid">
              <article className="service-card">
                <span className="service-number">01</span>
                <h3>{t('Ruta a medida', 'Tailored route')}</h3>
                <p>{t('Centro historico, barrio judio, canales tranquilos o enfoque cinematografico.', 'Historic center, Jewish Quarter, quiet canals or cinematic approach.')}</p>
              </article>
              <article className="service-card">
                <span className="service-number">02</span>
                <h3>{t('Horario flexible', 'Flexible timing')}</h3>
                <p>{t('Manana, tarde o atardecer segun disponibilidad y plan del viaje.', 'Morning, afternoon or sunset depending on availability and trip plan.')}</p>
              </article>
              <article className="service-card">
                <span className="service-number">03</span>
                <h3>{t('Conversacion cercana', 'Closer conversation')}</h3>
                <p>{t('Mas espacio para preguntas, recomendaciones y contexto practico.', 'More room for questions, recommendations and practical context.')}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t('Que incluye', 'What is included')}</p>
              <h2>{t('Premium sin volverse rigido', 'Built to feel premium without becoming rigid')}</h2>
            </div>

            <div className="included-grid">
              <div className="included-panel featured-panel">
                <h3>{t('Incluido por defecto', 'Included by default')}</h3>
                <ul className="feature-list dark">
                  <li>{t('Planificacion previa segun intereses', 'Pre-tour planning based on your interests')}</li>
                  <li>{t('Ruta personalizada por Amsterdam', 'A personalized walking route in Amsterdam')}</li>
                  <li>{t('Recomendaciones de barrios y restaurantes', 'Restaurant, neighborhood and practical recommendations')}</li>
                  <li>{t('Comunicacion directa en espanol', 'Guiding in Spanish with direct communication')}</li>
                </ul>
              </div>
              <div className="included-panel">
                <h3>{t('Enfoques opcionales', 'Optional angles')}</h3>
                <p>{t('Historia, arquitectura, vida local, rincones ocultos o ritmo familiar.', 'History, architecture, local life, hidden corners or family rhythm.')}</p>
              </div>
              <div className="included-panel">
                <h3>{t('Como funciona la reserva', 'How booking works')}</h3>
                <p>{t('Escribe por WhatsApp con fecha e idea de ruta. Respuesta directa con disponibilidad.', 'Send WhatsApp with date and route idea. Direct reply with availability.')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
