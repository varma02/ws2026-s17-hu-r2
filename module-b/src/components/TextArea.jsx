export default function TextArea({ label, name, type, ...props }) {
  return (
    <label className="border-none outline-none flex flex-col w-full">
      <span className="font-semibold">{label}</span>
      <textarea className="border rounded p-1 outline-none bg-gray-100 h-32 max-h-52"
      type={type} name={name} {...props} />
    </label>
  )
}