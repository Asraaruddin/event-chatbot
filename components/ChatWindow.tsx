"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

type Sender = "bot" | "user";

interface Message {
  sender: Sender;
  text: string;
}

interface ChatWindowProps {
  groupId: string;
  eventName: string;
    userName?: string; // ✅ Add this line
}

export default function ChatWindow({ groupId, eventName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ✅ Initialize chat only once
  useEffect(() => {
    setMessages([
      { sender: "bot", text: "👋 Hi there! I'm your Event Assistant. What's your name?" },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    if (!username) {
      setUsername(text);

      // 🧩 Make sure groupId is valid before inserting
      const safeGroup = groupId || "default";

      // Save user in Supabase
      await supabase.from("users_app").insert([{ name: text, group_id: safeGroup }]);

      setMessages((prev) => [
        ...prev,
        { sender: "user", text },
        {
          sender: "bot",
          text: `Nice to meet you, ${text}! 🎉 Welcome to ${eventName || "our event"}! You’re now registered for group "${safeGroup}".`,
        },
        {
          sender: "bot",
          text: "Ask me anything about the event — speakers, schedule, or venue!",
        },
      ]);
      return;
    }

    // Regular conversation
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `That's interesting! I'll help you find more info about "${text}".`,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] h-[80vh] bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
        <h2 className="font-semibold text-white">Boomi-AI Assistant</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <MessageBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
        {isTyping && (
          <div className="flex space-x-1 ml-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 bg-gray-900 p-3">
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
}
