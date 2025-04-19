export default function Button({ label, name, type = "button", disabled, onClick = ()=>{}}) {
  return (
    <button className="font-bold rounded bg-gray-800 text-white w-max px-4 py-2
    hover:bg-gray-700 hover:cursor-pointer active:bg-gray-600 disabled:opacity-50"
    name={name} type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}