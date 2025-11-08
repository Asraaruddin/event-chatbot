"use client";
import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

type Sender = "bot" | "user";

interface Message {
  sender: Sender;
  text: string;
}

export default function ChatWindow() {
  // 👇 Tell React exactly what type this state holds
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi there! I'm your Event Assistant. Ask me anything about the event!",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle sending messages
  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user" as Sender, text }]);
    setIsTyping(true);

    // Simulate bot typing and reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot" as Sender,
          text: `Great question about "${text}"! I’ll pull up the latest info for you soon.`,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] h-[80vh] bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
        <h2 className="font-semibold text-white">Event Assistant</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}

        {isTyping && (
          <div className="flex items-center space-x-1 ml-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-800 bg-gray-900 p-3">
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
}
