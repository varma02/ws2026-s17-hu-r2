import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useAuth } from "../lib/AuthContext"
import api from "../lib/api"
import { useToast } from "../lib/Toaster"
import Input from "../components/Input"
import { Link } from "react-router"

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
  function handleDelete(event) {
    event.preventDefault()
    const slug = event.target.dataset.slug
    api.admin.locations.delete(auth.token, slug)
    .then(() => {
      toast("Location deleted successfully", "success")
      setLocations(locations.filter((l) => l.slug !== slug))
    })
    .catch(() => toast("Something went wrong while deleting the location", "error"))
  }
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
        <Link to="/locations/create"><Button label="Create Location" /></Link>
      </div>
      <table className="mt-4">
        <thead className="sticky -top-px bg-gray-100">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Created At</th>
            <th></th>
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
                  <Link to={`/locations/edit/${s.slug}`}><Button label="Edit" /></Link>
                  <Button label="Delete" onClick={handleDelete} data-slug={s.slug} />
                </td>
              </tr>
            ))
          ) : "Loading..."}
        </tbody>
      </table>
    </div>
  )
}