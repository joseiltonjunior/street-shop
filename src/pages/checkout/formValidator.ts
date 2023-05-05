import * as yup from 'yup'

const required = 'Este campo é obrigatório'

export const registerValidatorSchema = yup.object().shape({
  name: yup.string().required(required),
  email: yup.string().email('E-mail inválido').required(required),
  phone: yup.string().min(14, required),
  zipCode: yup.string().min(9, required),
  city: yup.string().required(required),
  country: yup.string().required(required),
  state: yup.string().required(required),
  line1: yup.string().required(required),
  line2: yup.string().min(1, required),
  card: yup.string().min(19, required),
  validate: yup.string().min(7, required),
  cvc: yup.string().min(3, required),
})
