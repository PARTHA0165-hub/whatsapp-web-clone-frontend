import React from "react";

export default function MessageBubble({ msg }) {
  const isOutgoing = msg.direction === "outbound";
  return (
    <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs p-2 rounded-lg shadow-md ${
          isOutgoing ? "bg-[#DCF8C6]" : "bg-white"
        }`}
      >
        <div>{msg.message}</div>
        <div className="text-xs text-gray-500 text-right">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.status}
        </div>
      </div>
    </div>
  );
}
