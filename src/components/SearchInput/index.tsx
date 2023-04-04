import Image from 'next/image'
// import searchIcon from '@/assets/usopp.png'
import xIcon from '@/assets/x-circle.svg'

import { Container, Input, List } from './styles'

import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { filterProducts } from '@/storage/modules/filterProducts/action'
import { useRouter } from 'next/router'

export function SearchInput() {
  const [listProducts, setListProducts] = useState<ProductInfoProps[]>()
  const [showList, setShowList] = useState(false)

  const dispatch = useDispatch()

  const router = useRouter()

  const products = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.products,
  )

  const valueFilter = useSelector<reduxProps, string>(
    (state) => state.filterProducts,
  )

  function handleSearchProduct(key: string) {
    if (key.length <= 2) return setListProducts([])

    const filter = products.filter((product) =>
      product.name.toUpperCase().includes(key.toUpperCase()),
    )

    setListProducts(filter)
    setShowList(true)
  }

  return (
    <Container onMouseLeave={() => setShowList(false)}>
      <Input listIsVisible={showList}>
        <input
          name="search"
          type="text"
          placeholder="Busque aqui"
          value={valueFilter}
          autoComplete="off"
          onClick={() => setShowList(true)}
          onChange={(e) => {
            dispatch(filterProducts(e.currentTarget.value))
            handleSearchProduct(e.currentTarget.value)
          }}
        />

        {valueFilter.length > 0 && (
          <button
            title="Limpar"
            onClick={() => {
              dispatch(filterProducts(''))
              setListProducts([])
              setShowList(false)
            }}
            style={{
              marginRight: 10,

              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image src={xIcon} alt="" width={20} height={20} />
          </button>
        )}
      </Input>

      <List>
        {showList &&
          listProducts?.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                setShowList(false)
                router.push(`/product?id=${product.id}`)
              }}
            >
              <Image src={product.imageUrl} alt="" width={30} height={30} />
              <p>{product.name}</p>
            </button>
          ))}
      </List>
    </Container>
  )
}
