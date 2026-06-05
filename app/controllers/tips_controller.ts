import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

/**
 * Lightning address tips flow are resolved server-side so the browser never
 * has to deal with cross-origin LNURL requests, and the address stays in one
 * place. See LUD-16 (Lightning Address) and LUD-06 (LNURL-pay).
 */
const LIGHTNING_ADDRESS = 'dolu@npub.cash'

type LnurlPayParams = {
  callback: string
  minSendable: number
  maxSendable: number
}

async function resolveLnurlPay(address: string): Promise<LnurlPayParams> {
  const [name, domain] = address.split('@')
  if (!name || !domain) throw new Error('Invalid lightning address')

  const res = await fetch(`https://${domain}/.well-known/lnurlp/${name}`)
  if (!res.ok) throw new Error('Failed to resolve lightning address')

  const data = (await res.json()) as Record<string, unknown>
  if (data.tag !== 'payRequest') throw new Error('Not a payRequest endpoint')

  return {
    callback: String(data.callback),
    minSendable: Number(data.minSendable),
    maxSendable: Number(data.maxSendable),
  }
}

export default class TipsController {
  /**
   * GET /tips/invoice?amount=<sats>
   *
   * Resolves the lightning address, requests a BOLT11 invoice for the given
   * amount and returns it alongside a monochrome SVG QR code ready to display.
   */
  async invoice({ request, response }: HttpContext) {
    const sats = Number(request.input('amount'))

    if (!Number.isInteger(sats) || sats <= 0) {
      return response.badRequest({ error: 'Enter a valid amount in sats.' })
    }

    const msats = sats * 1000

    try {
      const params = await resolveLnurlPay(LIGHTNING_ADDRESS)

      if (msats < params.minSendable || msats > params.maxSendable) {
        const min = Math.ceil(params.minSendable / 1000)
        const max = Math.floor(params.maxSendable / 1000)
        return response.badRequest({
          error: `Amount must be between ${min} and ${max} sats.`,
        })
      }

      const callbackUrl = new URL(params.callback)
      callbackUrl.searchParams.set('amount', String(msats))

      const cbRes = await fetch(callbackUrl.toString())
      if (!cbRes.ok) throw new Error('Invoice request failed')

      const cb = (await cbRes.json()) as Record<string, unknown>
      const pr = typeof cb.pr === 'string' ? cb.pr : ''
      if (!pr) throw new Error('No invoice returned')

      // Uppercase keeps the QR in the more compact alphanumeric mode; wallets
      // read bech11 invoices case-insensitively.
      const qr = await QRCode.toString(pr.toUpperCase(), {
        type: 'svg',
        margin: 0,
        errorCorrectionLevel: 'M',
        color: { dark: '#0b0907', light: '#0000' },
      })

      return response.json({ amount: sats, address: LIGHTNING_ADDRESS, pr, qr })
    } catch {
      return response.status(502).json({
        error: 'Could not create a Lightning invoice. Please try again.',
      })
    }
  }
}
