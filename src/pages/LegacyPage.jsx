export function LegacyPage({ src, title }) {
  return (
    <section className="legacy-shell" aria-label={title}>
      <iframe
        title={title}
        src={src}
        className="legacy-frame"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  )
}
