import { ProductCard } from '../ProductCard'
import { ProductsProps } from '@/types/product'
import { useEffect } from 'react'
import { Input } from './Input'
import { Filter } from './Filter'

import { useProducts } from '@/hooks/useProducts'
import { Nav } from './Nav'
import { Buttons } from './Buttons'
import { FiltersTag } from './FiltersTag'

interface ProductsComponentProps extends ProductsProps {
  isTitle?: boolean
}

export function ProductsComponent({
  products,
  isTitle,
}: ProductsComponentProps) {
  const {
    filter,
    filterList,
    productsFiltered,
    searchValue,
    filterIsVisible,
    searchIsVisible,
    setFilterList,
    handleFilter,
    handleNavCategory,
    handleSearchProducts,
    handleSearch,
    handleFilterProducts,
    handleFormatFilterColor,
  } = useProducts({ products })

  useEffect(() => {
    handleFilterProducts()
  }, [handleFilterProducts])

  return (
    <div>
      {isTitle && <h1 className="font-bold text-4xl">PRODUCT OVERVIEW</h1>}
      <div className="flex justify-between my-6 text-sm items-center md:flex-col">
        <Nav filter={filter} handleNavCategory={handleNavCategory} />

        <div className="flex flex-col items-start gap-2">
          <Buttons
            filterIsVisible={filterIsVisible}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            searchIsVisible={searchIsVisible}
          />

          <FiltersTag
            filterList={filterList}
            setFilterList={setFilterList}
            handleFormatFilterColor={handleFormatFilterColor}
          />
        </div>
      </div>

      <Filter
        isVisible={filterIsVisible}
        filter={filterList}
        setFilter={setFilterList}
      />

      <Input
        isVisible={searchIsVisible}
        onChange={(e) => handleSearchProducts(e.currentTarget.value)}
        placeholder="Search"
        name="filter"
        value={searchValue}
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-4 gap-8 mt-14 md:grid-cols-1">
          {productsFiltered?.map((item, index) => (
            <ProductCard product={item} key={index} />
          ))}
        </div>

        <button className="category-filter-more-button">LOAD MORE</button>
      </div>
    </div>
  )
}
