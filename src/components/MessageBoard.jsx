import React from "react";
import "../styles/classroom.css";

function MessageBoard({ messages }) {
  return (
    <div className="message-board">
      <h2>Transaction Feed</h2>
      {messages && messages.length > 0 ? (
        messages.map((msg, i) => (
          <div key={i} className="message">
            <span className="user">{msg.user}</span>{" "}
            <span className="action">{msg.action}</span>{" "}
            <span className="amount">{msg.amount} Kuai</span>
          </div>
        ))
      ) : (
        <p>No recent transactions yet.</p>
      )}
    </div>
  );
}

export default MessageBoard;
