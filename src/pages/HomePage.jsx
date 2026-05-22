export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Walking Tours en Amsterdam</p>
            <h1>Descubre Amsterdam con una mirada local</h1>
            <p>
              Rutas a pie con historia, contexto y un ritmo humano. Sin guion
              turistico prefabricado.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://www.guruwalk.com/es/walks/55851-lo-imprescindible-de-amsterdam?ref=xzultqg5mc11fmbxnexk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar en GuruWalk
              </a>
              <a className="btn btn-ghost" href="#tours">
                Ver tours
              </a>
            </div>
          </div>
          <div className="hero-card">
            <h2>Que incluye la experiencia</h2>
            <ul>
              <li>Grupos reducidos y trato directo</li>
              <li>Historias reales y contexto local</li>
              <li>Recomendaciones utiles para tu viaje</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="tours" className="section">
        <div className="container">
          <p className="eyebrow">Tours</p>
          <h2 className="section-title">Elige tu ruta</h2>
          <div className="cards-grid">
            <article className="info-card">
              <h3>Lo imprescindible de Amsterdam</h3>
              <p>
                Introduccion dinamica para entender la ciudad: historia,
                curiosidades y lugares clave.
              </p>
            </article>
            <article className="info-card">
              <h3>Barrio judio</h3>
              <p>
                Un recorrido con memoria historica para comprender la vida judia
                antes, durante y despues de la ocupacion.
              </p>
            </article>
            <article className="info-card">
              <h3>Rutas especiales</h3>
              <p>
                Experiencias privadas o personalizadas para viajeros con
                intereses concretos.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="about" className="section alt">
        <div className="container split">
          <div>
            <p className="eyebrow">Sobre mi</p>
            <h2 className="section-title">Jorge, guia local en Amsterdam</h2>
            <p>
              Mi enfoque mezcla narrativa, historia y recomendaciones practicas
              para que te lleves una experiencia completa.
            </p>
          </div>
          <div className="panel">
            <p>
              Si prefieres una experiencia mas personalizada, tambien puedes
              reservar un tour privado o un servicio para creadores y marcas.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container faq-list">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">Preguntas frecuentes</h2>
          <article>
            <h3>Como reservo un tour?</h3>
            <p>
              Puedes reservar directamente desde GuruWalk o escribirme por
              Instagram y WhatsApp.
            </p>
          </article>
          <article>
            <h3>Hay tours privados?</h3>
            <p>
              Si. Se adaptan a ritmo, intereses y fechas de tu grupo.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
