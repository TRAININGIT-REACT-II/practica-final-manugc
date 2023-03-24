import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  token: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.token = action.payload.token
    },
    updateToken: (state, action) => {
      state.token = action.payload.token
    },
  },
})

// Exportamos los reducers
export const { update, updateToken } = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer
