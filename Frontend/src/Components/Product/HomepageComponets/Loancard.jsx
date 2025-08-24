import React from 'react';
import { Link } from 'react-router-dom';

export const Perfectplan = () => {
  const loanPlans = [
    {
      amount: '₹1,50,000',
      type: 'Personal Loan',
      tenure: '5 years',
      status: 'Approved',
    },
    {
      amount: '₹75,000',
      type: 'Balance & EMI',
      tenure: '₹3,500/month',
      status: 'Remaining balance: ₹75,000',
    },
    {
      amount: '₹20,00,000',
      type: 'Home Loan',
      tenure: '15 years',
      status: 'Pending Approval',
    },
  ];

  return (
    <div className="font-sans flex flex-col items-center mt-10 gap-6 px-4">
      {/* Heading */}
      <p className="w-full max-w-md text-center bg-[#3D2A57] text-sm sm:text-base tracking-tight text-white bg-opacity-20 rounded-2xl p-2 backdrop-blur-md shadow-lg">
        Welcome to Client Bank
      </p>
      <p className="text-3xl sm:text-5xl text-gray-300 font-semibold tracking-tight text-center font-poppins">
        Find Your Perfect Loan
      </p>
      <p className="text-gray-200 text-center max-w-lg font-light">
        Choose from our tailored loan plans to fit your needs — personal, home, and more.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 w-full max-w-6xl">
        {loanPlans.map((plan, idx) => (
          <div
            key={idx}
            className="w-72 h-80 bg-opacity-10 border border-white/20 backdrop-blur-lg rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]
                       transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer mx-auto"
            style={{
              animation: `fadeIn 0.5s ease forwards`,
              animationDelay: `${idx * 0.2}s`,
              opacity: 0,
            }}
          >
            <div  data-aos="zoom-in-up" className="card w-72 border-none text-gray-400 shadow-sm h-full">
              <div className="card-body">
                <span className="badge badge-xs badge-warning">Most Popular</span>
                <div className="flex justify-between">
                  <h2 className="text-lg sm:text-xl font-bold">{plan.type}</h2>
                  <span className="text-lg sm:text-xl">{plan.amount}</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs sm:text-sm">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{plan.status}</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{plan.tenure}</span>
                  </li>
                  <li className="opacity-50 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="line-through">Seamless cloud integration</span>
                  </li>
                  <li className="opacity-50 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="line-through">Real-time collaboration tools</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to={'/Profile'}  className="btn border-none bg-[#2D0456] btn-primary btn-block">Get loan</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
};
