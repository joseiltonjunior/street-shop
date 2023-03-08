// import { useRouter } from 'next/router'
import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from '@/styles/pages/product'

export default function Product() {
  // const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat at
          iure amet accusantium optio quae laudantium modi aperiam, suscipit
          temporibus quam quos! Exercitationem fuga commodi cum animi reiciendis
          dicta laboriosam.
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
