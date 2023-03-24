import { createContext } from 'react'

const UserSession = createContext({
  token: '',
  setToken: () => {},
})

export default UserSession
