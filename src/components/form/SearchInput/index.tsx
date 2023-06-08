import Image from 'next/image'

import { Container, Input, List } from './styles'

import { InputHTMLAttributes, useState } from 'react'
import { IoMdCloseCircleOutline, IoMdSearch } from 'react-icons/io'

import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { filterProducts } from '@/storage/modules/filter-products/action'
import { useRouter } from 'next/router'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  action?: () => void
}

export function SearchInput({ action, ...rest }: SearchInputProps) {
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

    if (filter.length > 0) {
      setListProducts(filter)
      setShowList(true)
    }
  }

  return (
    <Container onMouseLeave={() => setShowList(!setShowList)} {...rest}>
      <Input listIsVisible={showList}>
        <input
          name="search"
          type="text"
          placeholder="Buscar produtos"
          value={valueFilter}
          autoComplete="off"
          onClick={() => {
            handleSearchProduct(valueFilter)
          }}
          onChange={(e) => {
            dispatch(filterProducts(e.currentTarget.value))
            handleSearchProduct(e.currentTarget.value)
          }}
        />

        {valueFilter.length > 0 ? (
          <button
            title="Limpar"
            onClick={() => {
              dispatch(filterProducts(''))
              setListProducts([])
              setShowList(false)
            }}
            className="mr-2"
          >
            <IoMdCloseCircleOutline
              size={20}
              className="fill-red-500 hover:fill-red-600"
            />
          </button>
        ) : (
          <IoMdSearch size={20} className="fill-gray-500 mr-2" />
        )}
      </Input>

      <List>
        {showList &&
          listProducts?.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                setShowList(!setShowList)
                if (action) action()
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
