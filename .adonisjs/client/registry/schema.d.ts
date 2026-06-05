/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tips.invoice': {
    methods: ["GET","HEAD"]
    pattern: '/tips/invoice'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tips_controller').default['invoice']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tips_controller').default['invoice']>>>
    }
  }
  'nostr': {
    methods: ["GET","HEAD"]
    pattern: '/.well-known/nostr.json'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/well_known_controller').default['nostr']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/well_known_controller').default['nostr']>>>
    }
  }
}
