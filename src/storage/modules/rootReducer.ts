import { combineReducers } from 'redux'

import cart from './cart/reducer'
import products from './products/reducer'
import sideMenu from './sideMenu/reducer'
import filterProducts from './filterProducts/reducer'

export default combineReducers({
  cart,
  products,
  sideMenu,
  filterProducts,
})
