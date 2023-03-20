import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../storage'

import { Provider } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'

import { Container } from '@/styles/pages/app'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import 'react-loading-skeleton/dist/skeleton.css'

import Head from 'next/head'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Projeto Ignite Shop | Conteúdo do Modulo 04 | Rocketseat"
        />
        <meta
          name="image"
          content="https://avatars.githubusercontent.com/u/47725788?v=4z"
        />
        <meta name="author" content="@dvlp.jr" />
        <title>Ignite Shop</title>
      </Head>
      <Container>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SkeletonTheme baseColor={'#202024'} highlightColor={'#121214'}>
              <Component {...pageProps} />
              <ToastContainer />
            </SkeletonTheme>
          </PersistGate>
        </Provider>
      </Container>
    </>
  )
}
