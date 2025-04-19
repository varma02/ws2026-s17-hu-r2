export default function Input({ label, name, type }) {
  return (
    <label className="border-none outline-none flex flex-col w-full">
      <span className="font-semibold">{label}</span>
      <input className="border rounded p-1 outline-none"
      type={type} name={name} />
    </label>
  )
}