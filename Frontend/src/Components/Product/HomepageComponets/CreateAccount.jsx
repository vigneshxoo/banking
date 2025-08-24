import React from 'react';
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiHeadphones } from "react-icons/ci";
import { MdOutlineAddLocationAlt } from "react-icons/md";

export const CreateAccount = () => {
  const contact = [
    {
      name: "Email Address",
      icon: <MdMarkEmailRead size={40} className='text-3xl bg-blue-500 rounded-full p-1 text-black' />,
      details: "vigneshxoo@gmail.com"
    },
    {
      name: "Phone Number",
      icon: <FaPhoneVolume size={40} className='text-3xl bg-red-500 rounded-full p-1 text-black' />,
      details: "+1 (123) 456-7890"
    },
    {
      name: "Bank Location",
      icon: <MdOutlineAddLocationAlt size={40} className='text-3xl bg-green-300 rounded-full p-1 text-black' />,
      details: "123 Main St, Anytown, USA"
    },
    {
      name: "Support",
      icon: <CiHeadphones size={40} className='text-3xl bg-pink-400 rounded-full p-1 text-black' />,
      details: "support@example.com"
    }
  ];

  return (
    <div className="w-full min-h-screen box3 flex flex-col lg:flex-row items-center justify-center gap-20 p-10">

      {/* Glass Effect Form */}
      <div data-aos="fade-up"
        data-aos-duration="3000" className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <form className="space-y-5">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-gray-200 text-sm">
              Fill in the details below to create a new account.
            </p>
          </div>

          {/* Two-column fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-200">Full Name</label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Email Address</label>
              <input
                type="email"
                className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Account Type</label>
            <select
              defaultValue="Account type"
              className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option disabled>Account type</option>
              <option>Savings</option>
              <option>Current</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Contact Section */}
      <div data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500" className="w-full max-w-lg text-left">
        <span className='text-white font-medium'>Contact us</span>
        <h1 className='text-4xl font-bold text-gray-100 mt-1'>Get in touch!</h1>
        <p className='text-gray-400 mt-3'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sapiente,
          debitis soluta odio aspernatur ratione. Consequuntur consequatur quasi possimus delectus.
        </p>

        <div className="mt-6 space-y-4">
          {contact.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div>{item.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                <p className="text-gray-300">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
