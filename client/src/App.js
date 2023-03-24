import { useState, useContext, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import { Typography, Link } from '@mui/material'

import UserSession from './contexts/user'

// Vistas
import Home from './pages/home'
import Login from './pages/users/Login'
import UserRegister from './pages/users/Register'
import NotesRouter from './pages/notes/NotesRouter'

// Redux
import { useSelector, useDispatch } from 'react-redux'
// Reducers
import { update } from './reducers/userSlice'

const ColorModeContext = createContext({ toggleColorMode: () => {} })

// Componente principal de la aplicación.
const App = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [token, setToken] = useState('')
  const setTokenAlmacenado = (token) => {
    setToken(token)
  }
  const userStore = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const updateUserStoreFromLocalStorage = () => {
    setId(localStorage.getItem('id') || '')
    setName(localStorage.getItem('name') || '')
    setTokenAlmacenado(localStorage.getItem('token') || '')

    // Guardamos los datos del usuario en el store
    dispatch(
      update({
        id,
        name,
        token,
      })
    )
  }

  useEffect(() => {
    // Cargar el localStorage y actualizar el store
    updateUserStoreFromLocalStorage()
  }, [token])

  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  // TODO https://mui.com/material-ui/react-paper/
  const darkTheme = createTheme({ palette: { mode: 'dark' } })
  const lightTheme = createTheme({ palette: { mode: 'light' } })

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <main>
          <Link href='/' underline='none'>
            <Typography variant='h3' component='h1'>
              Training Notes App
            </Typography>
          </Link>
          <UserSession.Provider value={{ token, setToken }}>
            {/* Definimos las rutas de la aplicación */}
            <Router>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/users/login'>
                <Login />
              </Route>
              <Route path='/users/register'>
                <UserRegister />
              </Route>
              <Route path='/notes'>
                <NotesRouter />
              </Route>
            </Router>
          </UserSession.Provider>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
