import { useToast } from '@/hooks/useToast'
import clientAPI from '@/services/client-api'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import emptyAddressIcon from '@/assets/luffy-confuso.png'

import { zodResolver } from '@hookform/resolvers/zod'
import { reduxProps } from '@/storage'

import { FaEdit } from 'react-icons/fa'
import { Input } from '../form/Input'
import { Button } from '../form/Button'
import { ButtonEdit, FormGrid } from './styles'

import { AddressDataProps, RegisterAddressProps } from '@/types/address'

import { z } from 'zod'
import axios from 'axios'
import Image from 'next/image'

const schema = z.object({
  street: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  number: z.string(),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/),
  complement: z.string().optional(),
})

export function EditAddress({ address, refresh }: AddressDataProps) {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAddressProps>({
    resolver: zodResolver(schema),
  })

  const [editAddress, setEditAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const token = useSelector<reduxProps, string>((state) => state.token)

  const { showToast } = useToast()

  async function handleEditAddress(data: RegisterAddressProps) {
    setIsLoading(true)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (!address) {
      await clientAPI
        .post('/addresses', data, config)
        .then(() => {
          showToast('Endereço cadastrado com sucesso.', {
            type: 'success',
            theme: 'colored',
          })

          if (refresh) refresh()
        })
        .catch(() => {
          showToast(
            'Não foi possível cadastrar o endereço. Por favor, verifique os dados fornecidos e tente novamente',
            {
              type: 'error',
              theme: 'colored',
            },
          )
        })
        .finally(() => {
          setIsLoading(false)
          setEditAddress(false)
        })

      return
    }

    await clientAPI
      .put('/addresses', data, config)
      .then(() => {
        showToast('Dados atualizados com sucesso.', {
          type: 'success',
          theme: 'colored',
        })

        if (refresh) refresh()
      })
      .catch(() => {
        showToast('Erro ao atualizar os dados.', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => {
        setIsLoading(false)
        setEditAddress(false)
      })
  }

  async function handleFetchZipCode(zipCode: string) {
    if (zipCode.length < 9) return
    await axios
      .get(`/api/fetchCep?zipCode=${zipCode}`)
      .then((result) => {
        const { localidade, logradouro, uf } = result.data

        setValue('city', localidade)
        setValue('street', logradouro)
        setValue('state', uf)
        setValue('country', 'BR')
      })
      .catch((err) => {
        const { message } = err.response.data
        if (message.includes('CEP')) {
          setError('zipCode', message)
        }
        showToast(message, {
          type: 'error',
          theme: 'colored',
        })
      })
  }

  useEffect(() => {
    if (address) {
      setValue('city', address.city)
      setValue('street', address.street)
      setValue('zipCode', address.zip_code)
      setValue('state', address.state)
      setValue('country', address.country)
      setValue('complement', address.complement)
      setValue('number', address.number)
    }
  }, [address, setValue])

  if (!address && !editAddress) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Image src={emptyAddressIcon} alt="" width={200} height={180} />
            <strong>Opss, você ainda não cadastrou um endereço.</strong>
          </div>
          <Button variant="primary" onClick={() => setEditAddress(true)}>
            Cadastrar agora
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleEditAddress)}
        style={{
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            gap: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2>Meu endereço</h2>

          <ButtonEdit
            onClick={() => setEditAddress(true)}
            type="button"
            title="Editar dados"
          >
            <FaEdit size={20} />
          </ButtonEdit>
        </div>
        <FormGrid>
          <Input
            label="CEP"
            name="zipCode"
            mask="99999-999"
            disabled={!editAddress}
            register={register}
            error={errors.zipCode}
            onChange={(e) => {
              setValue('zipCode', e.currentTarget.value)
              handleFetchZipCode(e.currentTarget.value)
            }}
          />
          <Input
            label="Logradouro"
            disabled={!editAddress}
            name="street"
            register={register}
            error={errors.street}
          />
          <Input
            disabled={!editAddress}
            label="Número"
            name="number"
            register={register}
            error={errors.number}
            maxLength={6}
          />
          <Input
            label="Complemento"
            disabled={!editAddress}
            name="complement"
            register={register}
            error={errors.complement}
          />
        </FormGrid>

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

        {editAddress && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditAddress(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="secondary" isLoading={isLoading}>
              Salvar
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
