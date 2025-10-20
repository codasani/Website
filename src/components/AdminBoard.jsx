import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "1@2#3$") {
      navigate("/admin");
    } else {
      setError("Access Denied: Incorrect Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Employee Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-700 font-semibold">
            Enter Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Password"
          />
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow"
          >
            Enter Admin Mode
          </button>
        </form>
      </div>
    </div>
  );
}
