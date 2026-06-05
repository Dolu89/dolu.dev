export default function NotFound() {
  return (
    <section className="error reveal">
      <p className="eyebrow">// 404</p>
      <h1>Page not found</h1>
      <p>
        That page doesn&apos;t exist.{' '}
        <a className="link" href="/">
          Back home
        </a>
      </p>
    </section>
  )
}
