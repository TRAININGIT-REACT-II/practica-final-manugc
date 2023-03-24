import { useContext } from 'react'
import { Button, Stack } from '@mui/material'
import UserSession from '../contexts/user'
import { useHistory } from 'react-router-dom'

const NavBarAutenticado = () => {
  const userSession = useContext(UserSession)
  const history = useHistory()

  const onCerrarSesion = (evt) => {
    evt.preventDefault()
    localStorage.clear()
    userSession.setToken('')
    history.push('/')
  }

  const onNotas = () => {
    history.push('/notes')
  }

  return (
    <Stack direction={'row'} spacing={2}>
      <Button variant='contained' onClick={onNotas}>
        Notas
      </Button>
      <Button variant='contained' onClick={onCerrarSesion}>
        Cerrar sesión
      </Button>
    </Stack>
  )
}

export default NavBarAutenticado
