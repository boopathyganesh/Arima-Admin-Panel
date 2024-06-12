import { ACTION_TYPES } from 'constants'

export const setAuthentication = (payload) => ({
  type: ACTION_TYPES.AUTH,
  payload,
})

export const setMenuToggle = (payload) => ({
  type: ACTION_TYPES.MENU_TOGGLE,
  payload,
})
