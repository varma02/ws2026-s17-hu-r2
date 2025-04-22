import React, { useState } from "react"
import {Link} from "react-router"
import Locations from "../components/Locations"
import api from "../lib/api"

export default function Home() {
  const [subSuccess, setSubSuccess] = useState(null)
  function handleSubscribe(event) {
    event.preventDefault()
    setSubSuccess(null)
    const data = new FormData(event.target)
    const email = data.get("email")
    api.subscribe(email)
    .then((res) => res.success && setSubSuccess(true))
    .catch(() => setSubSuccess(false))
  }
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

      <section className="flex flex-col bg-white items-center px-4 py-8" id="locations">
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

      <section className="flex gap-20 max-w-7xl mx-auto px-4 py-20" id="download">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-left mb-4">
            <span className="text-sky-500 uppercase font-bold text-xl">
              Download our app!
            </span>
            <br />
            <span className="text-4xl font-bold text-white">
              Your Laundry,
              <br />
              Simplified
            </span>
          </h2>
          <p className="text-gray-300 text-xl">
            Your perfect laundry experience is just a tap away—download the Sudsy app now on the App Store or Google Play.
          </p>
          <div className="flex gap-4">
            <img src="images/app-store-download.png" alt="App Store download" />
            <img src="images/google-play-download.png" alt="Google Play download" />
          </div>
        </div>
        <img className="rounded-xl border-4 border-gray-600 w-1/2" src="images/laundromat.png" alt="Image of a laundromat" />
      </section>
 
      <section className="bg-white py-10 px-4 flex flex-col items-center gap-4" id="subscribe">
        <h2 className="text-center mb-4">
          <span className="text-sky-500 uppercase font-bold text-xl">
            Newsletter
          </span>
          <br />
          <span className="text-4xl font-bold">
            Subscribe
          </span>
        </h2>
        <form className="contents" onSubmit={handleSubscribe}>
          <label className="flex gap-4 border border-gray-400 rounded-full py-2 px-4">
            {subSuccess === null ? (
              <img src="images/at.svg" alt="Email" />
            ) : subSuccess ? (
              <img src="images/check.svg" alt="Subscription successful" />
            ) : (
              <img src="images/close-icon.svg" alt="Subscription failed" />
            )}
            <input type="email" name="email" placeholder="E-mail address"
            className="w-80 outline-none border-none" />
          </label>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}