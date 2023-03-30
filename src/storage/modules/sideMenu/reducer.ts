import { sideMenuProps } from '@/types/sideMenu'
import { Reducer } from 'redux'

const INITIAL_STATE: sideMenuProps = { isVisible: false }

const product: Reducer<sideMenuProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@sideMenu/SET_SIDE_MENU': {
      const { isVisible } = action.payload

      return (state = isVisible)
    }

    default: {
      return state
    }
  }
}

export default product
