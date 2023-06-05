import { combineReducers } from 'redux'

import cart from './cart/reducer'
import products from './products/reducer'
import sideMenu from './side-menu/reducer'
import filterProducts from './filter-products/reducer'
import user from './user/reducer'
import token from './user-token/reducer'

export default combineReducers({
  cart,
  products,
  sideMenu,
  filterProducts,
  user,
  token,
})
