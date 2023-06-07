export interface ResponseAddressProps {
  street: string
  country: string
  state: string
  city: string
  number: string
  zip_code: string
  complement: string
}

export interface RegisterAddressProps {
  street: string
  country: string
  state: string
  city: string
  number: string
  zipCode: string
  complement: string
}

export interface AddressDataProps {
  address?: ResponseAddressProps
  refresh?: () => void
}
