import { Breadcrumb } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

import Cards from 'react-credit-cards-2'

import { useToast } from '@/hooks/useToast'

import { Container } from '@/styles/pages/checkout'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

import { yupResolver } from '@hookform/resolvers/yup'
import { registerValidatorSchema } from './formValidator'
import axios from 'axios'
import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { useSelector } from 'react-redux'

import { customerProps } from '@/types/customer'
import { ErrorCheckoutEnum } from '@/utils/enums/errorCheckout'
import { FocusedType } from '@/types/focusedCard'

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
  const [isFocus, setIsFocus] = useState<FocusedType>('')
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  })
  // const dispatch = useDispatch()
  // const router = useRouter()
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
        let msg = ''
        const type = String(e.response.data.type)

        switch (type) {
          case ErrorCheckoutEnum.card_error:
            msg = ErrorCheckoutEnum.card_error
            break

          default:
            msg = ErrorCheckoutEnum.generic_error
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
  }, [handleValueCart, errors])

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
              mask="(99) 99999-9999"
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

          <strong style={{ marginTop: '2rem' }}>Dados da entrega</strong>

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

          <strong style={{ marginTop: '2rem' }}>Dados do pagamento</strong>

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

          <Button
            type="submit"
            isLoading={isLoading}
            style={{ marginTop: '4rem' }}
          >
            Finalizar compra
          </Button>
        </form>
        <div className="card">
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
      </Container>
    </>
  )
}
