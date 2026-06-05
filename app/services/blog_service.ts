/**
 * Read-only blog data source.
 *
 * For now this serves a handful of example posts defined inline. Authoring
 * happens elsewhere — when a real source is wired in (markdown files, a CMS,
 * Nostr long-form events, …) only this module needs to change. The controller
 * and the Inertia pages consume the `BlogPostMeta` / `BlogPost` shapes below.
 */

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  /** ISO date (YYYY-MM-DD) */
  date: string
  readingTime: string
  tags: string[]
}

export type BlogPost = BlogPostMeta & {
  /** Trusted, pre-rendered HTML for the article body. */
  html: string
}

const POSTS: BlogPost[] = [
  {
    slug: 'rebuilding-dolu-dev-on-adonisjs',
    title: 'Rebuilding dolu.dev on AdonisJS',
    description:
      'Why I moved my personal site from Next.js to AdonisJS 7 with Inertia and React — and stripped everything I did not need.',
    date: '2026-06-02',
    readingTime: '4 min',
    tags: ['AdonisJS', 'Inertia', 'Meta'],
    html: `
      <p>My old homepage was a tiny Next.js project. It did two things: show a short
      bio and serve a <code>/.well-known/nostr.json</code> file for NIP-05. That is
      genuinely all it needed to do, so the framework barely mattered — until I
      wanted a proper blog and a backend I actually enjoy maintaining.</p>

      <h2>Less framework, more site</h2>
      <p>The new version runs on AdonisJS 7 with Inertia and React. I started from the
      full auth starter kit and then deleted most of it: no database, no sessions, no
      login. A personal site does not need any of that.</p>
      <ul>
        <li>One route renders the home page.</li>
        <li>One controller answers the Nostr NIP-05 lookup.</li>
        <li>And now, a small read-only blog.</li>
      </ul>

      <h2>The NIP-05 endpoint</h2>
      <p>It is just a controller returning static JSON with a permissive CORS header:</p>
      <pre><code>async nostr({ response }: HttpContext) {
  response.header('Access-Control-Allow-Origin', '*')
  return response.json(NOSTR_JSON)
}</code></pre>

      <blockquote>Boring on purpose. The fun part is everything I got to remove.</blockquote>

      <p>Next up: wiring this blog to a real authoring source so I stop hardcoding posts
      in a TypeScript file.</p>
    `,
  },
  {
    slug: 'passwordless-auth-with-lnurl-auth',
    title: 'Passwordless auth with LNURL-auth',
    description:
      'How LNURL-auth lets a Lightning wallet prove who you are without an email, a password, or a database of secrets.',
    date: '2026-05-18',
    readingTime: '6 min',
    tags: ['Lightning', 'LNURL-auth', 'Auth'],
    html: `
      <p>Passwords are a liability. You have to store them, hash them, reset them, and
      hope nobody leaks them. <strong>LNURL-auth</strong> sidesteps the whole problem:
      the user's wallet holds a key, and they sign a challenge to log in.</p>

      <h2>The flow in one breath</h2>
      <ol>
        <li>The server shows a QR code containing a challenge.</li>
        <li>The wallet derives a key for your domain and signs the challenge.</li>
        <li>The server verifies the signature against the public key.</li>
      </ol>
      <p>No shared secret ever leaves the wallet. There is nothing on the server worth
      stealing.</p>

      <h2>Why I like it</h2>
      <p>It is the same mental model as SSH keys, but with a phone and a scan. I built
      <a href="https://zerologin.co" target="_blank" rel="noreferrer">Zerologin</a> to make
      dropping this into an existing app a few lines of work.</p>

      <blockquote>The best credential database is the one you never have.</blockquote>
    `,
  },
  {
    slug: 'nip05-a-json-file-for-nostr-identities',
    title: 'NIP-05: a JSON file for Nostr identities',
    description:
      'A human-readable identifier for Nostr is nothing more than a static JSON file served from your domain. Here is how it works.',
    date: '2026-04-29',
    readingTime: '3 min',
    tags: ['Nostr', 'NIP-05'],
    html: `
      <p>On Nostr, your identity is a long hex public key. NIP-05 maps a friendly name
      like <code>dolu@dolu.dev</code> to that key using a file anyone can host.</p>

      <h2>The file</h2>
      <p>Clients fetch <code>/.well-known/nostr.json?name=dolu</code> and expect:</p>
      <pre><code>{
  "names": { "dolu": "59b9…bd59" },
  "relays": { "59b9…bd59": ["wss://nos.lol"] }
}</code></pre>

      <h2>The one gotcha</h2>
      <p>The response <em>must</em> be served with <code>Access-Control-Allow-Origin: *</code>,
      otherwise browser-based clients cannot read it. That single header is the most
      common reason a verification badge fails to show up.</p>

      <p>That is the whole spec. No accounts, no servers to trust — just a file on a
      domain you control.</p>
    `,
  },
]

function compareByDateDesc(a: BlogPostMeta, b: BlogPostMeta): number {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
}

export const BlogService = {
  /**
   * Returns post metadata (without the body) sorted newest first.
   */
  list(): BlogPostMeta[] {
    return POSTS.map(({ html, ...meta }) => meta).sort(compareByDateDesc)
  },

  /**
   * Returns a single post (with its body) or undefined when not found.
   */
  find(slug: string): BlogPost | undefined {
    return POSTS.find((post) => post.slug === slug)
  },
}
