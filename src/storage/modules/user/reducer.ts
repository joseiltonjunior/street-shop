import { userDataProps } from '@/types/user'
import { Reducer } from 'redux'

const INITIAL_STATE: userDataProps = {}

const user: Reducer<userDataProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/SET_ADD_USER': {
      const { user } = action.payload

      return (state = user)
    }

    default: {
      return state
    }
  }
}

export default user
