export interface ProductInfoProps {
  id: string
  name: string
  imageUrl: string
  price: string
  unitLabel: string
}

export interface HomeProps {
  products: ProductInfoProps[]
}
