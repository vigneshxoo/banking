import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Api";
import { FaUserPlus } from "react-icons/fa";

export const Deposit = ({ userdata, setUpdate }) => {
  // Guard the input prop
  const user = Array.isArray(userdata) && userdata.length > 0 ? userdata[0] : userdata;

  // Block render until user data is available
  if (!user) {
    return <span>Loading... Please wait while we fetch your data.</span>;
  }

  const [formData, setFormData] = useState({
    accountNumber: user.accountNumber || "",
    accountHolder: user.fullName || "",
    depositAmount: "",
    paymentMethod: "Select Payment Method",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic Validation
    if (
      //   !formData.accountNumber.trim() ||
      //   !formData.accountHolder.trim() ||
      !formData.depositAmount.trim() ||
      !formData.paymentMethod ||
      formData.paymentMethod === "Select Payment Method"
    ) {
      setError("Please fill all fields with valid data.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/deposit`,
        {
          accountNumber: formData.accountNumber,
          name: formData.accountHolder,
          amount: formData.depositAmount.trim(),
          paymentMethod: formData.paymentMethod,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(true);
      setUpdate(prev => !prev);
      setFormData((f) => ({
        ...f,
        depositAmount: "",
        paymentMethod: "Select Payment Method",
      }));
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Deposit failed. Please try again."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 2400);
    }
  };

  return (
    <div className="p-8 w-full max-w-4xl mx-auto ">
      <div className="bg-gray-900 flex flex-col items-center rounded-xl p-6 mb-10 max-w-md mx-auto text-center text-gray-300">
        {user?.profileImg?.url && user.profileImg?.url.trim().length > 0 ? (
          <img
            src={user?.profileImg?.url}
            alt="Profile"
            className="object-cover w-28 h-28 sm:rounded-full"
          />
        ) : (
          <FaUserPlus size={110} className="text-white" />
        )}
        <h2 className="text-3xl font-semibold mt-4">{user.fullName}</h2>
        <p className="uppercase mt-1 text-green-400 font-medium">{user.accountType}</p>
        <p className="mt-4">Account No: {user.accountNumber}</p>
        <p className="text-xl font-bold mt-2 text-green-300">₹{Number(user.balance).toLocaleString()}</p>
      </div>
      <div className="box2 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl mx-auto">

        {/* Success and Error */}
        {success && (
          <div className="mb-4 p-3 bg-green-500 text-white font-bold rounded">Deposit successful!</div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white font-bold rounded">{error}</div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-white mb-6">Deposit Amount</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              readOnly
              className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
            />

            <input
              type="text"
              name="accountHolder"
              placeholder="Account Holder Name"
              value={formData.accountHolder}
              readOnly
              className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
            />

            <input
              type="number"
              name="depositAmount"
              placeholder="Deposit Amount"
              value={formData.depositAmount}
              onChange={handleChange}
              required
              min="10"
              className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
            />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
            >
              <option disabled>Select Payment Method</option>
              <option>Cash</option>
              <option>Online Transfer</option>
              <option>Cheque</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Depositing..." : "Deposit"}
          </button>
        </form>
      </div>
    </div>
  );
};
