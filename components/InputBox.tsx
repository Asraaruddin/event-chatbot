"use client";
import React, { useState } from "react";

interface Props {
  onSend: (text: string) => void;
}

export default function InputBox({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex items-center justify-between
        w-full
        bg-gray-800/90
        rounded-full
        px-3 sm:px-4
        py-2 sm:py-2.5
        shadow-inner
        border border-gray-700
        focus-within:ring-2 focus-within:ring-blue-600
        transition-all duration-200
      "
    >
      {/* Input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about the event..."
        className="
          flex-1
          bg-transparent
          text-gray-100
          placeholder-gray-500
          outline-none
          text-sm sm:text-base
          px-2 sm:px-3
        "
      />

      {/* Send Button */}
      <button
        type="submit"
        className="
          flex items-center justify-center
          bg-blue-600 hover:bg-blue-700
          text-white font-medium
          px-3 sm:px-5
          py-1.5 sm:py-2
          rounded-full
          transition-all duration-200
          whitespace-nowrap
          text-sm sm:text-base
        "
      >
        Send
      </button>
    </form>
  );
}
