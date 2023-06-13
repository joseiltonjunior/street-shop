import { ProductInfoProps, ProductsProps } from '@/types/product'

import { useCallback, useEffect, useState } from 'react'
import { ItemCategory } from './Item'

interface CategoryItemsProps extends ProductsProps {
  title: string
}

export function CategoryItems({ title, products }: CategoryItemsProps) {
  const [coffee, setCoffee] = useState<ProductInfoProps[]>()
  const [cups, setCups] = useState<ProductInfoProps[]>()
  const [actionFigures, setActionFigures] = useState<ProductInfoProps[]>()

  const filterCategory = useCallback(() => {
    const filterCoffee = products.filter(
      (product) => product.unitLabel === 'cafe',
    )
    const filterCups = products.filter(
      (product) => product.unitLabel === 'copo',
    )

    const filterActionFigure = products.filter(
      (product) => product.unitLabel === 'actionFigure',
    )

    setActionFigures(filterActionFigure)
    setCoffee(filterCoffee)
    setCups(filterCups)
  }, [products])

  useEffect(() => {
    filterCategory()
  }, [filterCategory])

  return (
    <div className="flex flex-col justify-center ">
      <strong className="text-lg text-center">
        {title.toLocaleUpperCase()}
      </strong>
      <div className="flex gap-4 mt-2 md:flex-col">
        {coffee && (
          <ItemCategory title="Cafés Gourmet" imgUrl={coffee[2].imageUrl} />
        )}
        {cups && (
          <ItemCategory title="Copos e Garrafas" imgUrl={cups[1].imageUrl} />
        )}
        {actionFigures && (
          <ItemCategory
            title="Action Figures"
            imgUrl={actionFigures[1].imageUrl}
          />
        )}
      </div>
    </div>
  )
}
