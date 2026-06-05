import { type ReactNode } from 'react'

const YEAR = 2026

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <div className="frame">
        <header className="topbar reveal">
          <a className="wordmark" href="/">
            dolu<span className="dim">.dev</span>
            <span className="caret" aria-hidden="true" />
          </a>
          <span className="topbar-meta">freelance · backend-leaning fullstack</span>
        </header>

        <main>{children}</main>

        <footer className="footer reveal">
          <span>© {YEAR} Dolu</span>
        </footer>
      </div>
    </div>
  )
}
