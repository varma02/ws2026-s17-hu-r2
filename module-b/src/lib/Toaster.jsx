import { createContext, useContext, useEffect, useState } from "react";

const ToasterContext = createContext(() => {});

export default function Toaster({ children }) {
  const [toasts, setToasts] = useState([])
  function toast(message, type = "info") {
    setToasts(o => [ ...o, {message, type, ts: Date.now()} ])
  }
  useEffect(() => {
    const iid = setInterval(() => {
      setToasts(o => o.filter(t => Date.now() - t.ts < 5000))
    }, 500)
    return () => clearInterval(iid)
  }, [])
  return (
    <ToasterContext.Provider value={toast}>
      {children}
      <ul className="fixed bottom-2 left-2 flex flex-col">
        {toasts.map(t => (
          <li key={t.ts} className="border rounded bg-gray-100 flex">
            <span className={"border-r p-2 uppercase rounded-l " + (
              t.type == "info" ? "bg-sky-200" :
              t.type == "success" ? "bg-green-200" :
              t.type == "warning" ? "bg-yellow-200" :
              t.type == "error" ? "bg-red-200" : ""
            )}>{t.type}</span>
            <span className="p-2">{t.message}</span>
          </li>
        ))}
      </ul>
    </ToasterContext.Provider>
  )
}

export function useToast() {
  return useContext(ToasterContext)
}