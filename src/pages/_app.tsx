import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { SkeletonTheme } from 'react-loading-skeleton'
import logoImg from '@/assets/logo.svg'
import iconReturn from '@/assets/arrow-u-up-left.svg'
import { Container, Header } from '@/styles/pages/app'

import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'

import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link'
import Head from 'next/head'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

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
        <Header>
          <Image src={logoImg} alt="logo" />

          {asPath.includes('/product') && (
            <Link href={'/'}>
              <Image src={iconReturn} alt="return home" />
            </Link>
          )}
        </Header>
        <SkeletonTheme baseColor={'#202024'} highlightColor={'#121214'}>
          <Component {...pageProps} />
          <ToastContainer />
        </SkeletonTheme>
      </Container>
    </>
  )
}
