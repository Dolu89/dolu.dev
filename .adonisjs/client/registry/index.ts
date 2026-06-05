/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'tips.invoice': {
    methods: ["GET","HEAD"],
    pattern: '/tips/invoice',
    tokens: [{"old":"/tips/invoice","type":0,"val":"tips","end":""},{"old":"/tips/invoice","type":0,"val":"invoice","end":""}],
    types: placeholder as Registry['tips.invoice']['types'],
  },
  'nostr': {
    methods: ["GET","HEAD"],
    pattern: '/.well-known/nostr.json',
    tokens: [{"old":"/.well-known/nostr.json","type":0,"val":".well-known","end":""},{"old":"/.well-known/nostr.json","type":0,"val":"nostr.json","end":""}],
    types: placeholder as Registry['nostr']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
