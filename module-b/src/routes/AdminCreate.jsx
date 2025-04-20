import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import api from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../lib/Toaster";

export default function CreateAdmin() {
  const auth = useAuth()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  function handleSubmit(event) {
    setLoading(true)
    event.preventDefault()
    const data = new FormData(event.target)
    api.admin.register(
      auth.token, data.get("name"), data.get("username"), data.get("password")
    ).then(() => toast("Admin created successfully", "success"))
    .catch(() => toast("Something went wrong while creating admin", "error"))
    .finally(() => {
      event.target.reset()
      setLoading(false)
    })
  }
  return (
    <form className="m-auto mt-10 w-96 p-6 border rounded flex flex-col gap-4 items-center bg-gray-100"
    onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold">Create an admin</h2>
      <Input label="Name" name="name" />
      <Input label="Username" name="username" />
      <Input label="Password" name="password" type="password" />
      <Button label="Create" type="submit" disabled={loading} />
    </form>
  )
}