import { FilterListProps } from '@/types/filterProducts'
import { orderFilterTypes } from '@/utils/enums/orderFilters'
import { formatReal } from '@/utils/formatReal'
import { Dispatch, SetStateAction } from 'react'
import { MdClear } from 'react-icons/md'

interface FiltersTagProps {
  filterList: FilterListProps
  setFilterList: Dispatch<SetStateAction<FilterListProps>>
  handleFormatFilterColor: (key: string) => string
}

export function FiltersTag({
  filterList,
  setFilterList,
  handleFormatFilterColor,
}: FiltersTagProps) {
  return (
    <>
      {filterList.color !== 'default' && (
        <button
          className={`flex items-center justify-center text-sm px-2 py-0 rounded-full  ${handleFormatFilterColor(
            filterList.color,
          )} gap-2`}
          onClick={() => setFilterList({ ...filterList, color: 'default' })}
        >
          {filterList.color[0].toUpperCase() + filterList.color.substring(1)}
          <MdClear />
        </button>
      )}

      {filterList.price !== 'default' && (
        <button
          className={`flex items-center justify-center text-sm px-2 py-0 border border-indigo-500 rounded-full bg-indigo-500 text-white gap-2`}
          onClick={() => setFilterList({ ...filterList, price: 'default' })}
        >
          {filterList.price === 'high'
            ? 'R$ 200,00+'
            : formatReal(Number(filterList.price) * 100)}
          <MdClear />
        </button>
      )}

      {filterList.sortBy !== 'default' && (
        <button
          className={`flex items-center justify-center text-sm px-2 py-0 border border-cyan-500 rounded-full bg-cyan-500 text-white gap-2`}
          onClick={() => setFilterList({ ...filterList, sortBy: 'default' })}
        >
          {orderFilterTypes[filterList.sortBy]} <MdClear />
        </button>
      )}

      {filterList.tag !== null && (
        <button
          className={`flex items-center justify-center text-sm px-2 py-0 border border-yellow-500 rounded-full bg-yellow-500 text-white gap-2`}
          onClick={() => setFilterList({ ...filterList, tag: null })}
        >
          {filterList.tag[0].toUpperCase() + filterList.tag.substring(1)}{' '}
          <MdClear />
        </button>
      )}
    </>
  )
}
