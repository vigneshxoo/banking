import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../Api";

export const Withdraw = ({ userdata, setUpdate }) => {
  // Support userdata as array or object, extract first account if array
  const user = Array.isArray(userdata) && userdata.length > 0 ? userdata[0] : userdata;

  // Initial form data, with fromAccount auto-filled and read-only
  const [formData, setFormData] = useState({
    fromAccount: user?.accountNumber || "",
    amount: "",
    transactionPin: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Update form input values on user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (
      !formData.amount.trim() ||
      !formData.fromAccount ||
      !formData.transactionPin.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/withdraw`,
        {
          accountNumber: formData.fromAccount,
          amount: formData.amount.trim(),
          transactionPin: formData.transactionPin.trim(),
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
      setUpdate && setUpdate((prev) => !prev); // trigger parent update if provided
      // Clear amount and pin after success
      setFormData((f) => ({ ...f, amount: "", transactionPin: "" }));
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Withdrawal failed. Please try again."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (!user) {
    return <p className="text-white">Loading your account data...</p>;
  }

  return (
    <div className="box2 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl mx-auto relative">
      {/* Success Message */}
      {success && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-bold animate-pulse z-50">
          Withdrawal Successful!
        </div>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 mb-3 font-semibold">{error}</div>}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-white mb-6">Withdraw Funds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* From Account Number (read-only) */}
          <input
            type="text"
            name="fromAccount"
            value={formData.fromAccount}
            readOnly
            className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
          />
          {/* Withdraw Amount */}
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Withdraw Amount"
            required
            min="1"
            className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
          />
          {/* Transaction PIN */}
          <input
            type="password"
            name="transactionPin"
            value={formData.transactionPin}
            onChange={handleChange}
            placeholder="Transaction PIN"
            required
            className="w-full p-3 rounded-md bg-white/20 text-white outline-none md:col-span-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 cursor-pointer rounded-md font-semibold ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
};
