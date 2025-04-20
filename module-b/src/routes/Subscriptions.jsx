import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useAuth } from "../lib/AuthContext"
import api from "../lib/api"
import { useToast } from "../lib/Toaster"

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState([])
  const auth = useAuth()
  const toast = useToast()
  useEffect(() => {
    api.admin.subscriptions.list(auth.token)
    .then((res) => setSubscriptions(res))
    .catch(() => toast("Something went wrong while loading subscriptions", "error"))
  }, [])
  function deleteSubscription(id) {
    if (!confirm("Are you sure you want to delete this location?")) return;
    api.admin.subscriptions.delete(auth.token, id)
    .then(() => {
      toast(`Subscriber ${id} deleted`, "success")
      setSubscriptions(o => o.filter((v) => v.id != id))
    })
    .catch(() => toast("Something went wrong while deleting the subscription", "error"))
  }
  return (
    <div className="max-w-6xl min-h-full lg:py-20 p-4 mx-auto">
      <h2 className="font-bold text-4xl">Subscriptions</h2>
      <table className="mt-4">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Display Email</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.length ? (
            subscriptions.map((s) => (
              <tr key={s.id}>
                <td>{s.nickname}</td>
                <td>{s.display_email}</td>
                <td>{s.email}</td>
                <td>{s.created_at}</td>
                <td>
                  <Button label="Delete" onClick={() => deleteSubscription(s.id)} />
                </td>
              </tr>
            ))
          ) : "Loading..."}
        </tbody>
      </table>
    </div>
  )
}