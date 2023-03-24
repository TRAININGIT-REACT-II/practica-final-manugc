import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material'
import NoteIcon from '@mui/icons-material/Note'
import DeleteIcon from '@mui/icons-material/Delete'

import { useContext, useEffect, useState } from 'react'
import UserSession from '../../contexts/user'
import { Link, useHistory } from 'react-router-dom'

// Redux
import { selectUser } from '../../reducers/userSlice'
import { useSelector } from 'react-redux'
import NoteDelete from './NoteDelete'

const NotesList = () => {
  const [notes, setNotes] = useState([])
  const [openNoteDelete, setOpenNoteDelete] = useState(false)
  const [note, setNote] = useState({})
  const userSession = useContext(UserSession)
  const history = useHistory()
  const userStore = useSelector(selectUser)

  const getNotes = async () => {
    if (userStore.token) {
      const response = await fetch('/api/notes', {
        headers: {
          'api-token': userStore.token,
          user: userStore.id,
        },
      })

      if (response.ok) {
        const notes = await response.json()
        setNotes(notes)
      }
    }
  }

  useEffect(() => {
    getNotes()
    return () => {}
  }, [userStore, openNoteDelete])

  const onCerrarSesion = (evt) => {
    evt.preventDefault()
    localStorage.clear()
    userSession.setToken('')
    history.push('/')
  }

  const onClick = (evt, key) => {
    history.push(`/notes/edit/${key}`)
  }

  const onDelete = (evt, key) => {
    setOpenNoteDelete(true)
    setNote(key)
  }

  return (
    <>
      {openNoteDelete && (
        <NoteDelete
          id={note}
          onCloseCallback={() => {
            setOpenNoteDelete(false)
          }}
        />
      )}
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Stack direction={'row'} spacing={2}>
          <Button variant='contained' component={Link} to='/notes/add'>
            Nueva
          </Button>
          <Button variant='contained' onClick={onCerrarSesion}>
            Cerrar sesión
          </Button>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <List dense>
              {notes.map((note, index) => {
                return (
                  <ListItem
                    key={note.id}
                    secondaryAction={
                      <IconButton edge='end' aria-label='delete' onClick={(evt) => onDelete(evt, note.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    divider={index + 1 < notes.length}
                  >
                    <ListItemButton onClick={(evt) => onClick(evt, note.id)}>
                      <ListItemIcon>
                        <NoteIcon />
                      </ListItemIcon>
                      <ListItemText primary={note.title} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default NotesList
