import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import logoImg from '@/assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header>
        <img src={logoImg.src} alt="logo" />
      </header>
      <Component {...pageProps} />
    </div>
  )
}
