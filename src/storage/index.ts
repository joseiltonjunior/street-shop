import { legacy_createStore as createStore } from 'redux'
import { productProps } from './modules/cart/action'
import rootReducer from './modules/rootReducer'

export interface reduxProps {
  cart: productProps[]
}

const store = createStore(rootReducer)

export default store
