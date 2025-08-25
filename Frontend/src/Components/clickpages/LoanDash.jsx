import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import api from "../../Api";

const LoanPendingListComponent = () => {
  const [data, setData] = useState([]);
  const [txError, setTxError] = useState(null);
  const [postErr, setPostErr] = useState(null);

  useEffect(() => {
    api
      .get( `/admin`, { withCredentials: true })
      .then((res) => {
        setData(res.data?.loans || []);
      })
      .catch((err) => {
        console.error("loandash fetch error", err);
        setTxError(err?.response?.data?.message || "Failed to load loan dashboard");
        setData([]);
      });
  }, []);

  const sendLoanDetails = async (loanId, status) => {
    try {
      await api.post(
        `/updatestatus`,
        { loanId: loanId, status },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Update state locally: remove this loan from pending list
      setData((prev) => prev.filter((loan) => loan._id !== loanId));
    } catch (error) {
      console.error(error);
      setPostErr(error?.response?.data?.error || "Error updating loan status");
    }
  };

  return (
    <div className="box2 min-h-screen bg-gray-900 text-gray-200 p-6">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Pending Loan Applications
      </h2>

      {/* ✅ Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-left border border-gray-700 rounded-md">
          <thead className="sticky top-0 bg-gray-800 text-gray-300 uppercase text-sm font-semibold z-10">
            <tr>
              <th className="p-3 border-b border-gray-700">Full Name</th>
              <th className="p-3 border-b border-gray-700">Email</th>
              <th className="p-3 border-b border-gray-700 text-center">Amount</th>
              <th className="p-3 border-b border-gray-700 text-center">Purpose</th>
              <th className="p-3 border-b border-gray-700 text-center">Tenure</th>
              <th className="p-3 border-b border-gray-700 text-center">Application Date</th>
              <th className="p-3 border-b border-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-800 transition cursor-pointer">
                <td className="p-3 border-b border-gray-700">{loan?.userId?.fullName}</td>
                <td className="p-3 border-b border-gray-700 truncate max-w-xs">
                  {loan?.userId?.email}
                </td>
                <td className="p-3 border-b border-gray-700 text-center font-semibold">
                  ₹{new Intl.NumberFormat("en-IN").format(loan.amount)}
                </td>
                <td className="p-3 border-b border-gray-700 text-center">{loan.purpose}</td>
                <td className="p-3 border-b border-gray-700 text-center">{loan.tenureMonths}</td>
                <td className="p-3 border-b border-gray-700 text-center whitespace-nowrap">
                  {new Date(loan.applicationDate || loan.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-3 border-b flex border-gray-700 text-center space-x-2">
                  <button
                    onClick={() => sendLoanDetails(loan._id, "Approved")}
                    className="flex items-center justify-center gap-2 text-green-400 hover:bg-green-700 font-semibold py-1 px-3 md:px-4 rounded-md transition"
                  >
                    <FaCheck size={16} />
                    <span className="hidden md:inline">Approve</span>
                  </button>
                  <button
                    onClick={() => sendLoanDetails(loan._id, "Rejected")}
                    className="flex items-center justify-center gap-2 hover:bg-red-700 hover:text-white text-red-500 font-semibold py-1 px-3 md:px-4 rounded-md transition"
                  >
                    <FaTimes size={16} />
                    <span className="hidden md:inline">Reject</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {data.map((loan) => (
          <div key={loan._id} className="bg-gray-800 rounded-lg shadow-md p-4 space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {loan?.userId?.fullName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {loan?.userId?.email}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> ₹
              {new Intl.NumberFormat("en-IN").format(loan.amount)}
            </p>
            <p>
              <span className="font-semibold">Purpose:</span> {loan.purpose}
            </p>
            <p>
              <span className="font-semibold">Tenure:</span> {loan.tenureMonths} months
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(loan.applicationDate || loan.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => sendLoanDetails(loan._id, "Approved")}
                className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-md transition"
              >
                <FaCheck size={14} /> Approve
              </button>
              <button
                onClick={() => sendLoanDetails(loan._id, "Rejected")}
                className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md transition"
              >
                <FaTimes size={14} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {txError && <p className="text-red-400 mt-4">{txError}</p>}
      {postErr && <p className="text-red-400 mt-4">{postErr}</p>}
    </div>
  );
};

export default LoanPendingListComponent;
