export function AboutUsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Nosotros</p>
            <h1>Nuevo Mundo: una forma mas cuidada de contar Amsterdam</h1>
            <p>
              El proyecto nace para crear experiencias elegantes, humanas y con
              personalidad propia.
            </p>
          </div>
          <div className="panel">
            <h3>Lo que nos define</h3>
            <ul>
              <li>Experiencias pensadas, no rutas genericas</li>
              <li>Narrativa con contexto historico real</li>
              <li>Relacion directa con cada viajero</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cards-grid">
          <article className="info-card">
            <h3>Public tours</h3>
            <p>Rutas accesibles para descubrir la ciudad con criterio.</p>
          </article>
          <article className="info-card">
            <h3>Private tours</h3>
            <p>Experiencias personalizadas para grupos y viajeros.</p>
          </article>
          <article className="info-card">
            <h3>Media</h3>
            <p>
              Colaboraciones con creadores y marcas para contenidos en ciudad.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
