import { Link } from '@inertiajs/react'
import Tips from '~/components/tips'

type Project = {
  name: string
  href: string
  description: string
  tags: string[]
  archived?: boolean
}

const PROJECTS: Project[] = [
  {
    name: 'Bips.xyz',
    href: 'https://bips.xyz',
    description: 'The easiest way to view and share Bitcoin Improvement Proposals.',
    tags: ['BIP', 'Reference'],
  },
  {
    name: 'nips.nostr.com',
    href: 'https://nips.nostr.com',
    description: 'The easiest way to view and share Nostr Implementation Possibilities.',
    tags: ['NIP', 'Reference'],
  },
  {
    name: 'Zerologin.co',
    href: 'https://zerologin.co',
    description: 'A passwordless authentication server using LNURL-auth.',
    tags: ['LNURL-auth', 'Auth'],
    archived: true,
  },
  {
    name: 'Zerologin Mobile',
    href: 'https://github.com/zerologin/zerologin-mobile',
    description: 'Mobile app for holding private keys and authenticating.',
    tags: ['Mobile', 'Keys'],
    archived: true,
  },
  {
    name: 'Una',
    href: 'https://github.com/blc-org/una',
    description: 'A Universal (Lightning) Node API.',
    tags: ['Lightning', 'API'],
    archived: true,
  },
  {
    name: 'Una-connect',
    href: 'https://github.com/blc-org/una-connect',
    description: 'Connect any application to your LN node without disclosing your credentials.',
    tags: ['Lightning', 'Privacy'],
    archived: true,
  },
  {
    name: 'Ligess',
    href: 'https://github.com/dolu89/ligess',
    description: 'A personal Lightning address server.',
    tags: ['Lightning', 'Self-host'],
    archived: true,
  },
]

const activeProjects = PROJECTS.filter((p) => !p.archived)
const archivedProjects = PROJECTS.filter((p) => p.archived)

function ProjectRow({ project, delay }: { project: Project; delay: number }) {
  return (
    <a
      className={`project reveal${project.archived ? ' is-archived' : ''}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="project-top">
        <span className="project-name">{project.name}</span>
        <span className="arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <p className="project-desc">{project.description}</p>
      <div className="tags">
        {project.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </a>
  )
}

type SocialLink = { label: string; href: string; internal?: boolean }

const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/dolu89' },
  { label: 'X / Twitter', href: 'https://twitter.com/dolu_web' },
  // Temporarily pointing to the external blog. Switch back to
  // `{ href: '/blog', internal: true }` once the internal blog is enabled.
  { label: 'Blog', href: 'https://blog.dolu.dev' },
]

const NPUB = 'npub1txukm7xckhnxkwu450sm59vh2znwm45mewaps4awkef2tvsgh4vsf7phrl'

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow reveal" style={{ animationDelay: '40ms' }}>
          // fullstack developer
        </p>
        <h1 className="reveal" style={{ animationDelay: '80ms' }}>
          Dolu
        </h1>
        <p className="lede reveal" style={{ animationDelay: '140ms' }}>
          Freelance fullstack web developer with a preference for backend work. I build
          open-source software for Bitcoin, the Lightning&nbsp;Network, and Nostr.
        </p>
        <nav className="hero-links reveal" style={{ animationDelay: '200ms' }}>
          {SOCIALS.map((s) =>
            s.internal ? (
              <Link key={s.href} className="link" href={s.href}>
                {s.label}
                <span className="ext" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <a key={s.href} className="link" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
                <span className="ext" aria-hidden="true">
                  ↗
                </span>
              </a>
            )
          )}
        </nav>
      </section>

      <section className="block">
        <div className="section-head reveal">
          <span className="idx">01</span>
          <h2>Projects</h2>
        </div>
        <div className="projects">
          {activeProjects.map((p, i) => (
            <ProjectRow key={p.href} project={p} delay={i * 50} />
          ))}
        </div>

        {archivedProjects.length > 0 && (
          <div className="archived-group">
            <h3 className="archived-head reveal">Archived</h3>
            <div className="projects archived">
              {archivedProjects.map((p, i) => (
                <ProjectRow key={p.href} project={p} delay={i * 40} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="block">
        <div className="section-head reveal">
          <span className="idx">02</span>
          <h2>Contact</h2>
        </div>
        <div className="contact reveal">
          <div className="contact-item">
            <span className="contact-label">X / Twitter</span>
            <a className="link" href="https://twitter.com/dolu_web" target="_blank" rel="noreferrer">
              @Dolu_web
              <span className="ext" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Nostr</span>
            <div className="codeblock">
              <span className="codeblock-label">npub</span>
              <code>{NPUB}</code>
            </div>
            <p className="nip05">
              NIP-05 alias <code>dolu@dolu.dev</code>
            </p>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="section-head reveal">
          <span className="idx">03</span>
          <h2>Tips</h2>
        </div>
        <p className="lede small reveal">
          If something here was useful, you can drop a few sats. ⚡
        </p>
        <div className="tips reveal">
          <Tips />
        </div>
      </section>
    </>
  )
}
