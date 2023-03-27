import { legacy_createStore as createStore } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { productProps } from './modules/cart/action'
import rootReducer from './modules/rootReducer'

export interface reduxProps {
  cart: productProps[]
  products: productProps[]
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
