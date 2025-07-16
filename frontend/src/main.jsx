import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// PrimeReact CSS imports
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


