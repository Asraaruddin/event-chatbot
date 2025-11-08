"use client";
import React, { useState } from "react";

interface Props {
  onSend: (text: string) => void;
}

export default function InputBox({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-gray-800 rounded-full px-3 py-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about the event..."
        className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 outline-none px-2"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full transition"
      >
        Send
      </button>
    </form>
  );
}
