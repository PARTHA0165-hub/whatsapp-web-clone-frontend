import React, { useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="h-screen flex">
      <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      <ChatWindow wa_id={selectedChat} />
    </div>
  );
}
