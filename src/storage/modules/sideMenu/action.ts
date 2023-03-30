import { sideMenuProps } from '@/types/sideMenu'

export function setSideMenu(isVisible: sideMenuProps) {
  return {
    type: '@sideMenu/SET_SIDE_MENU',
    payload: {
      isVisible,
    },
  }
}
