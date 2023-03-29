import { ProductInfoProps } from '@/types/product'
import { legacy_createStore as createStore } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './modules/rootReducer'

export interface reduxProps {
  cart: ProductInfoProps[]
  products: ProductInfoProps[]
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'products'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
