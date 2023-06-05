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
import { stripe } from '@/lib/stripe'
import { useToast } from '@/hooks/useToast'
import { useDispatch } from 'react-redux'
import { setSaveUser } from '@/storage/modules/user/action'
import { useRouter } from 'next/router'

const required = 'Este campo é obrigatório'

const schema = yup.object().shape({
  name: yup.string().required(required),
  email: yup.string().email('E-mail inválido').required(required),
  phone: yup.string().min(14, required),
  password: yup.string().min(6, required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'As senhas devem coincidir')
    .min(6, required),
})

export default function Register() {
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

  async function handleRegisterUser(data: RegisterUserProps) {
    setIsLoading(true)

    const customer = await stripe.customers.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
    })

    const newUser = {
      email: data.email,
      customerId: customer.id,
      name: data.name,
      phone: data.phone.replaceAll(' ', '').replace('-', ''),
      password: data.password,
    }

    await clientAPI
      .post('/users', newUser)
      .then((result) => {
        dispatch(setSaveUser(result.data))
        router.push('/profile')
      })
      .catch(() => {
        showToast(
          'Opss. Não foi possível concluir o seu cadastro. Por favor, verifique os dados fornecidos e tente novamente.',
          {
            type: 'error',
            theme: 'colored',
          },
        )
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Head>
        <title>{`Cadastrar | D'Coffee Shop`}</title>
      </Head>
      <Header />
      <Container>
        <form
          onSubmit={handleSubmit(handleRegisterUser)}
          style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}
        >
          <h2>Criar conta</h2>
          <Input
            label="Nome"
            name="name"
            register={register}
            error={errors.name}
          />

          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'auto 1fr',
            }}
          >
            <Input
              mask="99 9 9999-9999"
              label="Telefone"
              name="phone"
              register={register}
              error={errors.phone}
            />
            <Input
              label="E-mail"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Input
              label="Senha"
              name="password"
              register={register}
              error={errors.phone}
              isPassword
            />
            <Input
              label="Confirme a senha"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              isPassword
            />
          </div>

          <Button variant="primary" type="submit" isLoading={isLoading}>
            Cadastrar
          </Button>
        </form>

        <UserAlreadyExists href={'/sign-in'}>
          Já possui conta?
        </UserAlreadyExists>
      </Container>
    </>
  )
}
