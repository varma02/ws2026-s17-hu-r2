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
const AdminCreate = lazy(() => import('./routes/AdminCreate'))
const Locations = lazy(() => import('./routes/Locations'))
const LocationCreate = lazy(() => import('./routes/LocationCreate'))

const router = createBrowserRouter([
  {path: "/login", element: <Login />},
  {path: "/", element: <Navbar />, children: [
    {path: "/", element: <Subscriptions />},
    {path: "/admins", element: <Admins />},
    {path: "/admins/create", element: <AdminCreate />},
    {path: "/locations", element: <Locations />},
    {path: "/locations/create", element: <LocationCreate />},
    {path: "/locations/edit/:slug", element: <LocationCreate />},
  ]}
])

createRoot(document.getElementById('root')).render(
  <Toaster>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </Toaster>
)
