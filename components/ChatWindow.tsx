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
  userName?: string;
}

export default function ChatWindow({ groupId, eventName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
      const safeGroup = groupId || "default";
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
    <div className="flex justify-center items-center w-full min-h-screen bg-linear-to-b from-gray-950 to-gray-900 px-2 sm:px-4">
      <div
        className="
          flex flex-col
          w-full
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          h-[90vh] sm:h-[85vh] md:h-[80vh] lg:h-[78vh]
          bg-gray-900 border border-gray-800 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)]
          overflow-hidden
          relative
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-800/90 backdrop-blur-sm px-4 py-3 border-b border-gray-700 sticky top-0 z-10">
          <h2 className="font-semibold text-white text-sm sm:text-base md:text-lg">
            Boomi-AI Assistant
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] sm:text-xs text-gray-400">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div
          className="
            flex-1 overflow-y-auto 
            px-3 sm:px-4 py-3 
            space-y-3
            scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900
            pb-24 sm:pb-28
          "
        >
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
        <div
          className="
            absolute bottom-0 left-0 w-full 
            border-t border-gray-800 bg-gray-900/95 backdrop-blur-md
            p-2 sm:p-3 
            rounded-b-2xl
            shadow-[0_-2px_10px_rgba(0,0,0,0.3)]
          "
        >
          <InputBox onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
