import { Outlet, Link } from "react-router"

export default function Layout() {
  return (
  <div className="h-screen flex flex-col">
    <header className="bg-slate-900 text-white border-b-2 border-gray-800 md:px-10 px-4">
      <div className="flex justify-between items-center max-w-7xl h-20">
        <img src="images/sudsy-logo.svg" alt="Sudsy logo" />
        <nav>
          <ul className="flex gap-8">
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
        <Link to="/login" className="btn">Log In</Link>
      </div>
    </header>
    <Outlet />
    <footer className="bg-slate-900 border-b-2 border-gray-800 md:px-10 px-4">
      <div className="flex justify-between items-center max-w-7xl h-40 relative overflow-hidden">
        <div className="rounded-full border-[6rem] p-72 border-slate-800
        absolute top-5 left-1/2 -translate-x-1/2"></div>
        <img src="images/sudsy-logo.svg" alt="Sudsy logo" />
        <nav className="z-20">
          <ul className="flex gap-8 text-sky-500">
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
        <p className="text-gray-400">
          © SkillsIT 2025
        </p>
      </div>
    </footer>
  </div>
  )
}