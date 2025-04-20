import { useEffect, useState } from "react"

export default function MultiSelect({ options, defaultSelection = [], name }) {
  const [selected, setSelected] = useState(defaultSelection)
  useEffect(() => {
    setSelected(defaultSelection)
  }, [defaultSelection])
  function handleSelect(event) {
    event.preventDefault()
    const key = event.target.value
    setSelected(o => [...o, key])
    event.target.value = ''
  }
  function handleRemove(event) {
    event.preventDefault()
    const index = event.target.dataset.index
    setSelected(o => o.filter((_, i) => i != index))
  }
  return (
    <label className="border bg-gray-100 p-1 rounded flex gap-2 items-center flex-wrap">
      <input type="text" className="sr-only" name={name} defaultValue={JSON.stringify(selected)} />
      {selected.map((s, i) => (
        <button key={i} data-index={i} onClick={handleRemove}
        className="border rounded-full px-2">{options.filter(o => o.key == s)[0].label}</button>
      ))}
      <select className="border-0 outline-none flex-1" onInput={handleSelect}>
        <option value="" disabled selected>Select Machine</option>
        {options.map((o) => (
          <option key={o.key} value={o.key}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}