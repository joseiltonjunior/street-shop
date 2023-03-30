import { combineReducers } from 'redux'

import cart from './cart/reducer'
import products from './products/reducer'
import sideMenu from './sideMenu/reducer'
export default combineReducers({
  cart,
  products,
  sideMenu,
})
