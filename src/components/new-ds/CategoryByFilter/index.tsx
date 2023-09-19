import { MdFilterList, MdSearch } from 'react-icons/md'
import { ProductCard } from '../ProductCard'
import { ProductInfoProps, ProductsProps } from '@/types/product'
import { useCallback, useEffect, useState } from 'react'

export function CategoryByFilter({ products }: ProductsProps) {
  const [categoryFiltered, setCategoryFiltered] = useState<
    ProductInfoProps[] | null
  >()
  const [filter, setIsFilter] = useState<
    'all' | 'tshirts' | 'pants' | 'shoes' | 'accessories'
  >('all')

  const handleFilterCategory = useCallback(() => {
    if (filter === 'all') {
      setCategoryFiltered(products)
      return
    }

    const newList = products.filter((product) => product.unitLabel === filter)
    setCategoryFiltered(newList)
  }, [filter, products])

  useEffect(() => {
    handleFilterCategory()
  }, [handleFilterCategory])

  return (
    <div className="container mb-32">
      <h1 className="font-bold text-4xl">PRODUCT OVERVIEW</h1>
      <div className="flex justify-between mt-6 text-sm items-center md:flex-col">
        <nav className="flex gap-10 md:flex-col md:gap-2 md:justify-start w-full">
          <div className="flex gap-10">
            <button
              className={`nav-button ${filter === 'all' && 'border-b'}`}
              onClick={() => setIsFilter('all')}
            >
              All Products
            </button>
            <button
              className={`nav-button ${filter === 'tshirts' && 'border-b'}`}
              onClick={() => {
                setIsFilter('tshirts')
              }}
            >
              T-Shirts
            </button>
            <button
              className={`nav-button ${filter === 'pants' && 'border-b'}`}
              onClick={() => {
                setIsFilter('pants')
              }}
            >
              Pants
            </button>
          </div>
          <div className="flex gap-10">
            <button
              className={`nav-button ${filter === 'shoes' && 'border-b'}`}
              onClick={() => {
                setIsFilter('shoes')
              }}
            >
              Shoes
            </button>
            <button
              className={`nav-button ${filter === 'accessories' && 'border-b'}`}
              onClick={() => {
                setIsFilter('accessories')
              }}
            >
              Accessories
            </button>
          </div>
        </nav>
        <div className="flex gap-2 items-center md:justify-start md:w-full md:mt-4 ">
          <button className="border h-fit py-2 px-4 flex items-center gap-4 text-gray-500/80 hover:bg-purple-600 hover:text-white rounded transition duration-300">
            <MdFilterList /> Filter
          </button>
          <button className="border h-fit py-2 px-4 flex items-center gap-4 text-gray-500/80 hover:bg-purple-600 hover:text-white rounded transition duration-300">
            <MdSearch />
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 gap-8 mt-16 md:grid-cols-1">
          {categoryFiltered?.map((item, index) => (
            <ProductCard product={item} key={index} />
          ))}
        </div>

        <button className="mt-20 bg-gray-200 rounded-full px-6 py-2 font-medium ml-auto mr-auto hover:bg-gray-800 hover:text-white transition duration-500">
          LOAD MORE
        </button>
      </div>
    </div>
  )
}
