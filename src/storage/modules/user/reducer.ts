import { ResponseUserProps } from '@/types/user'
import { Reducer } from 'redux'

const INITIAL_STATE: ResponseUserProps = {
  created_at: '',
  customer_id: '',
  email: '',
  id: '',
  name: '',
  phone: '',
  updated_at: '',
}

const user: Reducer<ResponseUserProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/SAVE_USER': {
      const { user } = action.payload

      return (state = user)
    }

    case '@user/SIGN_OUT': {
      return (state = {
        created_at: '',
        customer_id: '',
        email: '',
        id: '',
        name: '',
        phone: '',
        updated_at: '',
      })
    }

    default: {
      return state
    }
  }
}

export default user
