import { createRoot } from 'react-dom/client'
import {PrimeReactProvider } from '@primereact/core'
import Aura from '@primeuix/themes/aura'
import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'
import App from './components/App.jsx'
import './styles.css'
import {PRIMEUI_LICENSE} from './utils/chaves.js'

const primereact = {
  theme: {
    preset: Aura
  },
  license: PRIMEUI_LICENSE
}

createRoot(document.getElementById('root')).render(
  <PrimeReactProvider {...primereact}>
    <App />
  </PrimeReactProvider>
)
