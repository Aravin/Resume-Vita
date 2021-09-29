export default function Navbar() {

  return (
    <>
      <div className="navbar mb-2 shadow-lg bg-primary text-neutral-content">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">
            📃 ResumeTree
          </span>
        </div>
        <div className="flex-none hidden px-2 mx-2 lg:flex">
          <div className="flex items-stretch">
            <a className="btn btn-ghost btn-sm rounded-btn">
              🌟 Features
            </a>
            <a className="btn btn-ghost btn-sm rounded-btn">
              📖 Open Source
            </a>

            <a className="btn btn-ghost btn-sm rounded-btn">
              🔐 Login
            </a>
          </div>
        </div>
        <div className="flex-none flex lg:hidden">

          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {/* <div className="drawer-side">
            <label htmlFor="app-drawer" className="drawer-overlay"></label>
            <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
              <li>
                <a>Menu Item</a>
              </li>
              <li>
                <a>Menu Item</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  )
}