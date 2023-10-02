import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react'
import { Breadcrumb } from '@/components/layout/BreadCrumb'
import { Header } from '@/components/layout/Header'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

import * as yup from 'yup'

import Cards from 'react-credit-cards-2'

import { useToast } from '@/hooks/useToast'

import { Input } from '@/components/form/Input'
import { Button } from '@/components/form/Button'

import { yupResolver } from '@hookform/resolvers/yup'

import axios from 'axios'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { useSelector } from 'react-redux'

import { customerProps } from '@/types/customer'
import {
  ErrorCheckoutTypeEnum,
  ErrorCheckoutMessageEnum,
} from '@/utils/enums/errorCheckout'
import { FocusedType } from '@/types/focusedCard'
import { formatReal } from '@/utils/formatReal'

import {
  Container,
  Title,
  Box,
  ContentCard,
  ContentForm,
} from '@/styles/pages/checkout'
import { useRouter } from 'next/router'
import { formatString } from '@/utils/formatString'

const required = 'Este campo é obrigatório'

const schema = yup.object().shape({
  name: yup.string().required(required),
  email: yup.string().email('E-mail inválido').required(required),
  phone: yup.string().min(14, required),
  zipCode: yup.string().min(9, required),
  city: yup.string().required(required),
  country: yup.string().required(required),
  state: yup.string().required(required),
  line1: yup.string().required(required),
  line2: yup.string().required(required),
  card: yup.string().min(17, required),
  validate: yup
    .string()
    .min(7, required)
    .test('verify-validation', (value) => {
      if (value && value.length === 7) {
        const format = value.split('/')
        const month = Number(format[0])
        const year = Number(format[1])

        const actualYear = new Date().getFullYear()
        const actualMonth = new Date().getMonth() + 1

        const monthCheck = month > 0 && month <= 12
        const yearCheck = year > actualYear && year <= actualYear + 10
        const currentYearCheck = year === actualYear && month >= actualMonth

        if ((monthCheck && yearCheck) || currentYearCheck) {
          return true
        }
      }

      return false
    }),
  cvc: yup.string().min(3, required),
})

export default function Checkout() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<customerProps>({
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [totalValueCart, setTotalValueCart] = useState(0)
  const [isFocus, setIsFocus] = useState<FocusedType>('')
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  })

  const router = useRouter()
  const { showToast } = useToast()
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const handleInputFocus = (evt: BaseSyntheticEvent) => {
    setIsFocus(evt.target.name)
  }

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

    const products = cart.map((item) => {
      return {
        price: item.defaultPrice,
        quantity: item.quantity,
      }
    })

    const data = {
      address: {
        city: form.city,
        country: form.country,
        line1: form.line1,
        line2: form.line2,
        postal_code: formatString(form.zipCode),
        state: form.state,
      },
      card: {
        number: formatString(form.card),
        exp_month: dateFormat[0],
        exp_year: dateFormat[1],
        cvc: form.cvc,
      },
      amount: totalValueCart,
      name: form.name,
      email: form.email,
      phone: formatString(form.phone),
      products,
    }

    await axios
      .post('/api/checkout', { ...data })
      .then((result) => {
        const successUrl = `/success?pi=${result.data.paymentIntent.id}`

        router.push(successUrl)
      })
      .catch((e) => {
        let msg = ''
        const message = String(e.response.data.message)

        switch (message) {
          case ErrorCheckoutTypeEnum.card_error:
            msg = ErrorCheckoutMessageEnum.card_error
            break

          default:
            msg = ErrorCheckoutMessageEnum.generic_error
            break
        }

        showToast(msg, {
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
        <ContentForm>
          <form onSubmit={handleSubmit(createSale)}>
            <Title>Dados do cliente</Title>
            <Input
              label="Nome"
              name="name"
              register={register}
              error={errors.name}
              onFocus={handleInputFocus}
              onChange={(e) => {
                setValue('name', e.currentTarget.value)
                setCard({ ...card, name: e.currentTarget.value })
              }}
            />

            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: '200px auto',
              }}
            >
              <Input
                mask="99 9 9999-9999"
                label="Telefone"
                name="phone"
                register={register}
                error={errors.phone}
                onChange={(e) => setValue('phone', e.currentTarget.value)}
              />
              <Input
                label="E-mail"
                name="email"
                register={register}
                error={errors.email}
              />
            </div>

            <Title isTopMargin>Dados da entrega</Title>

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

            <Title isTopMargin>Dados do pagamento</Title>

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
                onFocus={handleInputFocus}
                onChange={(e) => {
                  setValue('card', e.currentTarget.value)
                  setCard({ ...card, number: e.currentTarget.value })
                }}
              />
              <Input
                label="MM/AAAA"
                name="validate"
                register={register}
                error={errors.validate}
                mask="99/9999"
                onFocus={handleInputFocus}
                onChange={(e) => {
                  setValue('validate', e.currentTarget.value)
                  setCard({ ...card, expiry: e.currentTarget.value })
                }}
              />
              <Input
                label="CVC"
                name="cvc"
                mask="9999"
                register={register}
                error={errors.cvc}
                onFocus={handleInputFocus}
                onChange={(e) => {
                  setValue('cvc', e.currentTarget.value)
                  setCard({ ...card, cvc: e.currentTarget.value })
                }}
              />
            </div>

            <Button type="submit" isLoading={isLoading} variant="primary">
              Finalizar compra
            </Button>
          </form>
        </ContentForm>

        <ContentCard>
          <div>
            <Cards
              number={card.number}
              expiry={card.expiry}
              cvc={card.cvc}
              name={card.name}
              focused={isFocus}
              placeholders={{ name: 'Nome do titular' }}
              locale={{ valid: 'válido até' }}
            />
          </div>

          <Box danger>
            <strong>Atenção</strong>
            <span>
              A compra e os produtos são fictícios e para testar o fluxo de
              pagamento, utilizar o número de cartão 4242 4242 4242 4242 (Cartão
              teste), os outros campos podem ser dados aleartórios válidos.
            </span>
          </Box>

          <Box total>
            <strong>Total</strong>
            <span>{formatReal(totalValueCart)}</span>
          </Box>

          <Button type="submit" isLoading={isLoading} variant="primary">
            Finalizar compra
          </Button>
        </ContentCard>
      </Container>
    </>
  )
}
