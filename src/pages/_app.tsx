import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import logoImg from '@/assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Head from 'next/head'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
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
      <Header>
        <Image src={logoImg} alt="logo" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
