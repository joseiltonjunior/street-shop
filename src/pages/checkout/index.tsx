import { Breadcrumb } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

import { useToast } from '@/hooks/useToast'

import { Container } from '@/styles/pages/checkout'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

import { yupResolver } from '@hookform/resolvers/yup'
import { registerValidatorSchema } from './formValidator'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { useSelector } from 'react-redux'

// import { useRouter } from 'next/router'

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

  card: string
  validate: string
  cvc: string
}

export default function Checkout() {
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
  const [totalValueCart, setTotalValueCart] = useState(0)
  // const dispatch = useDispatch()
  // const router = useRouter()
  const { showToast } = useToast()
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const handleValueCart = useCallback(() => {
    const filterPrice = cart.map((product) => {
      const value = product.price.replace('R$', '').replace(',', '.')

      return Number(value) * product.quantity
    })

    const total = filterPrice.reduce((total, numero) => {
      return total + numero
    })

    setTotalValueCart(Math.trunc(total * 100))
  }, [cart])

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
        setValue('country', 'BR')

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

  async function createSale(form: customerProps) {
    setIsLoading(true)

    const dateFormat = form.validate.split('/')

    const data = {
      address: {
        city: form.city,
        country: form.country,
        line1: form.line1,
        line2: form.line2,
        postal_code: form.zipCode.replace('-', ''),
        state: form.state,
      },
      card: {
        number: form.card,
        exp_month: dateFormat[0],
        exp_year: dateFormat[1],
        cvc: form.cvc,
      },
      amount: totalValueCart,
      name: form.name,
      email: form.email,
      phone: form.phone
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('-', ''),
    }

    await axios
      .post('/api/checkout', { ...data })
      .then((result) => {
        // pegar id da venda e redirecionar para tela de sucesso
        // const successUrl = `/success?session_id=${result.data.confirmPayment.id}`
        // router.push(successUrl)
        console.log(result)
      })
      .catch((e) => {
        showToast('Falha ao salvar dados', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    handleValueCart()
  }, [handleValueCart])

  return (
    <>
      <Head>
        <title>{`Checkout | D'Coffee Shop`}</title>
      </Head>
      <Header />
      <Breadcrumb actualPage="Checkout" />

      <Container>
        <form onSubmit={handleSubmit(createSale)}>
          <strong>Dados do cliente</strong>
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
              mask="(99) 99999-9999"
            />
            <Input
              label="E-mail"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>

          <strong>Dados da entrega</strong>

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
              error={errors.line2}
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

          <strong>Dados do pagamento</strong>

          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'auto 200px 100px',
            }}
          >
            <Input
              label="Número do cartão"
              name="card"
              register={register}
              error={errors.card}
              mask="9999 9999 9999 9999"
            />
            <Input
              label="MM/AAAA"
              name="validate"
              register={register}
              error={errors.validate}
              mask="99/9999"
            />
            <Input
              label="CVC"
              name="cvc"
              register={register}
              error={errors.cvc}
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Finalizar compra
          </Button>
        </form>
      </Container>
    </>
  )
}
