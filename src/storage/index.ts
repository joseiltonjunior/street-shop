import { ProductInfoProps } from '@/types/product'
import { sideMenuProps } from '@/types/sideMenu'
import { legacy_createStore as createStore } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './modules/rootReducer'

export interface reduxProps {
  cart: ProductInfoProps[]
  products: ProductInfoProps[]
  sideMenu: sideMenuProps
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'products', 'sideMenu'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
