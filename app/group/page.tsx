// app/group/page.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Message {
  user: string;
  text: string;
}

export default function GroupChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = prompt("Enter your name to join Boomi-AI Group:");
    if (name) setUsername(name);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { user: username, text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">💬 Boomi-AI Group Chat</h1>

      <div className="flex-1 w-full max-w-lg overflow-y-auto bg-gray-800 rounded-lg p-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-md ${msg.user === username ? "bg-blue-600" : "bg-gray-700"}`}>
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-lg mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-700 rounded-l-lg outline-none"
        />
        <button onClick={sendMessage} className="bg-blue-600 px-4 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
}
