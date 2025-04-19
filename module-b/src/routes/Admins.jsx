import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useAuth } from "../lib/AuthContext"
import api from "../lib/api"
import { useToast } from "../lib/Toaster"

export default function Admins() {
  const [admins, setAdmins] = useState([])
  const auth = useAuth()
  const toast = useToast()
  useEffect(() => {
    api.admin.list(auth.token)
    .then((res) => setAdmins(res))
    .catch(() => toast("Something went wrong while loading admins", "error"))
  }, [])
  return (
    <div className="max-w-6xl min-h-full lg:py-20 p-4 mx-auto">
      <div className="flex justify-between">
        <h2 className="font-bold text-4xl">Admins</h2>
        <Button label="Create Admin" />
      </div>
      <table className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Last login at</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {admins.length ? (
            admins.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.username}</td>
                <td>{s.last_login_at || "N/A"}</td>
                <td>{s.created_at}</td>
              </tr>
            ))
          ) : "Loading..."}
        </tbody>
      </table>
    </div>
  )
}