import { useEffect, useState } from "react"
import api from "../lib/api"

export default function Locations() {
  const [pagination, setPagination] = useState({})
  const [locations, setLocations] = useState([])
  useEffect(() => {
    api.locations()
    .then((res) => {
      
    })
  }, [])
  return (
    <div className="flex flex-col gap-6 p-6 items-center max-w-7xl">
      <form className="flex gap-4">
        <label className="flex gap-4 border border-gray-400 rounded-full py-2 px-4">
          <img src="images/search-icon.svg" alt="Search" />
          <input type="search" placeholder="Search something here..."
          className="w-80 outline-none border-none" />
        </label>
        <button className="btn">
          Search
        </button>
      </form>
      <ul className="grid grid-cols-3 gap-4">
        {Array.from({length:6}).map((_,i) => (
          <li className="flex flex-col gap-4 p-6 border border-gray-400 rounded" key={i}>
            <h4 className="text-xl font-semibold">Buda Hills Sudsy</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, consequuntur?</p>
            <hr className="border-gray-400" />
            <p className="font-semibold">Available machines: 5</p>
            <hr className="border-gray-400" />
            <p>
              <span className="font-semibold">1124 Budapest</span>
              <br />
              <span>Hegyvidék tér 5</span>
            </p>
          </li>
        ))}
      </ul>
      <form className="flex gap-4 py-4">
        <button>
          <img src="images/chevron-left.svg" alt="Previous page" />
        </button>
        {Array.from({length:5}).map((_,i) => (
          <button key={i} className={`w-10 h-10 rounded-full font-semibold ${
            i == 1 ? "bg-sky-500 hover:opacity-75 text-white" : "hover:bg-gray-200"
          }`}>
            {i+1}
          </button>
        ))}
        <button>
          <img src="images/chevron-right.svg" alt="Next page" />
        </button>
      </form>
    </div>
  )
}