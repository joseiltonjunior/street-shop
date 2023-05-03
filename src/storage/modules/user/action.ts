import { userProps } from '@/types/user'

export function setDataUser(id: userProps) {
  return {
    type: '@user/SET_ADD_USER',
    payload: {
      id,
    },
  }
}
