import { Header } from '@/components/Header'
import { Container, UserAlreadyExists } from '@/styles/pages/register'
import * as yup from 'yup'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterUserProps } from '@/types/user'
import { Input } from '@/components/Input'
import { useState } from 'react'
import { Button } from '@/components/Button'
import clientAPI from '@/services/client-api'

import { useToast } from '@/hooks/useToast'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { setToken } from '@/storage/modules/user-token/action'

const required = 'Este campo é obrigatório'

const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required(required),
  password: yup.string().min(6, required),
})

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserProps>({
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const { showToast } = useToast()
  const dispatch = useDispatch()
  const router = useRouter()

  async function handleAuthenticateUser(data: RegisterUserProps) {
    setIsLoading(true)

    const authUser = {
      email: data.email,
      password: data.password,
    }

    await clientAPI
      .post('/sessions', authUser)
      .then((result) => {
        const { token } = result.data
        dispatch(setToken(token))
        router.push('/profile')
      })
      .catch(() => {
        showToast('Credenciais inválidas', {
          type: 'warning',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Head>
        <title>{`Entrar | D'Coffee Shop`}</title>
      </Head>
      <Header />
      <Container>
        <form
          onSubmit={handleSubmit(handleAuthenticateUser)}
          style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}
        >
          <h2>Entrar na conta</h2>

          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: '1fr 230px',
            }}
          >
            <Input
              label="E-mail"
              name="email"
              register={register}
              error={errors.email}
            />
            <Input
              label="Senha"
              name="password"
              register={register}
              error={errors.password}
              isPassword
            />
          </div>

          <Button variant="primary" type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </form>

        <UserAlreadyExists href={'/register'}>
          Não possui conta?
        </UserAlreadyExists>
      </Container>
    </>
  )
}
