import { useContext } from 'react'
import { Stack } from '@mui/system'

import UserSession from '../contexts/user'
import NavBarUsuario from './NavBarUsuario'
import NavBarAutenticado from './NavBarAutenticado'

const NavBar = () => {
  const userSession = useContext(UserSession)

  return (
    <>
      {(userSession.token == '' || userSession.token == null) && <NavBarUsuario />}
      {userSession.token != '' && <NavBarAutenticado />}
    </>
  )
}

export default NavBar
