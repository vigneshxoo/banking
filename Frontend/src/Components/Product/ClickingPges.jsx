import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Profiles } from "../clickpages/Profiles";
import { ProfileWithLoan } from "../clickpages/ApplyLoan";
import { Deposit } from "../clickpages/Deposit";
import { TransferFunds } from "../clickpages/TransectionFunds";
import { Withdraw } from "../clickpages/Withdraw";
import api from "../../Api";

export const Profile = ({ logout }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState([]);  // Accounts data
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    api
      .get(`/dash`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data.Accounts || []);
        setLoading(false);
      })
      .catch(() => {
        setProfile([]); // ✅ fixed typo here
        setLoading(false);
      });
  }, [update]);
  const accounts = Array.isArray(profile) ? profile : [profile];
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profiles userdata={accounts} loadings={loading} />;

      case "applyloan": // Apply Loan
        return <ProfileWithLoan setUpdate={setUpdate} userdata={accounts} />;

      case "deposit":
        return <Deposit setUpdate={setUpdate} userdata={accounts} />;

      case "transfer":
        return <TransferFunds setUpdate={setUpdate} userdata={accounts} />;

      case "withdraw":
        return (
          <Withdraw userdata={accounts} setUpdate={setUpdate} />
        )
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between p-4 box2 text-white shadow">
        <h1 className="text-lg sm:text-2xl font-bold">Mahtha Bank</h1>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden bg-gray-700 px-3 py-2 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Logout */}
        <button
          onClick={() => logout()}
          className="hidden md:inline-block cursor-pointer text-sm md:text-base font-bold uppercase bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white"
        >
          Log out
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`box2 text-white w-56 p-4 space-y-3 flex-shrink-0 fixed md:static h-full md:h-auto transform transition-transform duration-300 z-20
          ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <button
            onClick={() => {
              setActiveTab("profile");
              setMenuOpen(false);
            }}
            className="p-3 rounded hover:bg-gray-700 w-full text-left"
          >
            Profile
          </button>
          <button
            onClick={() => {
              setActiveTab("applyloan");
              setMenuOpen(false);
            }}
            className="p-3 rounded hover:bg-gray-700 w-full text-left"
          >
            Apply Loan
          </button>
          <button
            onClick={() => {
              setActiveTab("deposit");
              setMenuOpen(false);
            }}
            className="p-3 rounded hover:bg-gray-700 w-full text-left"
          >
            Deposit
          </button>
          <button
            onClick={() => {
              setActiveTab("transfer");
              setMenuOpen(false);
            }}
            className="p-3 rounded hover:bg-gray-700 w-full text-left"
          >
            Transfer
          </button>
          <button
            onClick={() => {
              setActiveTab("withdraw");
              setMenuOpen(false);
            }}
            className="p-3 rounded hover:bg-gray-700 w-full text-left"
          >
            Withdraw
          </button>
          <Link
          to={'/'}
         
            className="p-3 rounded hover:bg-gray-700 w-full text-left"
          >
            Back
          </Link>
          {/* Mobile Logout */}
          <button className="mt-4 md:hidden bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white w-full">
            Log out
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#0E141B] p-4 sm:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// /* Reusable FormCard */
// const FormCard = ({ title, buttonLabel, fields }) => (
//   <div className="box2 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl">
//     <form>
//       <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {fields.map((f, i) =>
//           f.type === "select" ? (
//             <select
//               key={i}
//               className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
//             >
//               {f.options.map((o, idx) => (
//                 <option key={idx}>{o}</option>
//               ))}
//             </select>
//           ) : (
//             <input
//               key={i}
//               type={f.type}
//               placeholder={f.placeholder}
//               className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
//             />
//           )
//         )}
//       </div>
//       <button className="mt-6 w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold">
//         {buttonLabel}
//       </button>
//     </form>
//   </div>
// );

// import React, { useState } from "react";
// import { FaUserPlus } from "react-icons/fa";

// // Simple reusable toast
// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
//     <div className="bg-green-600 text-white font-semibold py-2 px-8 rounded shadow-lg flex gap-3 items-center animate-bounce">
//       <span>✅</span> {message}
//       <button className="ml-4 text-xl opacity-70 hover:opacity-100" onClick={onClose}>×</button>
//     </div>
//   </div>
// );

// export const Profile = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "" });
//   const [loading, setLoading] = useState(false);

//   // Example user and transactions
//   const user = {
//     name: "John Doe",
//     accountNumber: "XXXX-XXXX-5678",
//     balance: 25430.75,
//     email: "john.doe@example.com",
//     phone: "+1 234 567 890",
//     address: "Bangalore, Shivaji Nagar, 1/22 Ajith Street",
//   };

//   const transactions = [
//     { id: 1, date: "2025-08-10", type: "Credit", amount: 1500, description: "Salary" },
//     { id: 2, date: "2025-08-08", type: "Debit", amount: 200, description: "Electricity Bill" },
//     { id: 3, date: "2025-08-05", type: "Debit", amount: 450, description: "Grocery Shopping" },
//     { id: 4, date: "2025-08-02", type: "Credit", amount: 500, description: "Refund" },
//   ];

//   // ---- "API" function placeholder ----
//   const fakeApi = (payload, type) =>
//     new Promise(resolve =>
//       setTimeout(() => resolve({ status: "ok", type }), 1400)
//     );

//   // ---- all forms submit handler ----
//   const handleFormSubmit = async (e, type) => {
//     e.preventDefault();
//     setLoading(true);
//     // Normally here you would GET/POST to your API!
//     // e.g. await axios.post('...', { ...form data... });
//     const { status } = await fakeApi({}, type);
//     setLoading(false);
//     if (status === "ok") {
//       let msg = "Success!";
//       if (type === "loan") msg = "Loan request submitted!";
//       if (type === "deposit") msg = "Amount credited successfully!";
//       if (type === "transfer") msg = "Money transferred!";
//       if (type === "withdraw") msg = "Amount withdrawn!";
//       setToast({ show: true, message: msg });
//       // optionally, clear form fields here with ref or controlled inputs
//     }
//   };

//   // auto-close the toast
//   React.useEffect(() => {
//     if (toast.show) {
//       const timer = setTimeout(() => setToast({ show: false, message: "" }), 2200);
//       return () => clearTimeout(timer);
//     }
//   }, [toast.show]);

//   // ---------- Content rendering per tab ------------
//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div>
//             {/* Profile + Balance */}
//             <div className="flex flex-col lg:flex-row gap-6">
//               <div className="bg-gradient-to-b from-white to-gray-100 rounded-xl p-6 shadow-lg w-full lg:w-1/3 flex flex-col items-center">
//                 <div className="bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full p-5 shadow-md">
//                   <FaUserPlus size={80} className="text-white" />
//                 </div>
//                 <p className="mt-4 font-bold text-lg text-gray-800">{user.name}</p>
//                 <div className="w-full mt-4 space-y-2">
//                   <p className="border-b pb-1"><strong>Account No:</strong> {user.accountNumber}</p>
//                   <p className="border-b pb-1"><strong>Email:</strong> {user.email}</p>
//                   <p className="border-b pb-1"><strong>Phone:</strong> {user.phone}</p>
//                   <p><strong>Address:</strong> {user.address}</p>
//                 </div>
//               </div>
//               <div className="bg-green-100 p-6 rounded-lg flex flex-col justify-center items-center flex-1 shadow-lg">
//                 <h3 className="text-3xl font-bold text-green-800 mb-4">Bank Balance</h3>
//                 <p className="text-[60px] lg:text-[90px] font-extrabold text-green-700">
//                   ${user.balance.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//             {/* Transactions */}
//             <div className="mt-8">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
//               <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
//                       <th className="py-3 px-4">Date</th>
//                       <th className="py-3 px-4">Description</th>
//                       <th className="py-3 px-4">Type</th>
//                       <th className="py-3 px-4">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transactions.map((tx) => (
//                       <tr key={tx.id} className="border-t text-sm">
//                         <td className="py-2 px-4">{tx.date}</td>
//                         <td className="py-2 px-4">{tx.description}</td>
//                         <td className={`py-2 px-4 font-semibold ${tx.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
//                           {tx.type}
//                         </td>
//                         <td className="py-2 px-4">
//                           {tx.type === "Debit" ? "-" : "+"}${tx.amount}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         );

//       case "home": // Apply Loan
//         return (
//           <div className="box2 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl mx-auto">
//             <form className="space-y-5" onSubmit={e => handleFormSubmit(e, "loan")}>
//               <div className="mb-6 text-center">
//                 <h2 className="text-3xl font-bold text-white">Apply Loan</h2>
//                 <p className="text-gray-200 text-sm">Fill in the details below to apply for a loan.</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <input type="text" placeholder="Full Name" className="w-full p-3 rounded-md bg-white/20 text-white outline-none" required />
//                 <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md bg-white/20 text-white outline-none" required />
//                 <input type="number" placeholder="Loan Amount" className="w-full p-3 rounded-md bg-white/20 text-white outline-none" required min="1000" />
//                 <input type="text" placeholder="Loan Purpose" className="w-full p-3 rounded-md bg-white/20 text-white outline-none" required />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`mt-6 w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
//               >
//                 {loading ? "Processing..." : "Apply"}
//               </button>
//             </form>
//           </div>
//         );

//       case "deposit":
//         return (
//           <FormCard
//             title="Deposit Amount"
//             onSubmit={e => handleFormSubmit(e, "deposit")}
//             buttonLabel={loading ? "Processing..." : "Deposit"}
//             disabled={loading}
//             fields={[
//               { type: "text", placeholder: "Account Number", required: true },
//               { type: "text", placeholder: "Account Holder Name", required: true },
//               { type: "number", placeholder: "Deposit Amount", required: true, min: 50 },
//               { type: "select", options: ["Select Payment Method", "Cash", "Cheque", "Online Transfer"], required: true }
//             ]}
//           />
//         );

//       case "transfer":
//         return (
//           <FormCard
//             title="Transfer Funds"
//             onSubmit={e => handleFormSubmit(e, "transfer")}
//             buttonLabel={loading ? "Processing..." : "Transfer"}
//             disabled={loading}
//             fields={[
//               { type: "text", placeholder: "From Account Number", required: true },
//               { type: "text", placeholder: "To Account Number", required: true },
//               { type: "text", placeholder: "Recipient Name", required: true },
//               { type: "number", placeholder: "Amount", required: true, min: 1 },
//               { type: "text", placeholder: "Remarks (Optional)" }
//             ]}
//           />
//         );

//       case "withdraw":
//         return (
//           <FormCard
//             title="Withdraw Amount"
//             onSubmit={e => handleFormSubmit(e, "withdraw")}
//             buttonLabel={loading ? "Processing..." : "Withdraw"}
//             disabled={loading}
//             fields={[
//               { type: "text", placeholder: "Account Number", required: true },
//               { type: "number", placeholder: "Withdraw Amount", required: true, min: 1 },
//               { type: "password", placeholder: "Transaction PIN", required: true }
//             ]}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {toast.show && <Toast message={toast.message} onClose={() => setToast({ show: false, message: "" })} />}
//       {/* Navbar */}
//       <div className="flex items-center justify-between p-4 box2 text-white shadow">
//         <h1 className="text-lg sm:text-2xl font-bold">Mahtha Bank</h1>
//         <button className="md:hidden bg-gray-700 px-3 py-2 rounded" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
//         <button className="hidden md:inline-block text-sm md:text-base font-bold uppercase bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white">
//           Log out
//         </button>
//       </div>
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className={`box2 text-white w-56 p-4 space-y-3 flex-shrink-0 fixed md:static h-full md:h-auto transform transition-transform duration-300 z-20
//             ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
//           <button onClick={() => { setActiveTab("profile"); setMenuOpen(false); }} className="p-3 rounded hover:bg-gray-700 w-full text-left">Profile</button>
//           <button onClick={() => { setActiveTab("home"); setMenuOpen(false); }} className="p-3 rounded hover:bg-gray-700 w-full text-left">Apply Loan</button>
//           <button onClick={() => { setActiveTab("deposit"); setMenuOpen(false); }} className="p-3 rounded hover:bg-gray-700 w-full text-left">Deposit</button>
//           <button onClick={() => { setActiveTab("transfer"); setMenuOpen(false); }} className="p-3 rounded hover:bg-gray-700 w-full text-left">Transfer</button>
//           <button onClick={() => { setActiveTab("withdraw"); setMenuOpen(false); }} className="p-3 rounded hover:bg-gray-700 w-full text-left">Withdraw</button>
//           <button className="mt-4 md:hidden bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white w-full">Log out</button>
//         </aside>
//         {/* Main Content */}
//         <main className="flex-1 bg-[#0E141B] p-4 sm:p-6 overflow-auto">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// // 🔹 Reusable, API/validation ready, glassy form component
// const FormCard = ({ title, onSubmit, buttonLabel, disabled, fields }) => (
//   <div className="box2 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl mx-auto">
//     <form className="space-y-5" onSubmit={onSubmit}>
//       <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {fields.map((f, i) =>
//           f.type === "select" ? (
//             <select key={i} className="w-full p-3 rounded-md bg-white/20 text-white outline-none" required={!!f.required}>
//               {f.options.map((o, idx) => (
//                 <option key={idx} value={o}>{o}</option>
//               ))}
//             </select>
//           ) : (
//             <input
//               key={i}
//               type={f.type}
//               placeholder={f.placeholder}
//               className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
//               required={!!f.required}
//               min={f.min}
//             />
//           )
//         )}
//       </div>
//       <button
//         type="submit"
//         disabled={disabled}
//         className={`mt-6 w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold
//         ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
//       >
//         {buttonLabel}
//       </button>
//     </form>
//   </div>
// );


// import React, { useState } from "react";
// import { FaUserPlus } from "react-icons/fa";

// export const Profile = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const user = {
//     name: "John Doe",
//     accountNumber: "XXXX-XXXX-5678",
//     balance: 25430.75,
//     email: "john.doe@example.com",
//     phone: "+1 234 567 890"
//   };

//   // 🔹 Dummy Transactions Data
//   const transactions = [
//     { id: 1, date: "2025-08-10", type: "Credit", amount: 1500, description: "Salary" },
//     { id: 2, date: "2025-08-08", type: "Debit", amount: 200, description: "Electricity Bill" },
//     { id: 3, date: "2025-08-05", type: "Debit", amount: 450, description: "Grocery Shopping" },
//     { id: 4, date: "2025-08-02", type: "Credit", amount: 500, description: "Refund" },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="">
//             {/* User Info */}
//             <h2 className="text-2xl font-bold mb-4 text-gray-300">My Profile</h2>
//             <div className="flex justify-between gap-5 p-5">
//               <div className="bg-gradient-to-b from-white to-gray-100 rounded-xl  shadow-lg hover:shadow-2xl transition-all duration-300 flex text-start items-center flex-col p-6 space-y-5 h-1/3 w-80 border border-gray-200">
//                 {/* User Icon */}
//                 <div className="bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center p-5 shadow-md">
//                   <FaUserPlus size={80} className="text-white" />
//                 </div>

//                 {/* Name */}
//                 <p className="block font-bold font-sans text-lg tracking-wide text-gray-800">{user.name}</p>

//                 {/* Details */}
//                 <div className="w-full space-y-4">
//                   <div className="flex border-b border-gray-200 pb-1">
//                     <span className="w-28 font-bold tracking-wider text-gray-700">Account No:</span>
//                     <span className="text-gray-600">{user.accountNumber}</span>
//                   </div>
//                   <div className="flex border-b border-gray-200 pb-1">
//                     <span className="w-28 font-semibold text-gray-700">Email:</span>
//                     <span className="text-gray-600">{user.email}</span>
//                   </div>
//                   <div className="flex border-b border-gray-200 pb-1">
//                     <span className="w-28 font-semibold text-gray-700">Phone:</span>
//                     <span className="text-gray-600">{user.phone}</span>
//                   </div>
//                   <div className="flex border-b border-gray-200 pb-1">
//                     <span className="w-28 font-semibold text-gray-700">Address:</span>
//                     <span className="text-gray-600 text-[12px] font-medium">bangalur sivaji nager 1/22 ajith street</span>
//                   </div>
//                 </div>

//               </div>
//               <div className="w-full bg-green-100 p-6 rounded-lg shadow flex flex-col justify-center items-center h-96">
//                 {/* Title */}
//                 <h3 className="text-3xl font-bold text-green-800 mb-6">Bank Balance</h3>

//                 {/* Amount Full Center */}
//                 <p className="text-[90px] font-extrabold text-green-700 leading-none break-all text-center">
//                   ${user.balance.toLocaleString()}
//                 </p>
//               </div>

//             </div>



//             {/* Bank Balance */}


//             {/* Recent Transactions */}
//             <div className="mt-8">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
//               <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
//                       <th className="py-3 px-4">Date</th>
//                       <th className="py-3 px-4">Description</th>
//                       <th className="py-3 px-4">Type</th>
//                       <th className="py-3 px-4">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transactions.map(tx => (
//                       <tr key={tx.id} className="border-t text-sm">
//                         <td className="py-2 px-4">{tx.date}</td>
//                         <td className="py-2 px-4">{tx.description}</td>
//                         <td className={`py-2 px-4 font-semibold ${tx.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
//                           {tx.type}
//                         </td>
//                         <td className="py-2 px-4">
//                           {tx.type === "Debit" ? "-" : "+"}${tx.amount}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         );

//       case "home":
//         return (
//           <div
//            className="bg-white/10 backdrop-blur-lg border box2 border-white/20 rounded-xl shadow-2xl p-8 h-full w-full max-w-lg">
//             <form className="space-y-5">
//               {/* Header */}
//               <div className="mb-6 text-center">
//                 <h2 className="text-3xl font-bold text-white">Apply Loan</h2>
//                 <p className="text-gray-200 text-sm">
//                   Fill in the details below to create a new account.
//                 </p>
//               </div>

//               {/* Two-column fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200">Full Name</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Enter full name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200">Email Address</label>
//                   <input
//                     type="email"
//                     className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Email"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200">Password</label>
//                   <input
//                     type="password"
//                     className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Create a password"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200">Confirm Password</label>
//                   <input
//                     type="password"
//                     className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Confirm password"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-200">Phone Number</label>
//                 <input
//                   type="tel"
//                   className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-200">Account Type</label>
//                 <select
//                   defaultValue="Account type"
//                   className="w-full p-2 rounded-md bg-white/20 backdrop-blur-md text-white text-sm outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   <option disabled>Account type</option>
//                   <option>Savings</option>
//                   <option>Current</option>
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
//               >
//                 Create Account
//               </button>
//             </form>
//           </div>
//         )
//       case "trending":
//         return <p className="text-gray-700">Money Trnasfer</p>;
//       case "subscriptions":
//         return <p className="text-gray-700">Deposit</p>;
//       case "settings":
//         return <p className="text-gray-700">Withdra</p>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen  flex flex-col">
//       {/* Top Navbar */}
//       <div className="flex items-center justify-between p-4 box2 text-white shadow">
//         <h1 className="text-lg sm:text-2xl font-bold">Mahtha Bank</h1>
//         <button
//           className="md:hidden bg-gray-700 px-3 py-2 rounded"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>
//         <button className="hidden md:inline-block text-sm md:text-base font-bold uppercase bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white">
//           Log out
//         </button>
//       </div>

//       <div className="flex  flex-1">
//         {/* Sidebar */}
//         <aside
//           className={`box2  text-white w-56 p- space-y-3 flex-shrink-0 flex flex-col
//           fixed md:static h-full md:h-auto transform transition-transform duration-300 z-20
//           ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//         >
//           <button onClick={() => { setActiveTab("profile"); setMenuOpen(false); }} className="p-3  rounded hover:bg-gray-700 w-full text-left"> Profile</button>
//           <button onClick={() => { setActiveTab("home"); setMenuOpen(false); }} className="p-3 hover:bg-gray-700 rounded text-left"> Apply Loan</button>
//           <button onClick={() => { setActiveTab("trending"); setMenuOpen(false); }} className="p-3 hover:bg-gray-700 rounded text-left">Deposit</button>
//           <button onClick={() => { setActiveTab("subscriptions"); setMenuOpen(false); }} className="p-3 hover:bg-gray-700 rounded text-left">Transefer</button>
//           <button onClick={() => { setActiveTab("settings"); setMenuOpen(false); }} className="p-3 hover:bg-gray-700 rounded text-left">Withdra</button>

//           {/* Mobile logout */}
//           <button className="mt-4 md:hidden bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white w-full">
//             Log out
//           </button>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 bg-[#0E141B] rounded-t- sm:p-6  w-full overflow-auto md:ml-0  ml-0 md:mt-0 mt-0">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };