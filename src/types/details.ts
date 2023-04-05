export interface DetailsProps {
  salesInformation: {
    clientName: string
    products: {
      product: {
        name: string
        images: string[]
        id: string
      }
      price: string
      quantity: number
    }[]
    shippingDetails: {
      address: {
        city: string
        country: string
        line1: string
        line2: string
        postal_code: string
        state: string
      }
      email: string
      name: string
      phone: string
    }
    amountTotal: number
  }
}
