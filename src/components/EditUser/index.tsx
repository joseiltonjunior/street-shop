import { useToast } from '@/hooks/useToast'
import clientAPI from '@/services/client-api'
import { RegisterUserProps, UserDataProps } from '@/types/user'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { reduxProps } from '@/storage'

import { FaEdit } from 'react-icons/fa'
import { Input } from '../form/Input'
import { Button } from '../form/Button'
import { ButtonEdit } from './styles'
import { stripe } from '@/lib/stripe'
import { Grid } from '@/styles/pages/sign-in'

const required = 'Este campo é obrigatório'

const schema = yup.object().shape({
  name: yup.string().required(required),
  email: yup.string().email('E-mail inválido').required(required),
  phone: yup.string().min(14, required),
})

export function EditUser({ user }: UserDataProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserProps>({
    resolver: yupResolver(schema),
  })

  const [editUser, setEditUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const token = useSelector<reduxProps, string>((state) => state.token)

  const { showToast } = useToast()

  async function handleEditUser(data: RegisterUserProps) {
    if (!user) return

    setIsLoading(true)

    const editUser = {
      email: data.email,
      name: data.name,
      phone: data.phone.replaceAll(' ', '').replace('-', ''),
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await stripe.customers.update(user.customer_id, editUser)

    await clientAPI
      .put('/me', editUser, config)
      .then(() => {
        showToast('Dados atualizados com sucesso.', {
          type: 'success',
          theme: 'colored',
        })
        setEditUser(false)
      })
      .catch(() => {
        showToast('Erro ao atualizar os dados.', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('phone', user.phone)
      setValue('email', user.email)
    }
  }, [setValue, user])

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleEditUser)}
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
          <h2>Meus dados</h2>

          <ButtonEdit
            onClick={() => setEditUser(true)}
            type="button"
            title="Editar dados"
          >
            <FaEdit size={20} />
          </ButtonEdit>
        </div>
        <Input
          label="Nome"
          name="name"
          register={register}
          error={errors.name}
          disabled={!editUser}
        />

        <Grid>
          <Input
            mask="99 9 9999-9999"
            label="Telefone"
            name="phone"
            register={register}
            error={errors.phone}
            disabled={!editUser}
          />
          <Input
            label="E-mail"
            name="email"
            register={register}
            error={errors.email}
            disabled={!editUser}
          />
        </Grid>

        {editUser && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditUser(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Salvar
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
