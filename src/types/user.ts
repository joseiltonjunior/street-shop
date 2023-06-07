export interface ResponseUserProps {
  id: string
  customer_id: string
  name: string
  email: string
  phone: string
  created_at: string
  updated_at: string
}

export interface RegisterUserProps {
  customerId: string
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export interface UserDataProps {
  user?: ResponseUserProps
}
