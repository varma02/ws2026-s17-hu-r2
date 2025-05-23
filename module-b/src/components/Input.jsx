export default function Input({ label, name, type, ...props }) {
  return (
    <label className="border-none outline-none flex flex-col w-full">
      <span className="font-semibold">{label}</span>
      <input className="border rounded p-1 outline-none bg-gray-100 min-w-0 w-full"
      type={type} name={name} {...props} />
    </label>
  )
}