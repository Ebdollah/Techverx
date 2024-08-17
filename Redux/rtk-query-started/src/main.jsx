import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, { router } from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import { RouterProvider } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
