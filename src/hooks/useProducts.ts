import { FilterListProps } from '@/types/filterProducts'
import { ProductInfoProps, ProductsProps } from '@/types/product'
import { handleFormartValue } from '@/utils/formatValue'

import { useCallback, useState } from 'react'

export type FilterTypes = 'all' | 'tshirts' | 'pants' | 'shoes' | 'accessories'

export function useProducts({ products }: ProductsProps) {
  const [productsFiltered, setProductsFiltered] = useState<
    ProductInfoProps[] | null
  >()

  const [searchIsVisible, setSearchIsVisible] = useState(false)
  const [filterIsVisible, setFilterIsVisible] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const [filter, setIsFilter] = useState<FilterTypes>('all')
  const [filterList, setFilterList] = useState<FilterListProps>({
    sortBy: 'default',
    price: 'default',
    color: 'default',
    tag: null,
  })

  const handleNavCategory = (
    type: 'all' | 'tshirts' | 'pants' | 'shoes' | 'accessories',
  ) => {
    setIsFilter(type)
  }

  const handleSearch = () => {
    setFilterIsVisible(false)
    setSearchIsVisible(!searchIsVisible)
  }

  const handleFilter = () => {
    setFilterIsVisible(!filterIsVisible)
    setSearchIsVisible(false)
  }

  const handleFilterByPrice = useCallback(
    (products: ProductInfoProps[]) => {
      switch (filterList.price) {
        case '50': {
          const newList = products.filter(
            (product) =>
              handleFormartValue(product.defaultPrice) > 0 &&
              handleFormartValue(product.defaultPrice) <= 50,
          )
          return newList
        }
        case '100': {
          const newList = products.filter(
            (product) =>
              handleFormartValue(product.defaultPrice) > 50 &&
              handleFormartValue(product.defaultPrice) <= 100,
          )
          return newList
        }

        case '150': {
          const newList = products.filter(
            (product) =>
              handleFormartValue(product.defaultPrice) > 100 &&
              handleFormartValue(product.defaultPrice) <= 150,
          )
          return newList
        }

        case '200': {
          const newList = products.filter(
            (product) =>
              handleFormartValue(product.defaultPrice) > 150 &&
              handleFormartValue(product.defaultPrice) <= 200,
          )
          return newList
        }

        case 'high': {
          const newList = products.filter(
            (product) => handleFormartValue(product.defaultPrice) > 200,
          )
          return newList
        }

        default:
          return [...products]
      }
    },
    [filterList.price],
  )

  const handleFilterByOrder = useCallback(
    (products: ProductInfoProps[]) => {
      switch (filterList.sortBy) {
        case 'lowPrice': {
          const newList = products.sort(
            (a, b) =>
              handleFormartValue(a.defaultPrice) -
              handleFormartValue(b.defaultPrice),
          )
          return (products = newList)
        }

        case 'highPrice': {
          const newList = products.sort(
            (a, b) =>
              handleFormartValue(b.defaultPrice) -
              handleFormartValue(a.defaultPrice),
          )
          return (products = newList)
        }

        default:
          return (products = [...products])
      }
    },
    [filterList.sortBy],
  )

  const handleFormatFilterColor = (key: string) => {
    switch (key) {
      case 'black':
        return 'bg-black text-white border border-black'

      case 'red':
        return 'bg-red-500 text-white border border-red-500'

      case 'blue':
        return 'bg-blue-500 text-white border border-blue-500'

      case 'gray':
        return 'bg-gray-300 text-white border border-gray-300'

      case 'green':
        return 'bg-green-500 text-white border border-green-500'

      case 'white':
        return 'bg-white text-gray-500 border border-gray-500'

      default:
        return 'bg-transparent text-white'
    }
  }

  const handleFilterByTag = useCallback(
    (products: ProductInfoProps[]) => {
      switch (filterList.tag) {
        case 'streetstyle': {
          const newList = products.filter(
            (product) => product.metaData.tag === 'streetstyle',
          )
          return (products = newList)
        }

        case 'lifestyle': {
          const newList = products.filter(
            (product) => product.metaData.tag === 'lifestyle',
          )
          return (products = newList)
        }

        case 'cargo': {
          const newList = products.filter(
            (product) => product.metaData.tag === 'cargo',
          )
          return (products = newList)
        }

        case 'crafts': {
          const newList = products.filter(
            (product) => product.metaData.tag === 'crafts',
          )
          return (products = newList)
        }

        case 'promotion': {
          const newList = products.filter(
            (product) => product.metaData.tag === 'promotion',
          )
          return (products = newList)
        }

        default:
          return (products = [...products])
      }
    },
    [filterList.tag],
  )

  const handleFilterByColor = useCallback(
    (products: ProductInfoProps[]) => {
      switch (filterList.color) {
        case 'black': {
          const newList = products.filter(
            (product) => product.metaData.color === 'black',
          )
          return (products = newList)
        }

        case 'white': {
          const newList = products.filter(
            (product) => product.metaData.color === 'white',
          )
          return (products = newList)
        }

        case 'blue': {
          const newList = products.filter(
            (product) => product.metaData.color === 'blue',
          )
          return (products = newList)
        }

        case 'gray': {
          const newList = products.filter(
            (product) => product.metaData.color === 'gray',
          )
          return (products = newList)
        }

        case 'green': {
          const newList = products.filter(
            (product) => product.metaData.color === 'green',
          )
          return (products = newList)
        }

        case 'red': {
          const newList = products.filter(
            (product) => product.metaData.color === 'red',
          )
          return (products = newList)
        }

        default:
          return (products = [...products])
      }
    },
    [filterList.color],
  )

  const handleFilterProducts = useCallback(() => {
    let filterListProducts = products

    filterListProducts = handleFilterByPrice(filterListProducts)

    filterListProducts = handleFilterByOrder(filterListProducts)

    filterListProducts = handleFilterByTag(filterListProducts)

    filterListProducts = handleFilterByColor(filterListProducts)

    if (filter === 'all') {
      setProductsFiltered(filterListProducts)

      return
    }

    const newList = filterListProducts.filter(
      (product) => product.unitLabel === filter,
    )

    setProductsFiltered(newList)
  }, [
    filter,
    handleFilterByColor,
    handleFilterByOrder,
    handleFilterByPrice,
    handleFilterByTag,
    products,
  ])

  const handleSearchProducts = useCallback(
    (text: string) => {
      setSearchValue(text)
      if (text === '') {
        setProductsFiltered(products)
        return
      }
      const newList = products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase()),
      )
      setProductsFiltered(newList)
    },
    [products],
  )

  return {
    productsFiltered,
    searchValue,
    filter,
    filterList,
    searchIsVisible,
    filterIsVisible,
    setFilterList,
    handleNavCategory,
    handleFilter,
    handleSearch,
    handleFilterProducts,
    handleSearchProducts,
    handleFormatFilterColor,
  }
}
