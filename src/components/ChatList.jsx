import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatList({ onSelectChat, selectedChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/chats`)
      .then(res => setChats(res.data.chats || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-1/4 bg-white border-r border-gray-300 flex flex-col">
      <div className="p-4 bg-[#128C7E] text-white font-bold text-lg">WhatsApp</div>
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat._id}
            className={`p-3 cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
              selectedChat === chat._id ? "bg-green-100" : ""
            }`}
            onClick={() => onSelectChat(chat._id)}
          >
            <div className="font-semibold">{chat.name || chat._id}</div>
            <div className="text-sm text-gray-600 truncate">{chat.lastMessage}</div>
            <div className="text-xs text-gray-500">{new Date(chat.lastTimestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
