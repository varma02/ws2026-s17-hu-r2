export default function Checkbox({ label, name, type, ...props }) {
  return (
    <label className="border-none outline-none space-x-2">
      <input className="scale-110"
      type="checkbox" name={name} {...props} />
      <span className="font-semibold select-none">{label}</span>
    </label>
  )
}