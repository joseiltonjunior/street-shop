import { ComponentProps, Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { FilterListProps } from '@/types/filterProducts'

interface FilterProps extends ComponentProps<'div'> {
  isVisible: boolean
  setFilter: Dispatch<SetStateAction<FilterListProps>>
  filter: FilterListProps
}

export function Filter({
  isVisible,
  filter: filterList,
  setFilter: setFilterList,
}: FilterProps) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: isVisible ? 'auto' : 0,
      }}
      transition={{ duration: 1 }}
      className="overflow-hidden"
    >
      <div className="items-center grid bg-gray-100 grid-cols-4 md:grid-cols-1 gap-4 p-8">
        <div className="h-full font-bold">
          <h1>Sort By</h1>
          <div className="flex flex-col items-start mt-4 gap-2 text-sm ">
            <button
              data-selected={filterList.sortBy === 'default'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, sortBy: 'default' })
              }}
            >
              Default
            </button>
            <button
              data-selected={filterList.sortBy === 'popularity'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, sortBy: 'popularity' })
              }}
            >
              Popularity
            </button>
            <button
              data-selected={filterList.sortBy === 'average'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, sortBy: 'average' })
              }}
            >
              Average Rating
            </button>
            <button
              data-selected={filterList.sortBy === 'newness'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, sortBy: 'newness' })
              }}
            >
              Newness
            </button>
            <button
              data-selected={filterList.sortBy === 'lowPrice'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, sortBy: 'lowPrice' })
              }}
            >
              Price: Low to High
            </button>
            <button
              data-selected={filterList.sortBy === 'highPrice'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, sortBy: 'highPrice' })
              }}
            >
              Price: High to Low
            </button>
          </div>
        </div>

        <div className="h-full font-bold">
          <h1>Price</h1>
          <div className="flex flex-col items-start mt-4 gap-2 text-sm ">
            <button
              data-selected={filterList.price === 'default'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, price: 'default' })
              }}
            >
              Default
            </button>
            <button
              data-selected={filterList.price === '50'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, price: '50' })
              }}
            >
              $0.00 - $50.00
            </button>
            <button
              data-selected={filterList.price === '100'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, price: '100' })
              }}
            >
              $50.00 - $100.00
            </button>
            <button
              data-selected={filterList.price === '150'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, price: '150' })
              }}
            >
              $100.00 - $150.00
            </button>
            <button
              data-selected={filterList.price === '200'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, price: '200' })
              }}
            >
              $150.00 - $200.00
            </button>
            <button
              data-selected={filterList.price === 'high'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, price: 'high' })
              }}
            >
              $200.00+
            </button>
          </div>
        </div>

        <div className="h-full font-bold">
          <h1>Color</h1>
          <div className="flex flex-col items-start mt-4 gap-2 text-sm ">
            <button
              data-selected={filterList.color === 'default'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, color: 'default' })
              }}
            >
              Default
            </button>
            <button
              data-selected={filterList.color === 'black'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, color: 'black' })
              }}
            >
              Black
            </button>
            <button
              data-selected={filterList.color === 'blue'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, color: 'blue' })
              }}
            >
              Blue
            </button>
            <button
              data-selected={filterList.color === 'gray'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, color: 'gray' })
              }}
            >
              Gray
            </button>
            <button
              data-selected={filterList.color === 'green'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, color: 'green' })
              }}
            >
              Green
            </button>
            <button
              data-selected={filterList.color === 'red'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, color: 'red' })
              }}
            >
              Red
            </button>
            <button
              data-selected={filterList.color === 'white'}
              className="products-text-filter"
              onClick={() => {
                setFilterList({ ...filterList, color: 'white' })
              }}
            >
              White
            </button>
          </div>
        </div>

        <div className="h-full font-bold">
          <h1>Tags</h1>
          <div className="flex flex-col gap-2">
            <div className="mt-4 flex gap-2 ">
              <button
                data-selected={filterList.tag === 'promotion'}
                className="products-tags-filter"
                onClick={() => {
                  if (filterList.tag === 'promotion') {
                    setFilterList({ ...filterList, tag: null })
                  } else {
                    setFilterList({ ...filterList, tag: 'promotion' })
                  }
                }}
              >
                Promotion
              </button>
              <button
                data-selected={filterList.tag === 'lifestyle'}
                className="products-tags-filter"
                onClick={() => {
                  if (filterList.tag === 'lifestyle') {
                    setFilterList({ ...filterList, tag: null })
                  } else {
                    setFilterList({ ...filterList, tag: 'lifestyle' })
                  }
                }}
              >
                Lifestyle
              </button>
            </div>
            <div className="flex gap-2 items-start">
              <button
                data-selected={filterList.tag === 'cargo'}
                className="products-tags-filter"
                onClick={() => {
                  if (filterList.tag === 'cargo') {
                    setFilterList({ ...filterList, tag: null })
                  } else {
                    setFilterList({ ...filterList, tag: 'cargo' })
                  }
                }}
              >
                Cargo
              </button>
              <button
                data-selected={filterList.tag === 'streetstyle'}
                className="products-tags-filter"
                onClick={() => {
                  if (filterList.tag === 'streetstyle') {
                    setFilterList({ ...filterList, tag: null })
                  } else {
                    setFilterList({ ...filterList, tag: 'streetstyle' })
                  }
                }}
              >
                Streetstyle
              </button>
            </div>
            <button
              data-selected={filterList.tag === 'crafts'}
              className="products-tags-filter"
              onClick={() => {
                if (filterList.tag === 'crafts') {
                  setFilterList({ ...filterList, tag: null })
                } else {
                  setFilterList({ ...filterList, tag: 'crafts' })
                }
              }}
            >
              Crafts
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
