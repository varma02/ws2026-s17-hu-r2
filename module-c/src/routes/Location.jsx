import { useEffect, useState } from "react"
import api from "../lib/api"
import { useParams } from "react-router"

export default function Location() {
  const {slug} = useParams()
  const [location, setLocation] = useState()
  useEffect(() => {
    api.locations.get(slug)
    .then(setLocation)
  }, [])
  return (
    <article className="flex-1 py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 w-full">
        <h2 className="text-center mb-4">
          <span className="text-sky-500 uppercase font-bold text-xl">
            {location?.opens_at} - {location?.closes_at}
          </span>
          <br />
          <span className="text-4xl font-bold">
            {location?.name}
          </span>
        </h2>
        <p dangerouslySetInnerHTML={{__html: location?.description}} />
        <hr className="w-full border border-gray-200" />
        <p>
          <span className="font-bold">{location?.location?.postal_code} {location?.location?.city},</span>
          &nbsp;
          <span>{location?.location?.address}</span>
        </p>
        <hr className="w-full border border-gray-200" />
        <h3 className="text-2xl font-bold">Amenities and Extra services</h3>
        <ul className="flex flex-wrap gap-6">
          {Object.entries(location?.amenities || {}).filter((v) => v[1]).map((v, i) => (
            <li className="rounded-full p-4 px-6 font-semibold bg-sky-100 capitalize" key={i}>
              {v[0].replace(/_/g, ' ')}
            </li>
          ))}
        </ul>
        <hr className="w-full border border-gray-200" />
        <h3 className="text-2xl font-bold">Machines</h3>
        <ul className="flex flex-wrap gap-6 justify-center">
          {location?.machines?.map((v, i) => (
            <li className="rounded-full p-4 px-6 font-semibold bg-sky-100" key={i}>
              {v.type} ({v.size_in_kg}kg)
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}