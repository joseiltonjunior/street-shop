import { ResponseUserProps } from '@/types/user'

export function setSaveUser(user: ResponseUserProps) {
  return {
    type: '@user/SAVE_USER',
    payload: {
      user,
    },
  }
}

export function setSignOut() {
  return {
    type: '@user/SIGN_OUT',
  }
}
