/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const WellKnownController = () => import('#controllers/well_known_controller')
const TipsController = () => import('#controllers/tips_controller')

/**
 * Home page rendered through Inertia (see inertia/pages/home.tsx).
 */
router.on('/').renderInertia('home', {}).as('home')

/**
 * Internal blog — TEMPORARILY DISABLED. The link on the home page points to
 * the external blog for now. The implementation is kept on hand (controller
 * `app/controllers/blog_controller.ts`, data `app/services/blog_service.ts`,
 * pages `inertia/pages/blog/*`); these routes are not registered, so /blog
 * returns 404. Re-enable by uncommenting the block below.
 *
 * const BlogController = () => import('#controllers/blog_controller')
 * router.get('/blog', [BlogController, 'index']).as('blog.index')
 * router.get('/blog/:slug', [BlogController, 'show']).as('blog.show')
 */

/**
 * Native Lightning tips — generates a BOLT11 invoice for a given amount.
 */
router.get('/tips/invoice', [TipsController, 'invoice']).as('tips.invoice')

/**
 * NIP-05 identifier endpoint consumed by Nostr clients.
 */
router.get('/.well-known/nostr.json', [WellKnownController, 'nostr']).as('nostr')
