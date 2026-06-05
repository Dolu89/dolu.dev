/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  tips: {
    invoice: typeof routes['tips.invoice']
  }
  nostr: typeof routes['nostr']
}
