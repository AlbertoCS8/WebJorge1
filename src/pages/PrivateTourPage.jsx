export function PrivateTourPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Tour privado</p>
            <h1>Una ruta hecha para tu ritmo y tus intereses</h1>
            <p>
              Sin grupos grandes ni guiones cerrados. Disenamos la experiencia
              juntos para que encaje contigo.
            </p>
            <a
              className="btn btn-primary"
              href="https://wa.me/34662226546"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir disponibilidad
            </a>
          </div>
          <div className="panel">
            <h3>Ideal para</h3>
            <ul>
              <li>Parejas, familias y grupos pequenos</li>
              <li>Viajeros que quieren flexibilidad real</li>
              <li>Intereses historicos o rutas tematicas</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container cards-grid">
          <article className="info-card">
            <h3>Ruta a medida</h3>
            <p>Centro historico, barrio judio o rincones menos conocidos.</p>
          </article>
          <article className="info-card">
            <h3>Horario flexible</h3>
            <p>Manana, tarde o atardecer segun disponibilidad.</p>
          </article>
          <article className="info-card">
            <h3>Conversacion cercana</h3>
            <p>
              Espacio para preguntas, recomendaciones y contexto practico.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
