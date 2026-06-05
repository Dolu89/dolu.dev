import { Head, Link } from '@inertiajs/react'
import { type BlogPostMeta, formatDate } from '~/types/blog'

export default function BlogIndex({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <>
      <Head title="Blog" />

      <section className="block">
        <div className="section-head reveal">
          <span className="idx">~/</span>
          <h2>Blog</h2>
        </div>
        <p className="lede small reveal">Notes on Bitcoin, the Lightning Network, and Nostr.</p>

        <div className="posts">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="post-row reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="post-date">{formatDate(post.date)}</span>
              <span className="post-body">
                <span className="post-row-title">
                  {post.title}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </span>
                <span className="post-desc">{post.description}</span>
                <span className="tags">
                  {post.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                  <span className="post-reading">· {post.readingTime}</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
