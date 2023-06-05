import { Header } from '@/components/Header'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { ResponseUserProps } from '@/types/user'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'

import { useRouter } from 'next/router'
import { setSignOut } from '@/storage/modules/user/action'

import { Container, Content, Main } from '@/styles/pages/profile'
import { EditUser } from '@/components/EditUser'

export default function Profile() {
  const [contentIsVisible, setContentIsVisible] = useState(1)

  const router = useRouter()
  const dispatch = useDispatch()

  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )
  const user = useSelector<reduxProps, ResponseUserProps>((state) => state.user)

  return (
    <>
      <Head>
        <title>{`Minha conta | D'Coffee Shop`}</title>
      </Head>
      <Header buttonCart lengthCart={cart.length} inputSearch isLink isUser />
      <Container>
        <header>
          <h2>Minha conta</h2>
        </header>

        <Content>
          <aside>
            <article>
              <figure>
                <FaUserCircle size={80} />
              </figure>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </article>

            <nav>
              <button onClick={() => setContentIsVisible(3)}>Endereço</button>
              <button onClick={() => setContentIsVisible(2)}>
                Meus pedidos
              </button>
              <button onClick={() => setContentIsVisible(1)}>Meus dados</button>
              <button
                onClick={() => {
                  dispatch(setSignOut())
                  router.push('/')
                }}
              >
                Sair
              </button>
            </nav>
          </aside>

          <Main>
            {contentIsVisible === 1 && <EditUser />}
            {contentIsVisible === 2 && <div>Meus pedidos</div>}
            {contentIsVisible === 3 && <div>Endereço</div>}
          </Main>
        </Content>
      </Container>
    </>
  )
}
