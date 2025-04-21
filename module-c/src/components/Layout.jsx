import { useState } from "react"
import { Outlet, Link } from "react-router"

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
  <div className="h-screen flex flex-col">
    <header className="bg-gray-900 text-white border-b-2 border-gray-800 md:px-10 px-4">
      <div className="flex justify-between items-center max-w-7xl h-20 mx-auto">
        <img src="images/sudsy-logo.svg" alt="Sudsy logo" />
        <div className={`md:contents flex flex-col gap-6 fixed top-0 transition-all 
        bg-gray-900 h-screen z-50 border-l-2 border-gray-800 px-4 py-6 w-5/6
        ${menuOpen ? "-right-px" : "-right-full"}`}>
          <div className="md:hidden flex justify-between items-center">
            <img src="images/sudsy-logo.svg" alt="Sudsy logo" />
            <label htmlFor="menu-toggle">
              <img src="images/close-icon.svg" alt="Close menu" />
            </label>
          </div>
          <hr className="border-1 border-gray-800 md:hidden" />
          <nav>
            <ul className="flex md:flex-row flex-col md:gap-8 gap-4">
              <li>
                <Link to="/#locations">Locations</Link>
              </li>
              <li>
                <Link to="/#download">Download</Link>
              </li>
              <li>
                <Link to="/#subscribe">Subscribe</Link>
              </li>
            </ul>
          </nav>
          <hr className="border-1 border-gray-800 md:hidden" />
          <Link to="/login" className="btn w-max">Log In</Link>
        </div>
        <label className="md:hidden block">
          <img src="images/hamburger-icon.svg" alt="Open menu" />
          <input type="checkbox" className="sr-only" id="menu-toggle"
          onInput={() => setMenuOpen(o => !o)} />
        </label>
      </div>
    </header>
    <Outlet />
    <footer className="bg-gray-900 border-b-2 border-gray-800 md:px-10 px-4">
      <div className="flex justify-between items-center md:mx-auto max-w-7xl md:h-40 md:relative md:overflow-hidden
      md:flex-row flex-col md:py-0 py-8 md:gap-0 gap-4">
        <div className="rounded-full border-[6rem] p-72 border-gray-800
        absolute top-5 left-1/2 -translate-x-1/2 md:block hidden"></div>
        <img src="images/sudsy-logo.svg" alt="Sudsy logo" />
        <hr className="border-gray-800 border-1 w-52 md:hidden" />
        <nav className="z-20">
          <ul className="flex md:flex-row flex-col items-center md:gap-8 gap-2  text-sky-500">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li className="text-gray-700 md:block hidden">|</li>
            <li>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li className="text-gray-700 md:block hidden">|</li>
            <li>
              <Link to="/cookie-policy">Cookie Policy</Link>
            </li>
          </ul>
        </nav>
        <hr className="border-gray-800 border-1 w-52 md:hidden" />
        <p className="text-gray-400">
          © SkillsIT 2025
        </p>
      </div>
    </footer>
  </div>
  )
}