
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Translator", path: "/translator" },
  { label: "Dictionary", path: "/dictionary" },
  { label: "About", path: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const linkClasses = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-teal-50 text-teal-800"
        : "text-slate-600 hover:bg-slate-50 hover:text-teal-800"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Go to home page"
          className="flex shrink-0 items-center gap-3 text-left"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-lg font-bold text-white shadow-sm">
            T
          </span>

          <span>
            <span className="block text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Textora
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              Your everyday language toolkit
            </span>
          </span>
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={linkClasses}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Simple tagline — intentionally not a button */}
        <p className="hidden text-sm font-medium tracking-wide text-slate-500 lg:block">
          Write. Translate. Learn.
        </p>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg shadow-slate-900/5 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={linkClasses}
              >
                {item.label}
              </NavLink>
            ))}

            <p className="px-3 pt-3 text-xs text-slate-500">
              Write. Translate. Learn.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
