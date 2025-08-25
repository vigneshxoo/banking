import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaCodeBranch, FaEdit, FaWallet, FaCalendarAlt } from "react-icons/fa";
import { ProfileCard } from "./ProfileCard";
import api from "../../Api";
export const Profiles = ({ userdata, loadings,setUpdate }) => {
  const [transactions, setTransactions] = useState([]);
  const [txError, setTxError] = useState(null);
  const [status, setStatus] = useState([])

   
    
  const accounts = Array.isArray(userdata) ? userdata : [userdata];

// transection api
  useEffect(() => {
    api
      .get(`/transhist`, { withCredentials: true })
      .then((res) => {
        setTransactions(res.data?.transactions || []);
      })
      .catch((err) => {
        console.error("Transaction fetch error", err);
        setTxError("Failed to load transactions");
        setTransactions([]);
      });
  }, []);
let statusid = accounts[0]?._id


//  loan statsu api
useEffect(() => {
  if (!statusid) return; 

  api
    .get(`/status/${statusid}`, { withCredentials: true })
    .then((res) => {
      console.log(res.data)
      setStatus(res.data || []);
    })
    .catch((err) => {
      console.error("loan status  fetch error", err);
    });
}, [statusid]);

// profileimg uplaod api




  if (loadings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-xl">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-gray-300 text-3xl font-bold">Profile</h1>
        <p className="text-gray-400 text-sm font-medium">
          Manage your Mahatha Bank account details securely.
        </p>
        <span className="w-full mt-5 h-0.5 block bg-gray-800"></span>
      </div>

      {/* No Accounts */}
      {accounts.length === 0 && (
        <div className="flex items-center justify-center text-gray-400 p-8">
          No account info available.
        </div>
      )}

      {/* Accounts */}
      {accounts.map((user, i) => (
        <div
          key={user.accountNumber || i}
          className="flex flex-col md:flex-row gap-6 p-6"
        >
          {/* Profile Card */}
          {/* <div className="border border-gray-700 w-full md:w-1/3 flex flex-col items-center space-y-4 p-5 rounded-lg bg-gray-800/90 min-h-[410px]">
            <h4 className="text-gray-300 text-2xl font-bold first-letter:uppercase">
              {user?.fullName || "User"}
            </h4>
            <p className="text-green-400 uppercase tracking-wider text-[12px]">
              {user.accountType || "Savings Account"}
            </p>
            <div className="border-4 border-gray-600 w-40 h-40 flex items-center justify-center rounded-full">
              <FaUserPlus size={110} className="text-white" />
            </div>
            <div className="w-full mt-3 space-y-1">
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs font-semibold tracking-wider">
                  Account No
                </span>
                <span className="text-md font-bold">{user.accountNumber}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs font-semibold tracking-wider">
                  Balance
                </span>
                <span className="text-lg font-bold text-green-300">
                  ₹{Number(user.balance || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div> */}
          <ProfileCard setUpdate={setUpdate} user={user}/>

          {/* Details Card */}
          {/* <div className="w-full border border-gray-700 text-gray-300 rounded-lg p-6 bg-gray-800/80 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-200">
              Account & Other Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  Name
                </p>
                <span className="font-bold first-letter:uppercase">
                  {user.fullName}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  Email
                </p>
                <span>{user.email}</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  Phone
                </p>
                <span>{user.phone}</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  Branch
                </p>
                <span>{user.branch || "Mahatha Bank"}</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  IFSC
                </p>
                <span>{user.ifsc || "MAHT0001234"}</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  Edit Acount
                </p>
                <span className="text-green-300 cursor-pointer">Edit profile</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  Balance
                </p>
                <span>{user.balance || "MAHT0001234"}</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">
                  Account Created
                </p>
                <span>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div> */}

          <div className="w-full border border-gray-700 text-gray-300 rounded-lg p-6 bg-gray-800/80 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-200 flex items-center gap-2">
              <FaUser /> Account & Other Details
            </h2>

            <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 gap-6">
              {/* Name */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaUser /> Name
                </p>
                <span className="font-bold first-letter:uppercase">{user.fullName}</span>
              </div>

              {/* Email */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaEnvelope /> Email
                </p>
                <p className="text-[12px] sm:text-sm w-[10px]  ">{user.email}</p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaPhone /> Phone
                </p>
                <span>{user.phone}</span>
              </div>

              {/* Branch */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaUniversity /> Branch
                </p>
                <span>{user.branch || "Mahatha Bank"}</span>
              </div>

              {/* IFSC */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaCodeBranch /> IFSC
                </p>
                <span>{user.ifsc || "MAHT0001234"}</span>
              </div>
             
              {/* Edit Profile */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaEdit /> Edit Account
                </p>
                <button className="flex items-center gap-1 text-green-300 hover:text-green-400 transition cursor-pointer">
                  <FaEdit size={14} /> Edit Profile
                </button>
              </div>

              {/* Balance */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaWallet /> Balance
                </p>
                <span className="font-bold text-green-400">
                  ₹{new Intl.NumberFormat("en-IN").format(user.balance || 0)}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaWallet /> Loan Status
                </p>
                <span className="font-bold text-green-400">
                 {
                  status?.status
                 }
                </span>
              </div>

              {/* Account Created */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-1">
                  <FaCalendarAlt /> Account Created
                </p>
                <span>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Transactions */}
      <div className="px-6 pb-8 mt-4">
        <h3 className="text-xl font-bold text-gray-300 mb-4">
          Recent Transactions
        </h3>
        <div className="overflow-x-auto box2 rounded-lg shadow bg-gray-800">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-300">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {txError && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-red-400 font-semibold"
                  >
                    {txError}
                  </td>
                </tr>
              )}
              {!txError && transactions.length > 0 ? (
                transactions.map((tx, idx) => (
                  <tr
                    key={tx.id || idx}
                    className="border-t text-gray-300 text-sm"
                  >
                    <td className="py-2 px-4">
                      {tx.date ? new Date(tx.date).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-2 px-4">{tx.description || "-"}</td>
                    <td
                      className={`py-2 px-4 font-semibold ${tx.type === "Credit"
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                    >
                      {tx.type}
                    </td>
                    <td className="py-2 px-4">
                      {tx.type === "Debit" ? "-" : "+"}
                      ₹{Number(tx.amount).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                !txError && (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-4 text-gray-400"
                    >
                      No transactions available
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
