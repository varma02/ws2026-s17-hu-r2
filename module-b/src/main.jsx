import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { lazy } from 'react'
import Toaster from './lib/Toaster'
import AuthContext from './lib/AuthContext'

const Login = lazy(() => import('./routes/Login'))
const Navbar = lazy(() => import('./components/Navbar'))

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Navbar />, children: [

  ]}
])

createRoot(document.getElementById('root')).render(
  <Toaster>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </Toaster>
)
