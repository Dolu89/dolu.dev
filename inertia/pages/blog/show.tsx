import { Head, Link } from '@inertiajs/react'
import { type BlogPost, formatDate } from '~/types/blog'

export default function BlogShow({ post }: { post: BlogPost }) {
  return (
    <>
      <Head title={post.title} />

      <article className="article">
        <Link href="/blog" className="link back reveal">
          <span className="arrow-back" aria-hidden="true">
            ←
          </span>
          All posts
        </Link>

        <header className="article-head reveal" style={{ animationDelay: '60ms' }}>
          <div className="article-meta">
            <span>{formatDate(post.date)}</span>
            <span className="dim">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose reveal"
          style={{ animationDelay: '120ms' }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </>
  )
}
