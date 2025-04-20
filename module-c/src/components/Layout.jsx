import { Outlet } from "react-router"

export default function Layout() {
  return (<>
    navbar
    <Outlet />
    footer
  </>)
}