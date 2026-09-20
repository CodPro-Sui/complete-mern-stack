import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterPage from './RouterPage.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <RouterPage />
    </BrowserRouter>
  </StrictMode>,
)
