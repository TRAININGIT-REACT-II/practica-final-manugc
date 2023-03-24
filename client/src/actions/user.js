import { userActionTypes } from './actions'

export const updateName = (name) => ({
  type: userActionTypes.UPDATE_NAME,
  name,
})

export const updateId = (Id) => ({
  type: userActionTypes.UPDATE_ID,
  Id,
})
