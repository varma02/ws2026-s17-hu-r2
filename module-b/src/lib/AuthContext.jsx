import { createContext, useContext, useEffect, useState } from "react";
import api from "./api"

const ThisContext = createContext({});

export default function AuthContext({ children }) {
  const [user, setUser] = useState(undefined)
  const [token, setToken] = useState(undefined)
  useEffect(() => {
    const ls_uid = localStorage.getItem("sudsy-uid")
    const ls_token = localStorage.getItem("sudsy-token")
    api.admin.list(ls_token).then(res => {
      setToken(ls_token)
      setUser(res.data.filter(v => v.id == ls_uid))
    }).catch(() => {
      localStorage.removeItem("sudsy-uid")
      localStorage.removeItem("sudsy-token")
      setUser(null)
      setToken(null)
    })
  }, [])
  async function login(username, password) {
    const res = await api.admin.login(username, password)
    if (!res.token) throw new Error(res.message || "Login failed")
    localStorage.setItem("sudsy-uid", res.admin.id)
    localStorage.setItem("sudsy-token", res.token)
    setUser(res.admin)
    setToken(res.token)
  }
  async function logout() {
    const res = await api.admin.logout(token)
    if (!res.success) throw new Error(res.message || "Logout failed")
    localStorage.removeItem("sudsy-uid")
    localStorage.removeItem("sudsy-token")
    setUser(null)
    setToken(null)
  }
  return (
    <ThisContext.Provider value={{ user, token, login, logout }}>
      {children}
    </ThisContext.Provider>
  )
}

export function useAuth() {
  return useContext(ThisContext)
}