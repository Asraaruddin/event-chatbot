"use client";
import React from "react";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to Boomi-AI Group Chat 💬</h1>
      <p className="text-gray-400">Your group chat is ready! Group ID: {typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("group") : ""}</p>
    </div>
  );
}
