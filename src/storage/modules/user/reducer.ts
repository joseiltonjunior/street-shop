import { userProps } from '@/types/user'
import { Reducer } from 'redux'

const INITIAL_STATE: userProps = {}

const user: Reducer<userProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/SET_ADD_USER': {
      const { id } = action.payload

      return (state = id)
    }

    default: {
      return state
    }
  }
}

export default user
