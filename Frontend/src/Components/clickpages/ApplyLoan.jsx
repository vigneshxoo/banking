import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import api from "../../Api";

export const ProfileWithLoan = ({ userdata, setUpdate }) => {
  // Step 1: get the first user object or null
  const user =
    Array.isArray(userdata) && userdata.length > 0 ? userdata[0] : userdata || null;

  const [formData, setFormData] = useState({
    amount: "",
    tenureMonths: "",
    purpose: "",
  });
  const [loading, setLoading] = useState(false);
  const [loanSuccess, setLoanSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let timer;
    if (loanSuccess) timer = setTimeout(() => setLoanSuccess(false), 2500);
    return () => clearTimeout(timer);
  }, [loanSuccess]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.amount.trim() || !formData.purpose.trim() || !formData.tenureMonths.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: Number(formData.amount),
        purpose: formData.purpose.trim(),
        tenureMonths: Number(formData.tenureMonths),
      };

      const response = await api.post(
        `/applyloan`,
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setLoanSuccess(true);
        setFormData({
          amount: "",
          purpose: "",
          tenureMonths: "",
        });
        setUpdate(prev => !prev);

      } else {
        setError(response.data?.message || "Loan application failed");
      }
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Loan application failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-8">
      {/* Profile Card */}
      <div className="bg-gray-900 rounded-xl p-6 max-w-md mx-auto text-center text-gray-300 mb-10">
        {user?.profileImg?.url && user.profileImg?.url.trim().length > 0 ? (
          <img
            src={user?.profileImg?.url}
            alt="Profile"
            className="object-cover w-40 h-40 sm:rounded-full"
          />
        ) : (
          <FaUserPlus size={110} className="text-white" />
        )}
        <h2 className="text-3xl font-semibold mt-4">{user?.fullName}</h2>
        <p className="uppercase mt-1 text-green-400 font-medium">{user?.accountType}</p>
        <p className="mt-4">Account No: {user?.accountNumber}</p>
        <p className="text-xl font-bold mt-2 text-green-300">
          ₹{user && Number(user.balance).toLocaleString()}
        </p>
      </div>

      {/* Loan Application Form */}
      <div className="box2 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl">

        {/* Success and Error Messages */}
        {loanSuccess && (
          <div className="absolute top-3 left-3 bg-green-600 bg-opacity-90 text-white px-4 py-2 rounded-md shadow-md text-sm font-semibold">
            Loan application submitted successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-3 left-3 bg-red-600 bg-opacity-90 text-white px-4 py-2 rounded-md shadow-md text-sm font-semibold">
            {error}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleLoanSubmit}>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-white">Apply Loan</h2>
            <p className="text-gray-200 mt-3 text-sm">Fill in the details below to apply for a loan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Loan Amount"
              className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
              required
              min="1"
            />
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Loan Purpose"
              className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
              required
            />
            <input
              type="number"
              name="tenureMonths"
              value={formData.tenureMonths}
              onChange={handleChange}
              placeholder="Tenure (in months)"
              className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md transition font-semibold ${loading
              ? "bg-blue-400 text-white opacity-70 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? "Processing..." : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
};
