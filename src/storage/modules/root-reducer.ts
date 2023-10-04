import { combineReducers } from 'redux'

import cart from './cart/reducer'
import products from './products/reducer'
import sideMenu from './sideMenu/reducer'
import filterCategoryProducts from './filterCategoryProducts/reducer'
import user from './user/reducer'
import token from './user-token/reducer'

export default combineReducers({
  cart,
  products,
  sideMenu,
  filterCategoryProducts,
  user,
  token,
})
