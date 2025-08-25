import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../Api";

export const TransferFunds = ({ userdata, setUpdate }) => {
  // Normalize user account: array or object support
  const user = Array.isArray(userdata) && userdata.length > 0 ? userdata[0] : (userdata || null);

  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    recipientName: "",
    amount: "",
    transactionPin: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Sync account number when userdata loads
  useEffect(() => {
    if (user && user.accountNumber) {
      setFormData((prev) => ({
        ...prev,
        fromAccount: user.accountNumber,
      }));
    }
  }, [user]);

  if (!user) {
    return <p className="text-white">Please wait, fetching your account...</p>;
  }

  // Input value handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.amount.trim() ||
      !formData.fromAccount ||
      !formData.toAccount.trim() ||
      !formData.transactionPin.trim()
    ) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post(
        `/transfer`,
        {
          fromAccount: formData.fromAccount,
          toAccount: formData.toAccount.trim(),
          recipientName: formData.recipientName.trim(),
          amount: formData.amount.trim(),
          transactionPin: formData.transactionPin.trim(),
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
      setUpdate(prev => !prev);
      // Reset only the non-fixed fields
      setFormData((prev) => ({
        ...prev,
        toAccount: "",
        recipientName: "",
        amount: "",
        transactionPin: "",
      }));
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Transaction failed"
      );
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="box2 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl mx-auto relative">
      {/* Success message */}
      {success && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-bold animate-pulse z-50">
          Transfer Successful!
        </div>
      )}
      {/* Error */}
      {error && <div className="text-red-500 mb-3 font-semibold">{error}</div>}
      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-white mb-6">Transfer Funds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="fromAccount"
            value={formData.fromAccount}
            readOnly
            className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
          />
          <input
            type="text"
            name="toAccount"
            value={formData.toAccount}
            onChange={handleChange}
            placeholder="To Account Number"
            required
            className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
          />
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            placeholder="Recipient Name"
            required
            className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            min="1"
            className="w-full p-3 rounded-md bg-white/20 text-white outline-none"
          />
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
          className={`w-full py-3 cursor-pointer rounded-md font-semibold ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
        >
          {loading ? "Transferring..." : "Transfer"}
        </button>
      </form>
    </div>
  );
};
