import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { lazy } from 'react'
import Toaster from './lib/Toaster'
import AuthContext from './lib/AuthContext'

const Login = lazy(() => import('./routes/Login'))
const Navbar = lazy(() => import('./components/Navbar'))
const Subscriptions = lazy(() => import('./routes/Subscriptions'))
const Admins = lazy(() => import('./routes/Admins'))
const Locations = lazy(() => import('./routes/Locations'))

const router = createBrowserRouter([
  {path: "/login", element: <Login />},
  {path: "/", element: <Navbar />, children: [
    {path: "/", element: <Subscriptions />},
    {path: "/admins", element: <Admins />},
    {path: "/locations", element: <Locations />},
  ]}
])

createRoot(document.getElementById('root')).render(
  <Toaster>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </Toaster>
)
