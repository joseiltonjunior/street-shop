import { MdClose, MdFilterList, MdSearch } from 'react-icons/md'

interface ButtonsProps {
  filterIsVisible: boolean
  handleFilter: () => void
  searchIsVisible: boolean
  handleSearch: () => void
}

export function Buttons({
  filterIsVisible,
  handleFilter,
  handleSearch,
  searchIsVisible,
}: ButtonsProps) {
  return (
    <div className="flex gap-2 items-center md:justify-start md:w-full md:mt-4 ">
      <button
        className={`category-filter-search-button ${
          filterIsVisible && 'bg-purple-600 text-white'
        }`}
        onClick={handleFilter}
      >
        {filterIsVisible ? <MdClose /> : <MdFilterList />}
        Filter
      </button>
      <button
        className={`category-filter-search-button ${
          searchIsVisible && 'bg-purple-600 text-white'
        }`}
        onClick={handleSearch}
      >
        {searchIsVisible ? <MdClose /> : <MdSearch />}
        Search
      </button>
    </div>
  )
}
