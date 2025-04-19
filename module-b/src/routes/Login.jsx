import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../lib/Toaster";
import { useNavigate } from "react-router";

export default function Login() {
  const auth = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  function handleSubmit(event) {
    setLoading(true)
    event.preventDefault()
    const formData = new FormData(event.target)
    const username = formData.get("username")
    const password = formData.get("password")
    auth.login(username, password)
    .then(() => navigate("/"))
    .catch((err) => toast("Invalid credentials", "error"))
    .finally(() => setLoading(false))
  }
  return <div className="flex justify-center items-center min-h-screen">
    <form onSubmit={handleSubmit}
    className="border rounded p-8 w-96 flex flex-col justify-center items-center gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <Input name="username" label="Username" type="text" />
      <Input name="password" label="Password" type="password" />
      <Button name="login" label="Log In" type="submit" disabled={loading} />
    </form>
  </div>
}