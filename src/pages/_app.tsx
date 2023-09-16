import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../storage'

import { Provider } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'

import { Container } from '@/styles/pages/app'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import 'react-loading-skeleton/dist/skeleton.css'

import Head from 'next/head'
import { SideMenu } from '@/components/layout/SideMenu'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your store for outfit street" />
        <meta name="image" content="https://i.ibb.co/hcnTN8P/street-shop.png" />
        <meta name="author" content="@dvlp.jr" />
        <title>Street Shop</title>
      </Head>
      <Container>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SkeletonTheme baseColor={'#202024'} highlightColor={'#121214'}>
              <Component {...pageProps} />

              <SideMenu />

              <ToastContainer />
            </SkeletonTheme>
          </PersistGate>
        </Provider>
      </Container>
    </>
  )
}
