import { ACTION_TYPES } from 'constants'
import _ from 'lodash'

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') || false,
  token: localStorage.getItem('token') || null,
  menuToggle: false,
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH: {
      // Setting values in localstorage
      if (!_.isEmpty(action?.payload?.access_token)) {
        localStorage.setItem(
          'isAuthenticated',
          !_.isEmpty(action?.payload?.access_token) ? true : false
        )
        localStorage.setItem('token', action.payload?.access_token)
      }
      return {
        ...state,
        // Setting values in redux
        isAuthenticated: !_.isEmpty(action?.payload?.access_token)
          ? true
          : false,
        token: action.payload?.access_token,
      }
    }
    case ACTION_TYPES.MENU_TOGGLE: {
      return {
        ...state,
        menuToggle: action.payload,
      }
    }
    default:
      return state
  }
}

export default AuthReducer
