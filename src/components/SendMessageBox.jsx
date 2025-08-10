import React, { useState } from "react";

export default function SendMessageBox({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <div className="p-2 bg-white border-t flex">
      <input
        type="text"
        className="flex-1 border rounded p-2 mr-2"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button
        onClick={send}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
