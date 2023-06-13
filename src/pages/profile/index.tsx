import { Header } from '@/components/layout/Header'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'

import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from 'react-icons/fa'
import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { setSignOut } from '@/storage/modules/user/action'
import { Container, Content, Main, Nav, Button } from '@/styles/pages/profile'
import { EditUser } from '@/components/EditUser'
import { EditAddress } from '@/components/EditAddress'
import clientAPI from '@/services/client-api'
import { useToast } from '@/hooks/useToast'
import Skeleton from 'react-loading-skeleton'
import { ResponseUserProps } from '@/types/user'

import axios from 'axios'
import { removeToken, setToken } from '@/storage/modules/user-token/action'
import { handleTokenRemainingTime } from '@/utils/tokenRemainingTime'
import { ResponseAddressProps } from '@/types/address'

export default function Profile() {
  const [contentIsVisible, setContentIsVisible] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState<ResponseAddressProps>()

  const [user, setUser] = useState<ResponseUserProps>()

  const token = useSelector<reduxProps, string>((state) => state.token)

  const router = useRouter()
  const dispatch = useDispatch()

  const { showToast } = useToast()

  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  async function handleFetchUser() {
    setIsLoading(true)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await clientAPI
      .get('/me', config)
      .then((result) => {
        setUser(result.data)
      })
      .catch(() => {
        showToast('Opss. Ocorreu um erro ao buscar os dados do usuário.', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  async function handleFetchAddress() {
    setIsLoading(true)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await clientAPI
      .get('/addresses', config)
      .then((result) => {
        setAddress(result.data)
      })
      .catch((err) => {
        const { message } = err.response.data
        if (message.includes('esource not found.')) return

        showToast('Opss. Ocorreu um erro ao buscar o endereço do usuário.', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  const handleRefreshToken = useCallback(async () => {
    const remainingTime = handleTokenRemainingTime(token)

    if (remainingTime <= 60) {
      await axios
        .post('/api/refreshToken')
        .then((result) => {
          dispatch(setToken(result.data.token))
        })
        .catch(() => {
          showToast('Opss. Ocorreu um error ao atualizar token do usuário.', {
            type: 'error',
            theme: 'colored',
          })
        })
    }
  }, [dispatch, showToast, token])

  useEffect(() => {
    if (token.length > 0) {
      handleRefreshToken()
    }
  }, [handleRefreshToken, token.length])

  useEffect(() => {
    handleFetchAddress()
    handleFetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              {isLoading ? (
                <>
                  <Skeleton
                    height={14}
                    width={100}
                    style={{ marginTop: '1rem' }}
                  />
                  <Skeleton height={14} width={180} />
                </>
              ) : (
                <>
                  <strong>{user?.name}</strong>
                  <span>{user?.email}</span>
                </>
              )}
            </article>

            <Nav>
              <Button
                onClick={() => setContentIsVisible(3)}
                actived={contentIsVisible === 3}
              >
                Endereço
              </Button>
              <Button
                disabled
                onClick={() => setContentIsVisible(2)}
                actived={contentIsVisible === 2}
              >
                Meus pedidos
              </Button>
              <Button
                onClick={() => setContentIsVisible(1)}
                actived={contentIsVisible === 1}
              >
                Meus dados
              </Button>
              <Button
                onClick={() => {
                  router.push('/')
                  dispatch(removeToken())
                  dispatch(setSignOut())
                }}
              >
                Sair
              </Button>
            </Nav>
          </aside>

          <Main>
            {isLoading ? (
              <>
                <Skeleton width={'100%'} height={20} />
                <Skeleton
                  width={'100%'}
                  height={200}
                  style={{ marginTop: '1rem' }}
                />
              </>
            ) : (
              <>
                {contentIsVisible === 1 && <EditUser user={user} />}
                {contentIsVisible === 2 && <div>Meus pedidos</div>}
                {contentIsVisible === 3 && (
                  <EditAddress
                    address={address}
                    refresh={() => handleFetchAddress()}
                  />
                )}
              </>
            )}
          </Main>
        </Content>
      </Container>
    </>
  )
}
