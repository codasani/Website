import React, { useEffect, useState } from "react";

const API_BASE = "https://website1-v07a.onrender.com";

export default function AdminBoard({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const logMessage = async (user, action, amount = null) => {
    try {
      let text = "";
      if (action === "reward") text = `${user.name || "Unnamed User"} was rewarded ${amount} Kuai`;
      if (action === "deduct") text = `${user.name || "Unnamed User"} had ${amount} Kuai deducted`;
      if (action === "reset") text = `${user.name || "Unnamed User"} balance was reset to 0 Kuai`;

      await fetch(`${API_BASE}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId: user._id }),
      });
    } catch (err) {
      console.error("Failed to log message:", err);
    }
  };

  const handleReward = async (user) => {
    const amount = prompt("Enter Kuai amount to reward:");
    if (!amount || isNaN(amount)) return alert("Invalid amount");

    try {
      await fetch(`${API_BASE}/api/reward/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      await logMessage(user, "reward", amount);
      await fetchUsers();
    } catch (err) {
      console.error("Reward failed:", err);
      alert("Reward failed");
    }
  };

  const handleDeduct = async (user) => {
    const amount = prompt("Enter Kuai amount to deduct:");
    if (!amount || isNaN(amount)) return alert("Invalid amount");

    try {
      await fetch(`${API_BASE}/api/deduct/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      await logMessage(user, "deduct", amount);
      await fetchUsers();
    } catch (err) {
      console.error("Deduct failed:", err);
      alert("Deduct failed");
    }
  };

  const handleResetAll = async () => {
    const confirmReset = window.confirm("Reset ALL balances to 0 Kuai?");
    if (!confirmReset) return;

    try {
      for (let user of users) {
        await fetch(`${API_BASE}/api/reset/${user._id}`, { method: "POST" });
        await logMessage(user, "reset");
      }
      await fetchUsers();
      alert("All balances reset");
    } catch (err) {
      console.error("Reset failed:", err);
      alert("Reset failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Kuai Bank Admin Dashboard
        </h1>

        <div className="flex justify-between mb-4">
          <button
            onClick={handleResetAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Reset All
          </button>
          <button
            onClick={onLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4">
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center bg-blue-100 rounded-xl p-4 shadow"
              >
                <div>
                  <p className="text-lg font-semibold text-blue-800">
                    {user.name || "Unnamed User"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Role: {user.role || "student"}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    Balance: {user.balance} Kuai
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleReward(user)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                  >
                    Reward
                  </button>
                  <button
                    onClick={() => handleDeduct(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                  >
                    Deduct
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

