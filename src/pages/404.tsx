import { useRouter } from 'next/router'
import { Container } from '@/styles/pages/404'

import notFound from '@/assets/no-results.png'
import Image from 'next/image'

export default function Custom404() {
  const router = useRouter()

  return (
    <Container>
      <div>
        <Image src={notFound} width={250} height={250} alt="" />
        <p>Ooops... Essa página não existe</p>
        <button onClick={() => router.replace('/')}>Retornar a home</button>
      </div>
    </Container>
  )
}
