import { useEffect, useState } from "react"
import api from "../lib/api"
import { useNavigate } from "react-router"

export default function Locations() {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 1,
    search: undefined
  })
  const [locations, setLocations] = useState([])
  function fetchLocations(page, search) {
    api.locations.list(page, search)
    .then((res) => {
      setLocations(res.data)
      setPagination({total_pages:res.total_pages, page:res.page, search})
    })
  }
  useEffect(() => fetchLocations(), [])
  function handleSearch(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const search = data.get("search")
    fetchLocations(1, search ? search : undefined)
  }
  function handlePage(p) {
    fetchLocations(p, pagination.search)
  }
  return (
    <div className="flex flex-col gap-6 p-6 items-center max-w-7xl">
      <form className="flex gap-4" onSubmit={handleSearch}>
        <label className="flex gap-4 border border-gray-400 rounded-full py-2 px-4">
          <img src="images/search-icon.svg" alt="Search" />
          <input type="search" name="search" placeholder="Search something here..."
          className="w-80 outline-none border-none" />
        </label>
        <button className="btn">
          Search
        </button>
      </form>
      <ul className="grid grid-cols-3 gap-4">
        {locations?.map((v) => (
          <li className="flex flex-col gap-4 p-6 border border-gray-400 rounded
          hover:border-sky-500 hover:bg-sky-100" key={v.id} onClick={() => navigate(`/location/${v.slug}`)}>
            <h4 className="text-xl font-semibold">{v.name}</h4>
            <p className="mb-auto" dangerouslySetInnerHTML={{__html:v.description}} />
            <hr className="border-gray-400" />
            <p className="font-semibold">Available machines: {v.machine_count}</p>
            <hr className="border-gray-400" />
            <p>
              <span className="font-semibold">{v.postal_code} {v.city}</span>
              <br />
              <span>{v.address}</span>
            </p>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 py-4">
        <button disabled={pagination.page == 1}
        onClick={() => handlePage(pagination.page-1)}>
          <img src="images/chevron-left.svg" alt="Previous page" />
        </button>
        {Array.from({length:pagination.total_pages}).map((_,i) => (
          <button key={i} className={`w-10 h-10 rounded-full font-semibold ${
            i+1 == pagination.page ? "bg-sky-500 hover:opacity-75 text-white" : "hover:bg-gray-200"
          }`} onClick={() => handlePage(i+1)}>
            {i+1}
          </button>
        ))}
        <button disabled={pagination.page == pagination.total_pages}
        onClick={() => handlePage(pagination.page+1)}>
          <img src="images/chevron-right.svg" alt="Next page" />
        </button>
      </div>
    </div>
  )
}