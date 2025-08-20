import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi"; // ✅ React Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/jobs", label: "Jobs" },
    { path: "/add-jobs", label: "Post a Job" },
    { path: "/my-jobs", label: "My Jobs" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b-2 border-black font-exo text-black">
      <div className="container mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <img src={logo} alt="logo image" />

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-black after:w-full"
                    : "text-gray-700 after:w-0"
                } nav-link hover:text-black`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-3">
          <NavLink
            to="/signin"
            className="relative px-4 py-2 flex items-center gap-2 text-lg border border-black overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
              <IoPersonCircleOutline />
              Sign In
            </span>
            <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out"></span>
          </NavLink>

          <NavLink
            to="/signup"
            className="relative px-4 py-2 flex items-center gap-2 text-lg border border-black overflow-hidden group bg-black text-white"
          >
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
              <IoPersonCircleOutline />
              Sign Up
            </span>
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out"></span>
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 transition-transform duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FiX className="w-7 h-7 transform rotate-0 transition-transform duration-300" />
          ) : (
            <FiMenu className="w-7 h-7 transform rotate-0 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md border-t border-black transform transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative block px-3 py-2 text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-black after:w-full"
                    : "text-gray-700 after:w-0"
                } nav-link hover:text-black`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-2 pt-3">
            <NavLink
              to="/signin"
              className="relative px-4 py-2 flex items-center justify-center gap-2 text-lg border border-black overflow-hidden group"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                <IoPersonCircleOutline />
                Sign In
              </span>
              <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out"></span>
            </NavLink>

            <NavLink
              to="/signup"
              className="relative px-4 py-2 flex items-center justify-center gap-2 text-lg border border-black overflow-hidden group bg-black text-white"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
                <IoPersonCircleOutline />
                Sign Up
              </span>
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out"></span>
            </NavLink>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
