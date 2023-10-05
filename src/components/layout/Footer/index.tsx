import { filterCategoryProducts } from '@/storage/modules/filterCategoryProducts/action'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

export function Footer() {
  const dispatch = useDispatch()

  return (
    <footer className="bg-gray-800 w-full h-96 p-20 md:h-auto md:p-8 mt-auto">
      <div className="grid grid-cols-4 text-white justify-between gap-8 container md:grid-cols-1">
        <div>
          <h1 className="font-bold">CATEGORIES</h1>
          <div className="text-gray-300 text-sm mt-8 flex flex-col gap-4">
            <Link
              href={'/products'}
              onClick={() =>
                dispatch(filterCategoryProducts({ filter: 'tshirts' }))
              }
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            >
              T-Shirts
            </Link>
            <Link
              href={'/products'}
              onClick={() =>
                dispatch(filterCategoryProducts({ filter: 'pants' }))
              }
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            >
              Pants
            </Link>
            <Link
              href={'/products'}
              onClick={() =>
                dispatch(filterCategoryProducts({ filter: 'shoes' }))
              }
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            >
              Shoes
            </Link>
            <Link
              href={'/products'}
              onClick={() =>
                dispatch(filterCategoryProducts({ filter: 'accessories' }))
              }
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            >
              Accessories
            </Link>
          </div>
        </div>

        <div>
          <h1 className="font-bold">HELP</h1>
          <div className="text-gray-300 text-sm mt-8 flex flex-col gap-4">
            <p className="hover:text-purple-600 transition duration-300 cursor-pointer">
              Track Order
            </p>
            <p className="hover:text-purple-600 transition duration-300 cursor-pointer">
              Returns
            </p>
            <p className="hover:text-purple-600 transition duration-300 cursor-pointer">
              Shipping
            </p>
            <p className="hover:text-purple-600 transition duration-300 cursor-pointer">
              FAQs
            </p>
          </div>
        </div>

        <div>
          <h1 className="font-bold">GET IN TOUCH</h1>
          <p className="text-sm text-gray-300 mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mi
            diam, mollis id turpis venenatis, placerat bibendum diam.
          </p>

          <div className="flex gap-4 mt-8 text-gray-300">
            <FaInstagram
              size={20}
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            />
            <FaFacebookF
              size={20}
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            />
            <FaPinterestP
              size={20}
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <h1 className="font-bold">NEWSLETTER</h1>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            className="bg-transparent text-sm border-b border-gray-400 mt-8 pb-2 outline-none text-white"
          />
          <button
            className="bg-purple-600 mt-4 px-8 py-2 rounded-full text-white font-medium hover:bg-white hover:text-purple-600 transition duration-300
          "
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </footer>
  )
}
