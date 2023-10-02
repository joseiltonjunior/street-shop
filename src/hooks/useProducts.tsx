import { FilterListProps } from '@/types/filterProducts'
import { ProductInfoProps, ProductsProps } from '@/types/product'
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
    setFilterIsVisible(false)
    setSearchIsVisible(false)
  }

  const handleSearch = () => {
    setFilterIsVisible(false)
    setSearchIsVisible(!searchIsVisible)
    handleSarchProducts('')
    setFilterList({
      color: 'default',
      price: 'default',
      sortBy: 'default',
      tag: null,
    })
  }

  const handleFilter = () => {
    setFilterIsVisible(!filterIsVisible)
    setSearchIsVisible(false)
    handleSarchProducts('')
    if (filterIsVisible) {
      setFilterList({
        color: 'default',
        price: 'default',
        sortBy: 'default',
        tag: null,
      })
    }
  }

  const handleSelectedCategory = useCallback(() => {
    if (filter === 'all') {
      setProductsFiltered(products)
      return
    }

    const newList = products.filter((product) => product.unitLabel === filter)
    setProductsFiltered(newList)
  }, [filter, products])

  const handleSarchProducts = useCallback(
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
    handleSelectedCategory,
    handleSarchProducts,
  }
}
