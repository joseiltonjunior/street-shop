import * as yup from 'yup'

export const registerValidatorSchema = yup.object().shape({
  name: yup.string().required('Este campo é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Este campo é obrigatório'),
  phone: yup.string().required('Este campo é obrigatório'),
  zipCode: yup.string().required('Este campo é obrigatório'),
  city: yup.string().required('Este campo é obrigatório'),
  country: yup.string().required('Este campo é obrigatório'),
  state: yup.string().required('Este campo é obrigatório'),
  line1: yup.string().required('Este campo é obrigatório'),
})
