import { useContext } from 'react'
import NavBar from '../components/NavBar'
import { Grid, Typography } from '@mui/material'
import UserSession from '../contexts/user'

const Home = () => {
  const userSession = useContext(UserSession)

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
      {(userSession.token === '' || userSession.token == null) && (
        <Typography variant='h4'>Bienvenido a la práctica final de Manuel José Ruíz Domínguez</Typography>
      )}
      <NavBar />
    </Grid>
  )
}

export default Home
