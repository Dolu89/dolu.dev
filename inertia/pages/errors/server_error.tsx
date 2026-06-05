export default function ServerError() {
  return (
    <section className="error reveal">
      <p className="eyebrow">// 500</p>
      <h1>Something went wrong</h1>
      <p>
        An unexpected error occurred.{' '}
        <a className="link" href="/">
          Back home
        </a>
      </p>
    </section>
  )
}
