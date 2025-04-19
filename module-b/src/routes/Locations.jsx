import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useAuth } from "../lib/AuthContext"
import api from "../lib/api"
import { useToast } from "../lib/Toaster"
import Input from "../components/Input"

export default function Locations() {
  const [locationFilter, setLocationFilter] = useState("")
  const [locations, setLocations] = useState([])
  const [machines, setMachines] = useState([])
  const auth = useAuth()
  const toast = useToast()
  useEffect(() => {
    api.admin.locations.list(auth.token)
    .then((res) => setLocations(res))
    .catch(() => toast("Something went wrong while loading locations", "error"))
    api.admin.machines(auth.token)
    .then((res) => setMachines(res))
    .catch(() => toast("Something went wrong while loading machines", "error"))
  }, [])
  return (
    <div className="max-w-6xl min-h-full lg:py-20 p-4 mx-auto">
      <h2 className="font-bold text-4xl">Machines</h2>
      <table className="mt-4">
        <thead>
          <tr>
            <th>Type</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {machines.length ? (
            machines.map((s) => (
              <tr key={s.id}>
                <td>{s.type}</td>
                <td>{s.size_in_kg} kg</td>
              </tr>
            ))
          ) : "Loading..."}
        </tbody>
      </table>
      <div className="flex justify-between items-end mt-14">
        <h2 className="font-bold text-4xl">Locations</h2>
        <form 
          onSubmit={(e) => e.preventDefault()}
          onInput={(e) => setLocationFilter(e.target.value)}
        >
          <Input label="Filter" name="filter" />
        </form>
        <Button label="Create Location" />
      </div>
      <table className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {locations.length ? (
            locations.filter(
              (l) => l.name.toLowerCase().replace(" ", "").includes(locationFilter.toLowerCase().replace(" ", ""))
                || l.city.toLowerCase().replace(" ", "").includes(locationFilter.toLowerCase().replace(" ", ""))
            ).map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.city}</td>
                <td>{s.created_at}</td>
                <td className="flex gap-2 justify-end">
                  <Button label="Edit" />
                  <Button label="Delete" />
                </td>
              </tr>
            ))
          ) : "Loading..."}
        </tbody>
      </table>
    </div>
  )
}