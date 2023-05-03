import { Breadcrumb } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

import { useToast } from '@/hooks/useToast'

import { Container } from '@/styles/pages/register'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

import { yupResolver } from '@hookform/resolvers/yup'
import { registerValidatorSchema } from './formValidator'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDataUser } from '@/storage/modules/user/action'
import { useRouter } from 'next/router'

interface customerProps {
  name: string
  email: string
  phone: string

  city: string
  country: string
  state: string
  zipCode: string
  line1: string
  line2: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,

    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<customerProps>({
    resolver: yupResolver(registerValidatorSchema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { showToast } = useToast()

  async function handleAddressWithZipCode(zipCode: string) {
    if (zipCode.length < 9) {
      setValue('city', '')
      setValue('line1', '')
      setValue('state', '')
      setValue('country', '')
      clearErrors('zipCode')

      return
    }

    await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
      .then(async (data) => {
        const result = await data.json()

        if (result.erro) {
          setError('zipCode', { message: '' })
          return
        }

        setValue('city', result.localidade)
        setValue('line1', result.logradouro)
        setValue('state', result.uf)
        setValue('country', 'Brasil')

        clearErrors('city')
        clearErrors('line1')
        clearErrors('state')
        clearErrors('country')
        clearErrors('zipCode')
      })
      .catch(() => {
        showToast('Falha ao buscar endereço', {
          type: 'error',
          theme: 'colored',
        })
      })
  }

  async function createCustomer(form: customerProps) {
    setIsLoading(true)

    const newCustomer = {
      address: {
        city: form.city,
        country: form.country,
        line1: form.line1,
        line2: form.line2,
        postal_code: form.zipCode.replace('-', ''),
        state: form.state,
      },
      name: form.name,
      email: form.email,
      phone: form.phone
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('-', ''),
    }

    await axios
      .post('/api/customer', { ...newCustomer })
      .then((result) => {
        const user = {
          id: result.data.customer.id,
          address: result.data.customer.address,
          name: result.data.customer.name,
          email: result.data.customer.email,
          phone: result.data.customer.phone,
        }
        dispatch(setDataUser(user))
        router.push('/cart')
      })
      .catch((e) => {
        showToast('Falha ao salvar dados', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Head>
        <title>{`Registrar | D'Coffee Shop`}</title>
      </Head>
      <Header />
      <Breadcrumb actualPage="Cadastrar cliente" />

      <Container>
        <form onSubmit={handleSubmit(createCustomer)}>
          <strong>Cadastrar cliente</strong>
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
              gridTemplateColumns: '200px auto',
            }}
          >
            <Input
              label="Telefone"
              name="phone"
              register={register}
              error={errors.phone}
              mask="(99) 9999-9999"
            />
            <Input
              label="E-mail"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: '200px auto 100px',
            }}
          >
            <Input
              label="CEP"
              name="zipCode"
              mask="99999-999"
              register={register}
              error={errors.zipCode}
              onChange={(e) => {
                setValue('zipCode', e.currentTarget.value)
                handleAddressWithZipCode(e.currentTarget.value)
              }}
            />
            <Input
              label="Logradouro"
              name="line1"
              register={register}
              error={errors.line1}
            />
            <Input
              label="Número"
              name="line2"
              register={register}
              error={errors.line1}
              maxLength={6}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Input
              label="Cidade"
              name="city"
              register={register}
              error={errors.city}
              disabled
            />

            <Input
              label="Estado"
              name="state"
              register={register}
              error={errors.state}
              disabled
            />
            <Input
              label="País"
              name="country"
              register={register}
              error={errors.country}
              disabled
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Cadastrar
          </Button>
        </form>
      </Container>
    </>
  )
}
