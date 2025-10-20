import React from "react";
import MessageBoard from "../components/MessageBoard";

export default function TeacherDashboard({ session, onLogout }) {
  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-600">
            Welcome, {session.name || "Teacher"}!
          </h1>
          <button
            onClick={onLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Logout
          </button>
        </div>

        <div className="text-lg font-medium text-gray-700">
          Current Balance: {session.balance} Kuai
        </div>
      </div>

      <MessageBoard userId={session._id} />
    </div>
  );
}

