import React, { useState } from 'react';
import { AiFillGitlab } from "react-icons/ai";
import { BsBank2 } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // hamburger and close icons
import { Link, Links } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="text-white bg-[#000000] border-gray-200 sticky p-2 sm:p-0 top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl flex items-center gap-3 font-bold whitespace-nowrap uppercase">
            <BsBank2 /> Client Bank
          </span>
        </a>

        {/* Hamburger / Close button for mobile */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-gray-700 hover:text-white focus:outline-none"
        >
          {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>

        {/* Menu Items */}
        <div className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 font-medium">
            {/* <li><a href="#" className="block py-2 px-3 hover:text-yellow-400">Loans</a></li> */}
            <Link to={'/Profile'}><a href="#" className="block py-2 px-3 hover:text-yellow-400">Profile</a></Link>
            <Link to={'/Profile'}><a href="#" className="block py-2 px-3 hover:text-yellow-400">Balance</a></Link>
          </ul>
        </div>

        {/* Admin Badge (always visible) */}
        <div className="hidden md:flex">
          <Link to={'/admin'} className="bg-[#361463] font-bold rounded px-3 py-1 flex items-center gap-2">
            Admin <AiFillGitlab />
          </Link>
        </div>

        {/* Mobile Admin Badge */}
        {menuOpen && (
          <div className="block md:hidden mt-3">
            <Link to={'/admin'} className="bg-[#361463] cursor-pointer font-bold rounded px-3 py-1 flex items-center gap-2">
              Admin <AiFillGitlab />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
