export interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export interface BuyProductProps extends ProductProps {
  purchase(): void
  isLoading: boolean
}
