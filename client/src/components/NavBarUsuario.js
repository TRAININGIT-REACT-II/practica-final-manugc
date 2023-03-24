import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
import UserSession from '../contexts/user'

const NavBarUsuario = () => {
  const userSession = useContext(UserSession)
  const history = useHistory()

  const onIniciarSesion = (evt) => {
    evt.preventDefault()
    history.push('/users/login')
  }

  const onNuevoUsuario = (evt) => {
    evt.preventDefault()
    history.push('/users/register')
  }

  return (
    <>
      <Stack direction={'row'} spacing={2}>
        <Button variant='contained' onClick={onIniciarSesion}>
          Iniciar sesión
        </Button>
        <Button variant='contained' onClick={onNuevoUsuario}>
          Nuevo usuario
        </Button>
      </Stack>
    </>
  )
}

export default NavBarUsuario
