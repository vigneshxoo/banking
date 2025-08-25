// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { API_URL } from '../Api';
// import axios from 'axios';
// const Signup = ({ onAuthSuccess }) => {
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     Address: '',
//     phone: '',
//     transactionPin:"",
//     accountType: 'savings'
//   });
//   const [loading, setLoading] = useState(false);
//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     console.log(formData)

//     if (!formData.email.trim() || !formData.password.trim() || !formData.Address.trim() || !formData.phone.trim() ||! formData.transactionPin || !formData.fullName) {
//       setError("Please fill all fields");
//       return;
//     }
//     console.log(formData)
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.API_URL || API_URL}/create-account`,
//         {
//           email: formData.email.trim(),
//           password: formData.password.trim(),
//           Address: formData.Address.trim(),
//           phone: formData.phone.trim(),
//           fullName: formData.fullName.trim(),
//           transactionPin:formData.transactionPin.trim()
//         },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
//       if (response.status === 200) {
//         // Use 'token' or 'jwt' depending on your backend's key
//         localStorage.setItem("jwt", response.data.token || response.data.jwt);
//         // console.log(localStorage.setItem("jwt"))
//         if (onAuthSuccess) onAuthSuccess();
//         navigate("/home");
//       } else {
//         setError(response.data.error || response.data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       setError(
//         error?.response?.data?.error ||
//         error?.response?.data?.message ||
//         "Login failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-close toast


//   return (
//     <div className="min-h-screen flex items-center justify-center box2 p-4">

//       {/* Signup Card */}
//       <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-2xl">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">Mahtha Bank</h1>
//           <h2 className="text-2xl font-semibold text-white">Create Account</h2>
//           <p className="text-gray-200 text-sm mt-2">Join us and start your banking journey</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                 className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="transactionPin"
//                 value={formData.transactionPin}
//                 onChange={(e) => setFormData({ ...formData, transactionPin: e.target.value })}
//                 className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>


//           </div>

//           {/* Single Column */}

//           <div>
//             <label className="block text-sm font-medium text-gray-200 mb-1">Address</label>
//             <input
//               type="password"
//               placeholder="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//            <div>
//             <label className="block text-sm font-medium text-gray-200 mb-1">Address</label>
//             <input
//               type="password"
//               placeholder="Confirm your Address"
//               value={formData.Address}
//               onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
//               className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-200 mb-1">Account Type</label>
//             <select
//               value={formData.accountType}
//               onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
//               className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="savings">Savings Account</option>
//               <option value="current">Current Account</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 px-4 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           {error && <p className='text-red-500 text-sm mb-2 text-center'>{error}</p>}

//           <p className="text-gray-300">
//             Already have an account?
//             <Link to="/login" className="text-blue-400 hover:text-blue-300 ml-1 font-semibold">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../../Api';

const Signup = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    Address: '',
    phone: '',
    transactionPin: '',
    accountType: 'savings',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.Address.trim() ||
      !formData.phone.trim() ||
      !formData.transactionPin.trim() ||
      !formData.fullName.trim()
    ) {
      setError('Please fill all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.post(
        `/create-account`,
        {
          email: formData.email.trim(),
          password: formData.password.trim(),
          address: formData.Address.trim(),
          phone: formData.phone.trim(),
          fullName: formData.fullName.trim(),
          transactionPin: formData.transactionPin.trim(),
          accountType: formData.accountType,
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        localStorage.setItem('jwt', response.data.token || response.data.jwt);
        if (onAuthSuccess) onAuthSuccess();
        navigate('/home');
      } else {
        setError(response.data.error || response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center box2 p-4">
      {/* Signup Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mahtha Bank</h1>
          <h2 className="text-2xl font-semibold text-white">Create Account</h2>
          <p className="text-gray-200 text-sm mt-2">Join us and start your banking journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Transaction PIN</label>
              <input
                type="password"
                placeholder="Set a transaction PIN"
                value={formData.transactionPin}
                onChange={(e) => setFormData({ ...formData, transactionPin: e.target.value })}
                className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                value={formData.Address}
                onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
                className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Account Type</label>
              <select
                value={formData.accountType}
                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
          <p className="text-gray-300">
            Already have an account?
            <Link to="/login" className="text-blue-400 hover:text-blue-300 ml-1 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
