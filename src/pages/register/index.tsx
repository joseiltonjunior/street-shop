import { Breadcrumb } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'
import { FieldValues, useForm } from 'react-hook-form'
import Head from 'next/head'

import { useToast } from '@/hooks/useToast'
// import { useEffect } from 'react'
import { Container } from '@/styles/pages/register'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

import { yupResolver } from '@hookform/resolvers/yup'
import { registerValidatorSchema } from './formValidator'
// import { useState } from 'react'

interface customerProps {
  name: string
  email: string
  phone: string

  city: string
  country: string
  state: string
  zipCode: string
  line1: string
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

  const { showToast } = useToast()

  async function handleAddressWithZipCode(zipCode: string) {
    if (zipCode.length < 8) {
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

  async function createCustomer(newCustomer: FieldValues) {
    return console.log(newCustomer)

    // await axios
    //   .post('/api/customer', { newCustomer })
    //   .then((result) => {
    //     console.log(result.data)
    //   })
    //   .catch((e) => {
    //     showToast('Falha ao salvar dados', {
    //       type: 'error',
    //       theme: 'colored',
    //     })
    //   })
  }

  return (
    <>
      <Head>
        <title>{`Registrar | D'Coffee Shop`}</title>
      </Head>
      <Header />
      <Breadcrumb actualPage="Registrar usuário" />

      <Container>
        <form onSubmit={handleSubmit(createCustomer)}>
          <strong>Cadastrar dados</strong>
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
              maxLength={11}
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
              gridTemplateColumns: '200px auto',
            }}
          >
            <Input
              label="CEP"
              name="zipCode"
              register={register}
              error={errors.zipCode}
              maxLength={9}
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

          <Button type="submit">Salvar</Button>
        </form>
      </Container>
    </>
  )
}
