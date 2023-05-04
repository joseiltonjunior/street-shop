import * as yup from 'yup'

export const registerValidatorSchema = yup.object().shape({
  name: yup.string().required('Este campo é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Este campo é obrigatório'),
  phone: yup.string().min(15, 'Este campo é obrigatório'),
  zipCode: yup.string().min(9, 'Este campo é obrigatório'),
  city: yup.string().required('Este campo é obrigatório'),
  country: yup.string().required('Este campo é obrigatório'),
  state: yup.string().required('Este campo é obrigatório'),
  line1: yup.string().required('Este campo é obrigatório'),
  line2: yup.string().min(1, 'Este campo é obrigatório'),
  card: yup.string().min(19, 'Este campo é obrigatório'),
  validate: yup.string().min(7, 'Este campo é obrigatório'),
  cvc: yup.string().min(3, 'Este campo é obrigatório'),
})
