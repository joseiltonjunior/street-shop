import Image from 'next/image'

import { InputHTMLAttributes, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'

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
    <div
      onMouseLeave={() => setShowList(!setShowList)}
      className="relative"
      {...rest}
    >
      <div
        className={`flex max-w-xl h-10 items-center rounded-md overflow-hidden`}
      >
        <input
          className="p-[6px] px-2 h-9 text-gray-500 focus:outline-none w-full max-w-md"
          name="search"
          type="text"
          placeholder="Buscar produtos"
          value={valueFilter}
          onClick={() => handleSearchProduct(valueFilter)}
          autoComplete="off"
          onChange={(e) => {
            dispatch(filterProducts(e.currentTarget.value))
            handleSearchProduct(e.currentTarget.value)
          }}
        />

        <button
          className="bg-white flex items-center justify-center h-9 px-3 hover:bg-gray-300 hover:color-gray-800 border-l rounded-r"
          onClick={() => handleSearchProduct(valueFilter)}
        >
          <IoMdSearch size={25} className="fill-gray-500/50" />
        </button>
      </div>

      <div className="relative z-[999] max-w-md ">
        <div className="absolute bg-white flex-col flex w-full left-[2px] rounded overflow-hidden">
          {showList &&
            listProducts?.map((product) => (
              <button
                className="flex p-2 items-center gap-2 hover:bg-gray-100"
                key={product.id}
                onClick={() => {
                  setShowList(!setShowList)
                  if (action) action()
                  router.push(`/product?id=${product.id}`)
                }}
              >
                <Image src={product.imageUrl} alt="" width={30} height={30} />
                <p className="text-gray-500 truncate">{product.name}</p>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
