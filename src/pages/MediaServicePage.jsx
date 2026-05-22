export function MediaServicePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Media service</p>
            <h1>Soporte local para producciones en Amsterdam</h1>
            <p>
              Apoyo para creadores, marcas y equipos editoriales que buscan
              contexto real, localizaciones y una narrativa potente.
            </p>
          </div>
          <div className="panel">
            <h3>Servicios clave</h3>
            <ul>
              <li>Scouting creativo y rutas visuales</li>
              <li>Soporte logistica local</li>
              <li>Narrativa y contexto historico en camara</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cards-grid">
          <article className="info-card">
            <h3>Creadores</h3>
            <p>Rutas cinematograficas para reels, vlogs y series de viaje.</p>
          </article>
          <article className="info-card">
            <h3>Marcas</h3>
            <p>Campanas con credibilidad local y tono editorial.</p>
          </article>
          <article className="info-card">
            <h3>Editorial</h3>
            <p>Apoyo para entrevistas, reportajes y piezas documentales.</p>
          </article>
        </div>
      </section>
    </>
  )
}
