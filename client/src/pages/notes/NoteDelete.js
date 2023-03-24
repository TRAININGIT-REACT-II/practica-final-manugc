import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'
// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/userSlice'

const NoteDelete = ({ id = '', onCloseCallback = () => {} }) => {
  const [open, setOpen] = useState(true)
  const userStore = useSelector(selectUser)

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    return () => {
      onCloseCallback()
    }
  }, [open])

  const onClickSi = async () => {
    // Realizamos la petición de borrado al api
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'api-token': userStore.token,
      },
    })
    console.log('🚀 ~ file: NoteDelete.js:29 ~ onClickSi ~ response:', response)
    if (response.ok) {
    }
    // Cerramos el dialog
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar borrado</DialogTitle>
      <DialogContent>
        <DialogContentText>¿Estás seguro que desear borrar la nota?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onClickSi} autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NoteDelete
