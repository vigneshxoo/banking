import React from "react";

export const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900">
      {/* Top Footer */}
      <footer className="footer sm:footer-horizontal  text-white p-10 max-w-screen-xl mx-auto rounded-t-lg shadow-lg">
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-2">Services</h6>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Branding</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Design</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Marketing</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-2">Company</h6>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">About us</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Contact</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Jobs</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-2">Legal</h6>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Terms of use</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Privacy policy</a>
          <a href="#" className="link link-hover hover:text-blue-400 transition duration-300">Cookie policy</a>
        </nav>
      </footer>

      {/* Bottom Footer */}
      <footer className="footer bg-black text-gray-400 border-t border-gray-700 px-10 py-4 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between rounded-b-lg shadow-inner">
        <aside className="flex items-center gap-3">
          {/* Logo SVG */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="fill-current text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M22.672 15.226l-2.432.811 ..."></path>
          </svg>
          <p className="text-sm">
            vignesh private Ltd. &copy; {new Date().getFullYear()}<br />
            Providing reliable tech since 1992
          </p>
        </aside>

        {/* Social Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition duration-300 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M24 4.557c-.883..."></path>
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-red-500 transition duration-300 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M19.615 3.184c-3.604..."></path>
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition duration-300 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642..."></path>
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
};
