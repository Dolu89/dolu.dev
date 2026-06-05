import type { HttpContext } from '@adonisjs/core/http'

/**
 * Dolu's NIP-05 identifier mapping (hex public key) and the relays where the
 * key publishes. Served at `/.well-known/nostr.json` so Nostr clients can
 * verify the `dolu@dolu.dev` identifier.
 *
 * @see https://github.com/nostr-protocol/nips/blob/master/05.md
 */
const PUBKEY = '59b96df8d8b5e66b3b95a3e1ba159750a6edd69bcbba1857aeb652a5b208bd59'

const NOSTR_JSON = {
  names: {
    dolu: PUBKEY,
  },
  relays: {
    [PUBKEY]: ['wss://nos.lol', 'wss://relay.dolu.dev'],
  },
} as const

export default class WellKnownController {
  /**
   * GET /.well-known/nostr.json
   *
   * NIP-05 requires the response to be reachable cross-origin, hence the
   * wildcard CORS header. The full mapping is returned regardless of the
   * optional `?name=` query parameter, matching the previous implementation.
   */
  async nostr({ response }: HttpContext) {
    response.header('Access-Control-Allow-Origin', '*')
    return response.json(NOSTR_JSON)
  }
}
