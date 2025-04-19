import { Link, Outlet, useHref, useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const href = useHref()
  const navigate = useNavigate()
  const auth = useAuth()
  if (auth.user === null)
    navigate("/login")
  else return (<>
    <header className="h-24 border-b px-10 flex justify-between items-center bg-gray-100">
      <h1 className="text-2xl font-bold">Sudsy Admin</h1>
      <nav>
        <ul className="flex gap-8">
          <li className={"font-bold hover:text-gray-900 " + (href.startsWith("/subscriptions") ? "text-gray-900 border-b" : "text-gray-600")}>
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
          <li className={"font-bold hover:text-gray-900 " + (href.startsWith("/admins") ? "text-gray-900 border-b" : "text-gray-600")}>
            <Link to="/admins">Admins</Link>
          </li>
          <li className={"font-bold hover:text-gray-900 " + (href.startsWith("/locations") ? "text-gray-900 border-b" : "text-gray-600")}>
            <Link to="/locations">Locations</Link>
          </li>
        </ul>
      </nav>
      <div>
        <label className="space-x-8">
          <span className="font-semibold">Sudsy Admin</span>
          <Button label="Log Out" />
        </label>
      </div>
    </header>
    {auth ? <Outlet />
    : <p className="text-3xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded">
        Loading...
      </p>
    }
  </>)
}