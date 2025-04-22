import { createRoot } from 'react-dom/client'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'

import Navbar from './components/Layout'
const Home = lazy(() => import('./routes/Home'))
const NotFound = lazy(() => import('./routes/NotFound'))
const ComingSoon = lazy(() => import('./routes/ComingSoon'))

const router = createBrowserRouter([
  {element: <Navbar />, errorElement: <NotFound />, children: [
    {path: '/', element: <Home />},
    {path: '/login', element: <ComingSoon />},
    {path: '/privacy', element: <ComingSoon />},
    {path: '/terms-and-conditions', element: <ComingSoon />},
    {path: '/cookie-policy', element: <ComingSoon />},
  ]}
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
