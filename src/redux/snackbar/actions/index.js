import { ACTION_TYPES } from 'constants'

export const showSnackbar = (payload) => ({
  type: ACTION_TYPES.SHOW_SNACKBAR,
  payload,
})
export const hideSnackbar = (payload) => ({
  type: ACTION_TYPES.HIDE_SNACKBAR,
  payload,
})
