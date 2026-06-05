import type { HttpContext } from '@adonisjs/core/http'
import { BlogService } from '#services/blog_service'

export default class BlogController {
  /**
   * GET /blog — list of published posts (read-only).
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('blog/index', { posts: BlogService.list() })
  }

  /**
   * GET /blog/:slug — a single post. Renders the 404 page when the slug
   * does not match any post.
   */
  async show({ params, inertia, response }: HttpContext) {
    const post = BlogService.find(params.slug)

    if (!post) {
      response.status(404)
      return inertia.render('errors/not_found', {})
    }

    return inertia.render('blog/show', { post })
  }
}
