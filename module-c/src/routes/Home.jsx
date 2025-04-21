import React from "react"
import {Link} from "react-router"
import Locations from "../components/Locations"

export default function Home() {
  return (
    <div className="flex-1 bg-gray-900">
      <section className="py-32 flex flex-col items-center relative overflow-hidden" id="hero">
        <div className="-top-96 left-1/2 -translate-x-1/2 absolute p-96 
        bg-radial from-gray-600/20 to-transparent from-30% to-70%"></div>
        <div className="rounded-full border-[6rem] p-80 border-gray-800
        absolute bottom-32 -right-96 md:block hidden"></div>
        <div className="rounded-full border-[6rem] p-80 border-gray-800
        absolute top-80 -left-[35rem] md:block hidden"></div>
        <h1 className="text-6xl font-bold text-white text-center leading-20 z-10">
          Laundry Done Smarter
          <br />
          <span>with AI</span>
        </h1>
        <p className="my-10 text-xl md:max-w-2/3 text-center text-gray-200 z-10">
          Effortlessly manage your laundromat visits with our cutting-edge app and modernized system—now
          featuring AI-powered laundry recommendations!
        </p>
        <div className="flex gap-4 z-10">
          <Link to="/#locations" className="btn">Explore Locations</Link>
          <Link to="/#download" className="btn-secondary">Download the App</Link>
        </div>
      </section>

      <section className="flex flex-col bg-white items-center px-4 py-8">
        <h2 className="text-center mb-4">
          <span className="text-sky-500 uppercase font-bold text-xl">
            Where are we?
          </span>
          <br />
          <span className="text-4xl font-bold">
            Our Locations
          </span>
        </h2>
        <Locations />
      </section>

      
    </div>
  )
}