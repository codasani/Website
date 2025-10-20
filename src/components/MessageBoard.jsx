import React, { useEffect, useState } from "react";

const API_BASE = "https://website1-v07a.onrender.com";

export default function MessageBoard({ userId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/messages`);
      const data = await res.json();
      setMessages(data.filter(msg => msg.userId === userId).reverse());
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  if (loading) return <p className="text-center mt-4">Loading messages...</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Your Transactions
      </h2>
      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="bg-blue-100 p-2 rounded-lg shadow-sm text-gray-800">
              {msg.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
