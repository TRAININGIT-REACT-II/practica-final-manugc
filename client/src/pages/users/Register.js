import { useState, useContext } from 'react'
import UserSession from '../../contexts/user'
import { Redirect } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { Paper, Box, Stack, TextField, Button, Typography, Alert } from '@mui/material'

export default function UserRegister() {
  const [errorMensaje, setErrorMensaje] = useState('')
  const { formState, onChange } = useForm({
    username: '',
    password: '',
  })
  const { username, password } = formState

  const userSession = useContext(UserSession)

  const onSubmit = async (evt) => {
    evt.preventDefault()

    if (username === '' || password === '') {
      setErrorMensaje('Debe introducir un nombre de usuario y una contraseña')
      return
    }

    // Hacemos la petición a la api
    console.log('🚀 ~ file: register.js:33 ~ onSubmit ~ formState:', formState)
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })

    // Obtenemos el json de la respuesta
    const jsonResponse = await response.json()

    if (jsonResponse.error != null) {
      setErrorMensaje(jsonResponse.error)
    } else if (jsonResponse.token !== null && jsonResponse.token !== undefined && jsonResponse.token.length > 0) {
      // Almacenamos los datos en el localstorage
      localStorage.setItem('id', jsonResponse.id)
      localStorage.setItem('name', jsonResponse.username)
      localStorage.setItem('token', jsonResponse.token)
      userSession.setToken(true)

      // Guaramos los datos en el store
      dispatch(
        update({
          id: jsonResponse.id,
          name: jsonResponse.name,
          token: jsonResponse.token,
        })
      )
    }
  }

  return (
    <>
      {userSession.token && <Redirect to='/' />}
      <Paper
        elevation={3}
        sx={{
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          textAlign: 'center',
        }}
      >
        <Box
          component='form'
          direction='column'
          sx={{
            p: 5,
          }}
          // noValidate
          autoComplete='off'
        >
          <Typography variant='h5'>Formulario de registro</Typography>
          <Stack id='stack-controles' spacing={2}>
            <TextField
              name='username'
              required
              id='usuario'
              label='Usuario'
              placeholder='Introduce tu usuario'
              variant='standard'
              value={username}
              onChange={onChange}
              error={errorMensaje !== ''}
            />

            <TextField
              name='password'
              required
              id='password'
              label='Contraseña'
              placeholder='Introduce tu contraseña'
              type='password'
              variant='standard'
              value={password}
              onChange={onChange}
              error={errorMensaje !== ''}
            />

            {errorMensaje !== '' && <Alert severity='error'>{errorMensaje}</Alert>}

            <Button type='submit' variant='contained' onClick={onSubmit}>
              Enviar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  )
}
