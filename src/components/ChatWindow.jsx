import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import SendMessageBox from "./SendMessageBox";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL);

export default function ChatWindow({ wa_id }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (wa_id) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/chats/${wa_id}`)
        .then(res => setMessages(res.data.messages || []))
        .catch(err => console.error(err));
    }
  }, [wa_id]);

  useEffect(() => {
    socket.on("message_update", (msg) => {
      if (msg.wa_id === wa_id) {
        setMessages(prev => {
          const exists = prev.some(m => m._id === msg._id);
          if (exists) {
            return prev.map(m => m._id === msg._id ? msg : m);
          }
          return [...prev, msg];
        });
      }
    });

    return () => {
      socket.off("message_update");
    };
  }, [wa_id]);

  const handleSend = (text) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/send`, {
      wa_id,
      message: text,
      direction: "outbound"
    }).then(res => {
      setMessages(prev => [...prev, res.data.message]);
    });
  };

  if (!wa_id) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Select a chat to view messages</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto p-4 chat-bg">
        {messages.map(msg => (
          <MessageBubble key={msg._id} msg={msg} />
        ))}
      </div>
      <SendMessageBox onSend={handleSend} />
    </div>
  );
}
