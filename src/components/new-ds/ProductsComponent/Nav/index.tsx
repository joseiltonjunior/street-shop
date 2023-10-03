import { FilterTypes } from '@/hooks/useProducts'

interface NavProps {
  filter: string
  handleNavCategory: (key: FilterTypes) => void
}

export function Nav({ filter, handleNavCategory }: NavProps) {
  return (
    <nav className="flex gap-10 md:flex-col md:gap-2 md:justify-start w-full">
      <div className="flex gap-10">
        <button
          className={`nav-button ${filter === 'all' && 'border-b'}`}
          onClick={() => {
            handleNavCategory('all')
          }}
        >
          All Products
        </button>
        <button
          className={`nav-button ${filter === 'tshirts' && 'border-b'}`}
          onClick={() => {
            handleNavCategory('tshirts')
          }}
        >
          T-Shirts
        </button>
        <button
          className={`nav-button ${filter === 'pants' && 'border-b'}`}
          onClick={() => {
            handleNavCategory('pants')
          }}
        >
          Pants
        </button>
      </div>
      <div className="flex gap-10">
        <button
          className={`nav-button ${filter === 'shoes' && 'border-b'}`}
          onClick={() => {
            handleNavCategory('shoes')
          }}
        >
          Shoes
        </button>
        <button
          className={`nav-button ${filter === 'accessories' && 'border-b'}`}
          onClick={() => {
            handleNavCategory('accessories')
          }}
        >
          Accessories
        </button>
      </div>
    </nav>
  )
}
