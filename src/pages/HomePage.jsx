import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { PageSeo } from '../components/PageSeo'

const GURU_WALK_URL =
  'https://www.guruwalk.com/es/walks/55851-lo-imprescindible-de-amsterdam?ref=xzultqg5mc11fmbxnexk'

const faqItems = [
  {
    es: 'En que consiste el tour IMPRESCINDIBLE y que lugares incluye?',
    en: 'What does the ESSENTIAL tour consist of and what places does it include?',
    esAnswer:
      'El Tour Imprescindible te ayuda a comprender Amsterdam desde el primer momento, con monumentos emblematicos, rincones historicos y contexto local.',
    enAnswer:
      'The Essential Tour helps you understand Amsterdam from the very first moment, with iconic landmarks, historic corners and local context.',
  },
  {
    es: 'Cual es la duracion del tour?',
    en: 'How long is the tour?',
    esAnswer:
      'La duracion habitual es de 2 horas y puede extenderse hasta 30 minutos segun ritmo y preguntas del grupo.',
    enAnswer:
      'The usual duration is 2 hours and may extend up to 30 minutes depending on group pace and questions.',
  },
  {
    es: 'En que idioma se realiza el tour?',
    en: 'In what language is the tour conducted?',
    esAnswer: 'El tour se realiza exclusivamente en espanol.',
    enAnswer: 'The tour is conducted exclusively in Spanish.',
  },
  {
    es: 'Donde es el punto de encuentro y como identificar al guia?',
    en: 'Where is the meeting point and how can I identify the guide?',
    esAnswer:
      'El punto de encuentro es Grand Cafe Krasnapolsky (Plaza Dam, 9). El guia espera 10 minutos antes con paraguas naranja.',
    enAnswer:
      'Meeting point is Grand Cafe Krasnapolsky (Dam Square, 9). The guide waits 10 minutes before start with an orange umbrella.',
  },
  {
    es: 'El tour es apto para todas las edades?',
    en: 'Is the tour suitable for all ages?',
    esAnswer:
      'Si. En el tramo del Barrio Rojo se tratan temas mas adultos, por lo que se recomienda supervision para menores.',
    enAnswer:
      'Yes. In the Red Light District section, more adult topics appear, so supervision for minors is recommended.',
  },
  {
    es: 'El recorrido es accesible para personas con movilidad reducida?',
    en: 'Is the tour accessible for people with reduced mobility?',
    esAnswer:
      'Si, se puede adaptar para silla de ruedas o movilidad reducida, con puntos de descanso y ajustes de ruta.',
    enAnswer:
      'Yes, it can be adapted for wheelchairs or reduced mobility, with resting points and route adjustments.',
  },
  {
    es: 'Cual es el precio del tour?',
    en: 'What is the price of the tour?',
    esAnswer:
      'Es free tour. La aportacion habitual va de 10 a 50 euros, con recomendacion minima de 10 euros.',
    enAnswer:
      'It is a free tour. Typical contribution is between 10 and 50 EUR, with a recommended minimum of 10 EUR.',
  },
  {
    es: 'Que incluye el tour?',
    en: 'What does the tour include?',
    esAnswer:
      'Recorrido guiado de 2 horas, explicaciones historicas y culturales, paradas para fotos y respuestas a preguntas del grupo.',
    enAnswer:
      'A 2-hour guided route, historical and cultural explanations, photo stops and answers to group questions.',
  },
  {
    es: 'Como puedo reservar y con cuanta antelacion?',
    en: 'How can I make a reservation and how far in advance?',
    esAnswer:
      'Reserva en GuruWalk eligiendo dia y hora. Puedes reservar con la antelacion que quieras si hay disponibilidad.',
    enAnswer:
      'Book on GuruWalk by selecting day and time. You can book as early as you want if there is availability.',
  },
  {
    es: 'Puedo cancelar o modificar mi reserva?',
    en: 'Can I cancel or modify my reservation?',
    esAnswer:
      'Si, se puede cancelar y modificar con flexibilidad siempre que haya disponibilidad en la nueva opcion.',
    enAnswer:
      'Yes, cancellation and flexible changes are possible as long as the new option has availability.',
  },
  {
    es: 'Que pasa si llego tarde o pierdo el grupo?',
    en: 'What happens if I arrive late or lose the group?',
    esAnswer:
      'Recibiras confirmacion por WhatsApp y, si hace falta, ubicacion en tiempo real para reincorporarte.',
    enAnswer:
      'You will receive WhatsApp confirmation and, if needed, real-time location to rejoin the group.',
  },
  {
    es: 'Que ropa o equipamiento recomendais segun el clima?',
    en: 'What clothing or equipment do you recommend depending on weather?',
    esAnswer:
      'Verano: ropa ligera. Invierno: varias capas de abrigo. Siempre, calzado comodo y revisar pronostico.',
    enAnswer:
      'Summer: light clothing. Winter: multiple warm layers. Always wear comfortable shoes and check forecast.',
  },
  {
    es: 'Se realiza el tour en caso de lluvia o mal clima?',
    en: 'Is the tour held in rain or bad weather?',
    esAnswer:
      'Si. Solo se cancela en condiciones meteorologicas extremas que supongan riesgo de seguridad.',
    enAnswer:
      'Yes. It is only cancelled in extreme weather conditions that represent a safety risk.',
  },
  {
    es: 'Se puede hacer en grupo privado o personalizado?',
    en: 'Can this be done as a private or customized group?',
    esAnswer: 'Si, puedes solicitarlo en la pagina de tour privado.',
    enAnswer: 'Yes, you can request it on the private tour page.',
  },
  {
    es: 'Se permiten mascotas?',
    en: 'Are pets allowed?',
    esAnswer:
      'Si, con solicitud al menos 24 horas antes para confirmar que no haya objeciones en el grupo.',
    enAnswer:
      'Yes, with a request at least 24 hours in advance to confirm there are no objections in the group.',
  },
  {
    es: 'Como llegar al punto de encuentro en transporte publico o coche?',
    en: 'How to get to the meeting point by public transport or car?',
    esAnswer:
      'Plaza Dam esta muy bien conectada por transporte publico. En coche se recomienda Parking Center Oosterdok.',
    enAnswer:
      'Dam Square is very well connected by public transport. By car, Parking Center Oosterdok is recommended.',
  },
  {
    es: 'Se acepta tarjeta o solo efectivo/donacion?',
    en: 'Are cards accepted or only cash/donation?',
    esAnswer:
      'Se acepta tarjeta y pagos electronicos, aunque se prefiere efectivo al final del tour.',
    enAnswer:
      'Cards and electronic payments are accepted, although cash at the end of the tour is preferred.',
  },
  {
    es: 'Tienes otra pregunta que no aparece en esta lista?',
    en: 'Do you have another question not listed here?',
    esAnswer:
      'Contactanos por WhatsApp, llamada o correo. Horario recomendado: 10:00 a 18:00.',
    enAnswer:
      'Contact us via WhatsApp, call or email. Recommended hours: 10:00 to 18:00.',
  },
]

