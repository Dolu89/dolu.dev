import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'tips.invoice': { paramsTuple?: []; params?: {} }
    'nostr': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'tips.invoice': { paramsTuple?: []; params?: {} }
    'nostr': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'tips.invoice': { paramsTuple?: []; params?: {} }
    'nostr': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}