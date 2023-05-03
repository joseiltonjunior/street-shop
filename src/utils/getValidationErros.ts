import { ValidationError } from 'yup'

interface Erros {
  [key: string]: string
}

export default function getValidationErros(err: ValidationError): Erros {
  const validationErros: Erros = {}

  err.inner.forEach((error) => {
    if (error.path) {
      validationErros[error.path] = error.message
    }
  })

  return validationErros
}
