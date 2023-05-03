import { Breadcrumb } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'
import { FieldValues, useForm } from 'react-hook-form'
import Head from 'next/head'
// import { useState } from 'react'
import { BiUser } from 'react-icons/bi'
// import axios from 'axios'
// import { useToast } from '@/hooks/useToast'
// import { useEffect } from 'react'
import { Container } from '@/styles/pages/register'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

import { yupResolver } from '@hookform/resolvers/yup'
import { registerValidatorSchema } from './formValidator'
import { useEffect } from 'react'

// import iconUser from '@/assets/user.svg'

interface customerProps {
  name: string
  email: string
  phone: string
  address: {
    city: string
    country: string
    state: string
    zipCode: string
    line1: string
  }
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<customerProps>({
    resolver: yupResolver(registerValidatorSchema),
  })
  //   const { showToast } = useToast()

  //   async function handleAddressWithZipCode() {
  //     await fetch('/viacep.com.br/ws/01001000/json/')
  //       .then((result) => {
  //         console.log(result)
  //       })
  //       .catch(() => {
  //         showToast('Falha ao buscar endereço', {
  //           type: 'error',
  //           theme: 'colored',
  //         })
  //       })
  //   }

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

  //   useEffect(() => {
  //     handleAddressWithZipCode()
  //   }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <>
      <Head>
        <title>{`Registrar | D'Coffee Shop`}</title>
      </Head>
      <Header />
      <Breadcrumb actualPage="Registrar usuário" />

      <Container>
        <strong>Cadastrar dados</strong>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: 400,
          }}
          onSubmit={handleSubmit(createCustomer)}
        >
          <Input
            label="Nome"
            icon={BiUser}
            name="name"
            register={register}
            error={errors.name}
          />
          <Input
            label="E-mail"
            icon={BiUser}
            name="email"
            register={register}
          />
          <Input
            label="CEP"
            icon={BiUser}
            name="address.zipCode"
            register={register}
          />

          <Input
            label="Cidade"
            icon={BiUser}
            name="address.city"
            register={register}
          />
          <Input
            label="País"
            icon={BiUser}
            name="address.country"
            register={register}
          />
          <Input
            label="Estado"
            icon={BiUser}
            name="address.state"
            register={register}
          />
          <Input
            label="Logradouro"
            icon={BiUser}
            name="address.line1"
            register={register}
          />

          <Input
            label="Telefone"
            icon={BiUser}
            name="phone"
            register={register}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Container>
    </>
  )
}

// city: 'Recife',
//   country: 'Brasil',
//   line1: 'Rua Iolanda Rodrigues Sobral',
//   postal_code: '50690220',
//   state: 'PE',
