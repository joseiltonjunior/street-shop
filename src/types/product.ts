export interface ProductInfoProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPrice: number
  quantity: number
  unitLabel: string
}

export interface ProductsProps {
  products: ProductInfoProps[]
}

export interface ProductProps {
  product: ProductInfoProps
}