export function HomePage() {
  const { language, t } = useLanguage()
  const [search, setSearch] = useState('')

  const filteredFaq = useMemo(() => {
    if (!search.trim()) {
      return faqItems
    }

    const term = search.toLowerCase()
    return faqItems.filter((item) => {
      const question = language === 'es' ? item.es : item.en
      const answer = language === 'es' ? item.esAnswer : item.enAnswer
      return question.toLowerCase().includes(term) || answer.toLowerCase().includes(term)
    })
  }, [language, search])

  return (
    <>
      <PageSeo
        title={t('Jorge - Tours por Amsterdam', 'Jorge - Amsterdam Walking Tours')}
        description={t(
          'Walking tours en Amsterdam con Jorge. Historia, cultura local y experiencias inolvidables.',
          'Walking tours in Amsterdam with Jorge. History, local culture and unforgettable experiences.',
        )}
      />

      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('Descubre Amsterdam con Jorge', 'Discover Amsterdam with Jorge')}</h1>
          <p className="hero-subtitle">
            {t(
              'Tours a pie • Experto local • Experiencias inolvidables',
              'Walking Tours • Local Expert • Unforgettable Experiences',
            )}
          </p>
          <div className="hero-cta">
            <a className="btn btn-CTA" href="#tours">
              {t('Reserva un tour', 'Book a Tour')}
            </a>
            <div className="hidden-text">
              <span>{t('Para reservar visita mi', 'To book a tour, visit my')}</span>{' '}
              <a href={GURU_WALK_URL} target="_blank" rel="noopener noreferrer" className="link-btn">
                GuruWalk
              </a>{' '}
              <span>{t('o contacta por mis redes sociales.', 'or contact me through my social media.')}</span>
            </div>
          </div>
        </div>
        <div className="hero-overlay">
          <iframe
            className="hero-video"
            src="https://player.vimeo.com/video/1188696419?background=1&autoplay=1&muted=1&loop=1"
            title="Amsterdam video"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
      </section>

      <section id="tours" className="tours">
        <div className="container">
          <h2 className="section-title">{t('Elige un tour', 'Pick a Tour')}</h2>
          <div className="tours-grid">
            <div className="tour-card">
              <h3>{t('Lo imprescindible de Amsterdam', 'Amsterdam Essentials Tour')}</h3>
              <p>
                {t(
                  'Una introduccion dinamica a la ciudad: historia, cultura local y rincones imprescindibles.',
                  'A dynamic introduction to Amsterdam through history, local culture and must-see corners.',
                )}
              </p>
              <ul className="tour-highlights">
                <li>{t('Duracion: 2 horas', 'Duration: 2 hours')}</li>
                <li>{t('Historia y secretos de Amsterdam', 'History and secrets of Amsterdam')}</li>
                <li>{t('Cultura local y curiosidades', 'Local culture and curiosities')}</li>
                <li>{t('Tour dinamico y entretenido', 'Dynamic and entertaining tour')}</li>
              </ul>
              <div style={{ width: '100%', textAlign: 'center', marginTop: 'auto', marginBottom: '2rem' }}>
                <a href={GURU_WALK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-guru">
                  {t('Reserva ya en GuruWalk', 'Book Now on GuruWalk')}
                </a>
              </div>
            </div>

            <div className="tour-card">
              <h3>{t('El barrio judio de Amsterdam', 'The Jewish Quarter of Amsterdam')}</h3>
              <p>{t('La vida judia antes, durante y despues de la ocupacion.', 'Jewish life before, during and after the occupation.')}</p>
              <ul className="tour-highlights">
                <li>{t('Duracion: 2 horas', 'Duration: 2 hours')}</li>
                <li>{t('Historia judia de Amsterdam', 'Jewish history of Amsterdam')}</li>
                <li>{t('Segunda Guerra Mundial y memoria', 'Second World War and memory')}</li>
                <li>{t('Historias de resistencia y supervivencia', 'Stories of resistance and survival')}</li>
              </ul>
              <div style={{ width: '100%', textAlign: 'center', marginTop: 'auto', marginBottom: '2rem' }}>
                <a href="https://wa.me/34662226546" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-guru">
                  {t('Consulta disponibilidad', 'Check availability')}
                </a>
              </div>
            </div>

            <div className="tour-card">
              <h3>{t('Tour Privado', 'Private Tour')}</h3>
              <p>
                {t(
                  'Una experiencia totalmente personalizada para descubrir Amsterdam a tu ritmo con un guia local.',
                  'A fully personalized experience to discover Amsterdam at your own pace with a local guide.',
                )}
              </p>
              <ul className="tour-highlights">
                <li>{t('Tour 100% personalizado', '100% personalized tour')}</li>
                <li>{t('Experiencia exclusiva y cercana', 'Exclusive and personal experience')}</li>
                <li>{t('Amsterdam a tu ritmo', 'Amsterdam at your pace')}</li>
                <li>{t('Guia local en espanol', 'Local guide in Spanish')}</li>
              </ul>
              <div style={{ width: '100%', textAlign: 'center', marginTop: 'auto', marginBottom: '2rem' }}>
                <Link to="/private-tour" className="btn btn-primary btn-guru">
                  {t('Descubre el tour privado', 'Discover the private tour')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="decorative-image-container">
        <img
          src="/legacy/images/Horizontal/FOTON%201.jpg"
          alt="Amsterdam canals"
          className="decorative-img visible"
        />
      </div>

      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">{t('Sobre mi', 'About Jorge')}</h2>
          <div className="about-content">
            <div className="about-image">
              <img src="/legacy/images/DSC01739.jpg" alt="Jorge - Amsterdam Tour Guide" />
            </div>
            <div className="about-text">
              <p>
                {t(
                  'Soy Jorge, madrileno de nacimiento y guia turistico por vocacion. Llegue a Amsterdam en 2023 buscando un nuevo reto profesional y personal.',
                  'I am Jorge, born in Madrid and a tour guide by vocation. I arrived in Amsterdam in 2023 looking for a new professional and personal challenge.',
                )}
              </p>
              <p>
                {t(
                  'Amo la historia, disfruto hablando con la gente y me encanta ensenar Amsterdam de una forma cercana, elegante y diferente.',
                  'I love history, I enjoy talking to people and I love teaching Amsterdam in a close, elegant and different way.',
                )}
              </p>
              <p>
                {t(
                  'Por eso he creado Nuevo Mundo, un proyecto muy personal con tours de maxima calidad, grupos reducidos y experiencias cuidadas al detalle.',
                  'That is why I created Nuevo Mundo, a very personal project to offer high-quality tours, small groups and carefully crafted experiences.',
                )}
              </p>
              <a href={GURU_WALK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                {t('Reserva ya', 'Book now')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="photos-showcase">
        <div className="photo-row">
          <img
            src="/legacy/images/Vertical/FOTON%203.jpg"
            alt="Amsterdam streets"
            className="photo-media photo-vertical"
            data-aos="fade-right"
            data-aos-duration="1000"
          />
          <img
            src="/legacy/images/Horizontal/FOTON%204.jpg"
            alt="Dam Square"
            className="photo-media photo-horizontal"
            data-aos="fade-down"
            data-aos-duration="1000"
          />
          <img
            src="/legacy/images/Vertical/FOTON%205.jpg"
            alt="Amsterdam bridges"
            className="photo-media photo-vertical"
            data-aos="fade-left"
            data-aos-duration="1000"
          />
        </div>
        <div className="photo-row">
          <img
            src="/legacy/images/Horizontal/FOTON%206.jpg"
            alt="Canal houses"
            className="photo-media photo-horizontal-wide"
            data-aos="fade-up"
            data-aos-duration="1000"
          />
        </div>
        <div className="photo-row">
          <img
            src="/legacy/images/Vertical/FOTON%202.jpg"
            alt="Amsterdam architecture"
            className="photo-media photo-vertical"
            data-aos="fade-right"
            data-aos-duration="1000"
          />
          <img
            src="/legacy/images/Vertical/FOTON%207.jpg"
            alt="Amsterdam culture"
            className="photo-media photo-vertical"
            data-aos="fade-up"
            data-aos-duration="1000"
          />
          <img
            src="/legacy/images/Horizontal/FOTON%208.jpg"
            alt="Amsterdam views"
            className="photo-media photo-horizontal"
            data-aos="fade-left"
            data-aos-duration="1000"
          />
        </div>
      </div>

      <section id="faq" className="faq">
        <div className="container">
          <h2 className="section-title">{t('Preguntas Frecuentes', 'Frequently Asked Questions')}</h2>
          <div className="faq-search-shell">
            <label className="faq-search-label" htmlFor="faq-search">
              {t('Busca por palabra', 'Search by word')}
            </label>
            <div className="faq-search-bar">
              <input
                type="search"
                id="faq-search"
                className="faq-search-input"
                placeholder={t('Busca por palabras relacionadas a tu pregunta', 'Search for words related to your question')}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <p className="faq-search-empty" hidden={filteredFaq.length !== 0}>
              {t('Ninguna pregunta contiene esa palabra.', 'No FAQs contain that word.')}
            </p>
          </div>

          <div className="faq-container">
            {filteredFaq.map((item) => (
              <details className="faq-item" key={item.es}>
                <summary className="faq-question">
                  <span>{language === 'es' ? item.es : item.en}</span>
                </summary>
                <div className="faq-answer">
                  <p>{language === 'es' ? item.esAnswer : item.enAnswer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
