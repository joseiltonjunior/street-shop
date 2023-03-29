export interface ProductInfoProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
  quantity: number
  unitLabel: string
}

export interface ProductsProps {
  products: ProductInfoProps[]
}

export interface ProductProps {
  product: ProductInfoProps
}
