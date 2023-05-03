import * as yup from 'yup'

export const registerValidatorSchema = yup.object().shape({
  name: yup.string().required('Este campo é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Este campo é obrigatório'),
})
