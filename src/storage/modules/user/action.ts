import { userProps } from '@/types/user'

export function setDataUser(user: userProps) {
  return {
    type: '@user/SET_ADD_USER',
    payload: {
      user,
    },
  }
}
