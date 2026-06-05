import { useState, type FormEvent } from 'react'

const PRESETS = [1000, 10000, 100000]
const LIGHTNING_ADDRESS = 'dolu@npub.cash'

type InvoiceData = {
  amount: number
  address: string
  pr: string
  qr: string
}

function formatSats(n: number): string {
  return n.toLocaleString('en-US').replace(/,/g, ' ')
}

export default function Tips() {
  const [loading, setLoading] = useState(false)
  const [invoice, setInvoice] = useState<InvoiceData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [custom, setCustom] = useState('')
  const [copied, setCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)

  async function requestInvoice(sats: number) {
    setLoading(true)
    setError(null)
    setInvoice(null)
    setCopied(false)
    try {
      const res = await fetch(`/tips/invoice?amount=${sats}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong.')
      setInvoice(json as InvoiceData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create an invoice.')
    } finally {
      setLoading(false)
    }
  }

  function submitCustom(e: FormEvent) {
    e.preventDefault()
    const sats = Number(custom)
    if (Number.isInteger(sats) && sats > 0) requestInvoice(sats)
  }

  function reset() {
    setInvoice(null)
    setError(null)
    setCopied(false)
    setCustom('')
  }

  async function copyInvoice() {
    if (!invoice) return
    try {
      await navigator.clipboard.writeText(invoice.pr)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(LIGHTNING_ADDRESS)
      setAddressCopied(true)
      window.setTimeout(() => setAddressCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  if (invoice) {
    return (
      <div className="tips-card">
        <div className="tips-invoice-view">
          <div className="tips-qr" dangerouslySetInnerHTML={{ __html: invoice.qr }} />
          <div className="tips-invoice-meta">
            <span className="tips-amount-label">{formatSats(invoice.amount)} sats</span>
            <code className="tips-pr">{invoice.pr}</code>
            <div className="tips-actions">
              <a className="tips-btn tips-btn-primary" href={`lightning:${invoice.pr}`}>
                Open in wallet
              </a>
              <button className="tips-btn" type="button" onClick={copyInvoice}>
                {copied ? 'Copied ✓' : 'Copy invoice'}
              </button>
            </div>
            <button className="tips-reset" type="button" onClick={reset}>
              ← Choose another amount
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tips-card">
      <div className="tips-amounts">
        {PRESETS.map((p) => (
          <button
            key={p}
            className="tips-amount"
            type="button"
            disabled={loading}
            onClick={() => requestInvoice(p)}
          >
            {formatSats(p)}
            <span className="tips-amount-unit">sats</span>
          </button>
        ))}
      </div>

      <form className="tips-custom" onSubmit={submitCustom}>
        <input
          className="tips-input"
          type="number"
          min="1"
          inputMode="numeric"
          placeholder="Custom amount"
          value={custom}
          disabled={loading}
          onChange={(e) => setCustom(e.target.value)}
        />
        <button className="tips-btn tips-btn-primary" type="submit" disabled={loading || !custom}>
          {loading ? 'Generating…' : 'Get invoice ⚡'}
        </button>
      </form>

      <div className="tips-or">
        <span>or</span>
      </div>

      <button
        type="button"
        className="tips-address"
        onClick={copyAddress}
        title="Copy lightning address"
      >
        <span className="tips-address-value">{LIGHTNING_ADDRESS}</span>
        <span className="tips-address-copy">{addressCopied ? 'Copied ✓' : 'Copy'}</span>
      </button>

      {error && <p className="tips-error">{error}</p>}
    </div>
  )
}
