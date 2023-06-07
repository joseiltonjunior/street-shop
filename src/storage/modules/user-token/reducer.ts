import { Reducer } from 'redux'

interface tokenProps {
  token: string
}

const INITIAL_STATE: tokenProps = { token: '' }

const userToken: Reducer<tokenProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/SET_TOKEN': {
      const { token } = action.payload

      return (state = token)
    }

    case '@user/REMOVE_TOKEN': {
      return (state = { token: '' })
    }

    default: {
      return state
    }
  }
}

export default userToken
