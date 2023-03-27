import Image from 'next/image'
import searchIcon from '@/assets/usopp.png'

import { Container } from './styles'

import { useState } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { productProps } from '@/storage/modules/cart/action'

export function SearchInput() {
  const [listProducts, setListProducts] = useState<productProps[]>()

  const products = useSelector<reduxProps, productProps[]>(
    (state) => state.products,
  )

  function handleSearchProduct(key: string) {
    if (key.length <= 3) return setListProducts([])

    const filter = products.filter((product) =>
      product.name.toUpperCase().includes(key.toUpperCase()),
    )

    setListProducts(filter)
  }

  return (
    <Container>
      <input
        name="search"
        type="text"
        placeholder="Busque aqui"
        autoComplete="off"
        onChange={(e) => handleSearchProduct(e.currentTarget.value)}
      />
      <Image src={searchIcon} alt="" width={60} />

      <div className="result">
        {listProducts?.map((product) => (
          <Link
            key={product.id}
            href={`/product?id=${product.id}`}
            prefetch={false}
          >
            <Image src={product.imageUrl} alt="" width={30} height={30} />
            <p>{product.name}</p>
          </Link>
        ))}
      </div>
    </Container>
  )
}
