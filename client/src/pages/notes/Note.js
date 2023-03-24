import { useState } from 'react'
import { Box, Button, Container, Paper, Stack, TextField, Alert } from '@mui/material'
import { useHistory } from 'react-router-dom'
import useForm from '../../hooks/useForm'

// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/userSlice'

const Note = () => {
  const userStore = useSelector(selectUser)
  const history = useHistory()

  const [errorMensaje, setErrorMensaje] = useState('')
  const { formState, onChange } = useForm({
    title: '',
    content: '',
  })
  const { title, content, author } = formState

  const onSubmit = async (evt) => {
    evt.preventDefault()

    if (title === '' || content === '') {
      setErrorMensaje('Faltan datos por rellenar')
      return
    }

    // Añadimos el id del autor
    const formulario = {
      ...formState,
      author: userStore.id,
      token: userStore.token,
    }

    // Hacemos la petición a la api
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-token': userStore.token,
      },
      body: JSON.stringify(formulario),
    })

    // Obtenemos el json de la respuesta
    const jsonResponse = await response.json()

    if (response.status != 200 && (jsonResponse.error != null || jsonResponse.error == undefined)) {
      setErrorMensaje(jsonResponse.error)
    } else {
      // Si la nota fue creada con éxito, volvemos a la página de listado
      history.push('/notes')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Box component='form' noValidate onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Stack direction={'column'} spacing={2}>
              <TextField
                autoFocus
                id='title'
                name='title'
                required
                variant='outlined'
                label='Título'
                value={title}
                onChange={onChange}
                error={errorMensaje !== ''}
                inputProps={{
                  'aria-label': 'tittle',
                }}
              />
              <TextField
                id='content'
                name='content'
                required
                variant='outlined'
                label='Contenido'
                multiline
                rows={4}
                value={content}
                onChange={onChange}
                error={errorMensaje !== ''}
                inputProps={{
                  'aria-label': 'content',
                }}
              />
            </Stack>

            {errorMensaje !== '' && <Alert severity='error'>{errorMensaje}</Alert>}

            <Stack>
              <Button type='submit' variant='contained'>
                Crear
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default Note
