export interface checkoutResponseProps {
  address: {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: string
  }
  card: {
    number: string
    exp_month: number
    exp_year: number
    cvc: string
  }
  amount: number
  name: string
  email: string
  phone: string
  products: {
    price: string
    quantity: number
  }[]
}
