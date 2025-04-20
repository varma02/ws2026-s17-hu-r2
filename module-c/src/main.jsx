import { createRoot } from 'react-dom/client'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'

import Navbar from './components/Layout'
const Home = lazy(() => import('./routes/Home'))

const router = createBrowserRouter([
  {element: <Navbar />, children: [
    {path: '/', element: <Home />}
  ]}
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
