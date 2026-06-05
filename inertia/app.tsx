import './css/app.css'
import { type ReactElement } from 'react'
import { client } from './client'
import Layout from '~/layouts/default'
import { type Data } from '@generated/data'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

// Falls back to 'Dolu' so the document title is always correct, even when the
// production build runs without VITE_APP_NAME (the .env file is gitignored).
const appName = import.meta.env.VITE_APP_NAME || 'Dolu'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => <Layout children={page} />
    )
  },
  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <TuyauProvider client={client}>
        <App {...props} />
      </TuyauProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})
