import { useHref, useParams } from "react-router"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import Checkbox from "../components/Checkbox"
import { useAuth } from "../lib/AuthContext"
import { useToast } from "../lib/Toaster"
import MultiSelect from "../components/MultiSelect"
import { useEffect, useState } from "react"
import api from "../lib/api"
import Button from "../components/Button"

export default function LocationCreate() {
  const params = useParams()
  const href = useHref()
  const auth = useAuth()
  const toast = useToast()
  const [machines, setMachines] = useState([])
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    api.admin.machines(auth.token)
    .then((res) => setMachines(res))
    .catch(() => toast("Something went wrong while loading machines", "error"))
    if (params.slug)
      api.locations(params.slug)
      .then((res) => setLocation(res))
      .catch(() => toast("Something went wrong while loading location", "error"))
  }, [])
  function handleSubmit(event) {
    setLoading(true)
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      name: formData.get("name"),
      description: formData.get("label"),
      opens_at: formData.get("opens_at"),
      closes_at: formData.get("closes_at"),
      postal_code: formData.get("postal_code"),
      city: formData.get("city"),
      address: formData.get("Address"),
      amenities: {
        accessible: formData.get("accessible") == "on",
        easy_parking: formData.get("easy_parking") == "on",
        lounge_area: formData.get("lounge_area") == "on",
        music: formData.get("music") == "on",
        wifi: formData.get("wifi") == "on",
      },
      machine_ids: JSON.parse(formData.get("machines"))
    }
    if (params.slug)
      api.admin.locations.update(auth.token, params.slug, data)
      .then(() => toast("Location updated successfully", "success"))
      .catch(() => toast("Something went wrong while updating the location", "error"))
      .finally(() => setLoading(false))
    else
      api.admin.locations.new(auth.token, data)
      .then(() => toast("Location created successfully", "success"))
      .catch(() => toast("Something went wrong while creating the location", "error"))
      .finally(() => setLoading(false))
  }
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl p-4 my-10 flex flex-col gap-6">
      <h2 className="font-semibold text-3xl capitalize">
        {href.split("/")[2]} Location
      </h2>
      <Input name="name" label="Name" defaultValue={location?.name || ""} />
      <TextArea name="label" label="Label" defaultValue={location?.description || ""} />
      <div className="flex gap-6">
        <Input name="opens_at" label="Opens At" type="time" defaultValue={location?.opens_at || ""} />
        <Input name="closes_at" label="Closes At" type="time" defaultValue={location?.closes_at || ""} />
      </div>
      <div className="flex gap-6">
        <Input name="postal_code" label="Postal Code" defaultValue={location?.location?.postal_code || ""} />
        <Input name="city" label="City" defaultValue={location?.location?.city || ""} />
        <Input name="Address" label="Address" defaultValue={location?.location?.address || ""} />
      </div>
      <div className="flex justify-between">
        <Checkbox name="accessible" label="Accessible" defaultValue={location?.amenities?.accessible || "off"} />
        <Checkbox name="easy_parking" label="Easy Parking" defaultValue={location?.amenities?.easy_parking || "off"} />
        <Checkbox name="lounge_area" label="Lounge Area" defaultValue={location?.amenities?.lounge_area || "off"} />
        <Checkbox name="music" label="Music" defaultValue={location?.amenities?.music || "off"} />
        <Checkbox name="wifi" label="Wi-Fi" defaultValue={location?.amenities?.wifi || "off"} />
      </div>
      <h4 className="font-semibold text-2xl">Machines</h4>
      <MultiSelect name="machines" defaultSelection={location?.machines?.map(v => v.machine_id) || []}
      options={machines.map(v => ({key: v.id, label: `${v.type} (${v.size_in_kg}kg)`}))} />
      <Button label="Submit" type="submit" disabled={loading} />
    </form>
  )
}