import { store } from './src/store'
import { Provider } from 'react-redux'
import App from './src/App'

// import './index.css'

// Actualización a React 18
import { createRoot } from 'react-dom/client'
const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
