import { configureStore } from '@reduxjs/toolkit'

// Importamos los reducers
import userReducers from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducers,
  },
})
